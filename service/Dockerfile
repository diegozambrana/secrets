FROM python:3.6.13-alpine3.13

WORKDIR /app

COPY requirements.txt .
COPY entrypoint.sh .
COPY . /app/
COPY supervisord.conf /etc/supervisord.conf

RUN apk update
RUN apk add bash \
            build-base \
            libressl-dev \
            musl-dev \
            libffi-dev
RUN pip install supervisor && \
    mkdir -p /var/log/supervisor/ && \
    pip install -r requirements.txt


ENTRYPOINT ["bash", "/app/entrypoint.sh"]
