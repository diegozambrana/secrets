import logging
from datetime import timedelta
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from confidential.models import Secret
from confidential.utils import encrypt, decrypt


logger = logging.getLogger('project')


class ConfidentialSerializer(serializers.ModelSerializer):
    content = serializers.CharField(write_only=True)
    key = serializers.CharField(write_only=True, allow_null=True,
                                allow_blank=True, required=False, default='')
    lifetime = serializers.SerializerMethodField()

    class Meta:
        model = Secret
        fields = ['id', 'created', 'content', 'encrypted', 'lifetime', 'key']
        read_only_fields = ['encrypted']

    def get_lifetime(self, instance):
        return instance.created + timedelta(hours=instance.lifetime)

    def create(self, validated_data):
        key = validated_data.pop('key')

        validated_data['encrypted'] = False
        if key:
            validated_data['content'] = encrypt(validated_data['content'], key)
            validated_data['encrypted'] = True

        return super().create(validated_data)


class ContentSerializer(ConfidentialSerializer):
    content = serializers.SerializerMethodField()
    lifetime = serializers.SerializerMethodField()
    key = serializers.CharField(write_only=True, allow_null=True,
                                allow_blank=True, required=False, default='')

    class Meta:
        model = Secret
        fields = ['id', 'created', 'content', 'encrypted', 'lifetime', 'key']
        read_only_fields = ['content']

    def get_lifetime(self, instance):
        return instance.created + timedelta(hours=instance.lifetime)

    def validate_key(self, value):
        if self.instance is not None and self.instance.encrypted:
            if value is None or value == '':
                raise ValidationError("Key is required")
        return value

    def get_content(self, instance):
        if instance.encrypted:
            key = self.validated_data['key']
            return decrypt(instance.content, key)

        return instance.content
