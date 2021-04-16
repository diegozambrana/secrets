#!/bin/bash

/usr/local/bin/python manage.py collecstatic
exec /usr/local/bin/supervisord -c /etc/supervisord.conf
