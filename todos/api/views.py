from rest_framework import viewsets, permissions
from .serializers import TodoSerializer
# from todos.models import Todo


# Next, we will set permissions on TodoViewSet. And define a method to get only the todos created by each owner. Open the todos/api/views.py file:

class TodoViewSet(viewsets.ModelViewSet):
    # queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.request.user.todos.all()


    def perform_create(self,serializer):
        serializer.save(owner = self.request.user)

     # Our serializer will now have the 'owner' field by overriding the perform_create() method as above