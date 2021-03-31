from rest_framework import mixins, viewsets
from confidential.serializers import ConfidentialSerializer
from confidential.models import Secret


class ConfidentialViewSet(mixins.CreateModelMixin,
                          mixins.RetrieveModelMixin,
                          viewsets.GenericViewSet):
    queryset = Secret.objects.all()

    def get_serializer_class(self):
        return ConfidentialSerializer
