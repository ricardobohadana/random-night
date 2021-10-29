from typing import Dict, List

from django.http import response
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from night_generator.utils.get_data import (
    getMostPopularMovie,
    getMostPopularTVShow,
    getTopRatedMovie,
    getTopRatedTVShow,
)
from night_generator.utils.get_specific_data import getMediaDetails

CONST_NOT_GET_METHOD = Response({'error':'GET IS THE ONLY METHOD ALLOWED'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


def isDictionary(response: dict) -> Response:
  if type(response) == dict:
    return Response(response)
  else:
    return Response({'error': 'Error in data fetch process'},  status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def isListofDict(response: list) -> Response:
  if response:
    return Response(response, status=status.HTTP_200_OK)
  else:
    return Response({'error': 'Error in data fetch process'},  status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view()
def MediaAPIView(request, slug: str):

  if request.method != 'GET':
    return CONST_NOT_GET_METHOD

  response = getMediaDetails(slug)
  
  return isDictionary(response)



@api_view()
def TopRatedMovieAPI(request):
  if request.method != "GET":
    return CONST_NOT_GET_METHOD

  response = getTopRatedMovie()
  return isListofDict(response)    

@api_view()
def TopRatedTVShowAPI(request):
  if request.method != "GET":
    return CONST_NOT_GET_METHOD

  response = getTopRatedTVShow()
  return isListofDict(response)

@api_view()
def MostPopularMovieAPI(request):
  if request.method != "GET":
    return CONST_NOT_GET_METHOD

  response = getMostPopularMovie()
  return isListofDict(response)  

@api_view()
def MostPopularTVShowAPI(request):
  if request.method != "GET":
    return CONST_NOT_GET_METHOD

  response = getMostPopularTVShow()
  return isListofDict(response)  
      
  