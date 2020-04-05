from django.db import models
from django.contrib.auth.models import User  # added

# Create your models here.

class Todo(models.Model):
    task = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    # null = true means that it can have no owner, it won't bug
    owner = models.ForeignKey(User, related_name="todos", on_delete=models.
    CASCADE, null= True)

    def __str__(self):
        return self.task