from fastapi import FastAPI, HTTPException, APIRouter
from pydantic import BaseModel
from .models import ProcessedData  # SQLAlchemy model
from .database import SessionLocal
from minio import Minio
import os

app = FastAPI()

# Configure MinIO client
minio_client = Minio(
    "minio:9000",
    access_key=os.getenv("MINIO_ROOT_USER", "minioadmin"),
    secret_key=os.getenv("MINIO_ROOT_PASSWORD", "minioadmin"),
    secure=False
)
BUCKET_NAME = "ingestion-bucket"

@app.on_event("startup")
async def startup():
    # Create bucket if not exists
    if not minio_client.bucket_exists(BUCKET_NAME):
        minio_client.make_bucket(BUCKET_NAME)

@app.get("/api/files")
async def get_files():
    db = SessionLocal()
    try:
        files = db.query(ProcessedData).all()
        return [{
            "name": file.filename,
            "size": file.file_size,
            "created_at": file.created_at
        } for file in files]
    finally:
        db.close()

@app.post("/api/upload")
async def generate_upload_url(item: dict):
    try:
        filename = item["filename"]
        content_type = item.get("type", "application/octet-stream")
        
        # Generate presigned URL (7 days expiration)
        url = minio_client.presigned_put_object(
            BUCKET_NAME,
            filename,
            expires=604800  # 7 days in seconds
        )
        return {"url": url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/download/{filename}")
async def generate_download_url(filename: str):
    try:
        # Generate presigned URL (15 minutes expiration)
        url = minio_client.presigned_get_object(
            BUCKET_NAME,
            filename,
            expires=900  # 15 minutes
        )
        return {"url": url}
    except Exception as e:
        raise HTTPException(status_code=404, detail="File not found")

@app.post("/ingest/csv")
async def ingest_csv_endpoint(file_path: str):
    # Trigger CSV ingestion (async task)
    return {"status": "processing_started"}

@app.get("/data")
async def get_data():
    # Fetch data from PostgreSQL
    return {"data": "Sample response"}

router = APIRouter()

@router.get("/health")
async def health_check():
    return {"status": "ok"}