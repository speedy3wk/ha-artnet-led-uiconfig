ARG BUILD_FROM=ghcr.io/hassio-addons/base-python:3.11
FROM ${BUILD_FROM}

WORKDIR /app
COPY rootfs /

RUN apk add --no-cache python3 py3-aiohttp
RUN chmod +x /app/run.sh

CMD ["python3", "/app/app.py"]
