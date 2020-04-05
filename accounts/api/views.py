from rest_framework import generics, permissions
from rest_framework.response import Response

from knox.models import AuthToken

from .serializers import UserSerializer, RegisterSerializer, LoginSerializer


# traversy media did this thing last after testing things on POSTMAN , it gets user API WITH THE TOKEN, will be a protected route, you need have a valid token , be logged
class UserAPIView(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

# return the user
    def get_object(self):
        return self.request.user

#Register Api , takes care of a lot of stuff for us
class RegisterAPIView(generics.GenericAPIView):
    serializer_class = RegisterSerializer


 # after creating those lines, you can try in postman , and it should work ( 'username': ... , "email": ... )
# everything we send in register, it can take more argument thanks to args and
    def post(self,request, *args, **kwargs):
        # anything that comes in (data) will come in that serializer
        serializer = self.get_serializer(data=request.data)
        # sned back any error
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            # "token": AuthToken.objects.create(user)[1] means that the AuthToken.objects.create() returns a tuple (instance, token). So, add [1] and specify the second position.
            'user': UserSerializer(user,context=self.get_serializer_context()).data,
            # create token specific to that user, when you make a request from frontend, it will know who you are thanks to that token that goes to the auth
            'token':AuthToken.objects.create(user)[1]
        })


class LoginAPIView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })
