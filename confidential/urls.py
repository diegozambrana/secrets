from django.urls import path
from confidential.views import ConfidentialViewSet


create = ConfidentialViewSet.as_view({'post': 'create'})
detail = ConfidentialViewSet.as_view({'get': 'detail'})
reveal = ConfidentialViewSet.as_view({'put': 'reveal'})


urlpatterns = [
    path('confidential', create, name='confidential'),
    path('confidential/<str:pk>', detail, name='confidential-detail'),
    path('confidential/<str:pk>/reveal', reveal, name='confidential-reveal'),
]
