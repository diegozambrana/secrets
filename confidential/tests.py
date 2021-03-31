import logging
from django.urls import reverse
from rest_framework.test import APITestCase
from confidential.models import Secret
from confidential.utils import encrypt, decrypt


logger = logging.getLogger('project')


class TestEncrypDecrypt(APITestCase):
    def test_encrypt_decrypt(self):
        secret = 'secret content lorem ipsum'
        key = 'secretkey'

        encrypted = encrypt(secret, key)
        self.assertNotEquals(secret, encrypted)

        decrypted = decrypt(encrypted, key)
        self.assertEquals(secret, decrypted)


class TestConfidential(APITestCase):
    def _assertCreate(self, data):
        url = reverse('confidential')
        response = self.client.post(url, data=data, format='json')
        response_json = response.json()
        logger.info(f" response_json: {response_json}")
        self.assertEquals(response.status_code, 201)
        self.assertIn("id", response_json)
        self.assertIn("created", response_json)
        self.assertIn("lifetime", response_json)
        self.assertIn("encrypted", response_json)
        self.assertNotIn("content", response_json)

        return response_json

    def test_create_secret(self):
        # Create a secret with an empty key
        data = {
            'content': 'lorem ipsum',
            'lifetime': 7 * 24,
            'key': '',
        }
        response_json = self._assertCreate(data)

        secret = Secret.objects.get(pk=response_json['id'])
        self.assertFalse(secret.encrypted)
        self.assertEquals(secret.content, data['content'])

        # Create a secret with key null
        data = {
            'content': 'lorem ipsum',
            'lifetime': 7 * 24,
            'key': None,
        }
        response_json = self._assertCreate(data)

        secret = Secret.objects.get(pk=response_json['id'])
        self.assertFalse(secret.encrypted)
        self.assertEquals(secret.content, data['content'])

        # Create a secret with a key
        data = {
            'content': 'lorem ipsum',
            'lifetime': 7 * 24,
        }
        response_json = self._assertCreate(data)

        secret = Secret.objects.get(pk=response_json['id'])
        self.assertFalse(secret.encrypted)
        self.assertEquals(secret.content, data['content'])

    def test_create_secret_encrypted(self):
        key = 'secretkey'
        data = {
            'content': 'lorem ipsum',
            'lifetime': 7 * 24,
            'key': key,
        }

        response_json = self._assertCreate(data)
        secret = Secret.objects.get(pk=response_json['id'])
        self.assertTrue(secret.encrypted)
        self.assertNotEquals(secret.content, data['content'])

        decrypted = decrypt(secret.content, key)
        self.assertEquals(decrypted, data['content'])

    def test_retrieve_secret_information(self):
        instance = Secret.objects.create(content='lorem')
        self.assertIsNotNone(instance.id)

        url = reverse('confidential-detail', args=[instance.id])
        response = self.client.get(url)
        response_json = response.json()
        self.assertEquals(response.status_code, 200)
        self.assertNotIn('content', response_json)
