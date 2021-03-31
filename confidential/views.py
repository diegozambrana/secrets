from rest_framework import mixins, viewsets
from confidential.serializers import ConfidentialSerializer


class ConfidentialViewSet(mixins.CreateModelMixin,
                          mixins.RetrieveModelMixin,
                          viewsets.GenericViewSet):
    def get_serializer_class(self):
        return ConfidentialSerializer
