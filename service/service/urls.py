from django.urls import path, include
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def service_check(request):
    return Response({'message': 'ok'})


def welcome(request):
    return HttpResponse('hello stranger')


urlpatterns = [
    path('', welcome),
    path('api/', include('confidential.urls')),
    path('service-check/', service_check)
]
