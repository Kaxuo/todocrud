# Since the api is a module, we need to include __init__.py file
from django.contrib.auth import authenticate
from django.contrib.auth.models import User

from rest_framework import serializers
# I would like to set User._meta.get_field('email')._unique = True so that duplicate email addresses can not be registered.
User._meta.get_field('email')._unique = True

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','email')

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','email','password')
        extra_kwargs = {'password': {'write_only': True}}

    # making sure the data is validated ( fits the structure of a user , username/email/password, right type of data (USer is included with django) )
    def create(self,validated_data):
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password'],
        )
        return user


# Serializer BELOW AND NOT ModelSerializer cause we're not creating a model , just validating ! !!!
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self,data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
            # if not , then line below
        raise serializers.ValidationError('Incorrect Credentials')