from rest_framework.response import Response
from rest_framework import mixins, viewsets
from confidential.serializers import ConfidentialSerializer, ContentSerializer
from confidential.models import Secret


class ConfidentialViewSet(mixins.CreateModelMixin,
                          mixins.RetrieveModelMixin,
                          viewsets.GenericViewSet):
    serializer_class = ConfidentialSerializer
    queryset = Secret.objects.all()

    def reveal(self, request, *args, **kwargs):
        instance = self.get_object()

        serializer = ContentSerializer(
            instance,
            data=request.data,
            context=self.get_serializer_context()
        )
        serializer.is_valid(raise_exception=True)
        data = serializer.data

        # Delete after retrieve content
        instance.delete()

        return Response(data)
