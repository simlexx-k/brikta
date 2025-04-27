FROM python:3.9-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY connectors/ /app/connectors/
COPY processing/ /app/processing/
COPY main.py /app/
COPY storage/ /app/storage/

# Create data directories
RUN mkdir -p /data/incoming /data/processed /data/failed

CMD ["python", "main.py"]