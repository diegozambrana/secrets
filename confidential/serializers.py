from rest_framework import serializers
from confidential.models import Secret


class ConfidentialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Secret
        fields = '__all__'
