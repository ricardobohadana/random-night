from django.urls import path

from . import views

app_name = 'night_generator'

urlpatterns = [
  path("media/<str:slug>", views.MediaAPIView, name='media_home'),

  path("topRatedMovie/", views.TopRatedMovieAPI, name='topratedmovie'),
  path("topRatedTvShow/", views.TopRatedTVShowAPI, name='topratedtvshow'),
  path("mostPopularMovie/", views.MostPopularMovieAPI, name='mostpopularmovie'),
  path("mostPopularTvShow/", views.MostPopularTVShowAPI, name='mostpopulartvshow'),

]
