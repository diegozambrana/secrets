import base64
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.backends import default_backend
from cryptography.fernet import Fernet
from django.utils.encoding import force_str, force_bytes


def get_fernet_key(key):
    key = force_bytes(key)
    digest = hashes.Hash(hashes.SHA256(), backend=default_backend())
    digest.update(key)
    key_encoded = base64.urlsafe_b64encode(digest.finalize())
    return Fernet(key_encoded)


def encrypt(secret, key):
    fernet = get_fernet_key(key)
    raw_bytes = fernet.encrypt(force_bytes(secret))
    return force_str(raw_bytes)


def decrypt(secret, key):
    fernet = get_fernet_key(key)
    raw_bytes = fernet.decrypt(force_bytes(secret))
    return force_str(raw_bytes)
