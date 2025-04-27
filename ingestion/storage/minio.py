from minio import Minio
import os

def archive_to_minio(file_path: str):
    """Archive original files to MinIO"""
    client = Minio(
        "minio:9000",
        access_key=os.getenv("MINIO_ROOT_USER"),
        secret_key=os.getenv("MINIO_ROOT_PASSWORD"),
        secure=False
    )
    client.fput_object(
        "ingestion-archive",
        os.path.basename(file_path),
        file_path
    ) 