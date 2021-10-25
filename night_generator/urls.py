from django.urls import path

from . import views

app_name = 'night_generator'

urlpatterns = [
  path("media/<str:slug>", views.MediaAPIView, name='media_home')
]
