from django.urls import path
from .views import index, TodoDetailView

urlpatterns = [
    path('', index),
    # 2 LINES BELOW IMPORTANT IF YOU USE REACT ROUTER
    path ('login', index),
    path('register',index),
    path('edit/<int:pk>', TodoDetailView.as_view()),
    path('delete/<int:pk>', TodoDetailView.as_view()),
]