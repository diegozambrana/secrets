from django.conf import settings
from django.contrib import admin
from django.http import HttpResponse
from django.urls import path, include
from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView
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
    path('service-check/', service_check),
    path("graphql", csrf_exempt(GraphQLView.as_view(graphiql=True))),
]

if settings.DEBUG:
    urlpatterns += [path('admin/', admin.site.urls)]