import logging
from django.urls import reverse
from rest_framework.test import APITestCase


logger = logging.getLogger('project')


class TestConfidential(APITestCase):
    def test_create_secret(self):
        url = reverse('confidential')
        response = self.client.post(url, data={
            'content': 'lorem ipsum',
            'lifetime': 7 * 24,
            'key': '',
        })
        self.assertEquals(response.status_code, 201)
