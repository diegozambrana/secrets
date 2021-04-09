import uuid
from django.db import models


class Secret(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    #: Secret content.
    content = models.TextField()

    #: Created time.
    created = models.DateTimeField(auto_now_add=True)

    #: Flag when the secret is encrypted
    encrypted = models.BooleanField(default=False)

    #: Expressed in hours.
    lifetime = models.IntegerField(default=1)
