FROM python:3.12-slim-bookworm

WORKDIR /app

COPY . .

RUN apt-get update && apt-get install -y --no-install-recommends curl ca-certificates

ADD https://astral.sh/uv/install.sh /uv-installer.sh

RUN sh /uv-installer.sh && rm /uv-installer.sh

ENV PATH="/root/.cargo/bin/:$PATH"

RUN uv sync --frozen

EXPOSE 1111

CMD ["uv", "run", "main.py"]