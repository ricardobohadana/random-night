from django.http import response
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from night_generator.utils.get_specific_data import getMediaDetails


@api_view()
def MediaAPIView(request, slug: str):

  if request.method != 'GET':
    return Response({'error':'GET IS THE ONLY METHOD ALLOWED'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

  response = getMediaDetails(slug)

  
  if type(response) == dict:
    return Response(response)
  else:
    return Response({'error': 'Error in data fetch process'},  status=status.HTTP_500_INTERNAL_SERVER_ERROR)

