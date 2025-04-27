import pandas as pd
from minio import Minio
from sqlalchemy import create_engine
import os
from sqlalchemy.orm import Session
from backend.app.models import ProcessedData  # From backend
from backend.app.database import SessionLocal  # From backend

# Load environment variables
MINIO_ENDPOINT = os.getenv("MINIO_ENDPOINT", "localhost:9000")
MINIO_ACCESS_KEY = os.getenv("MINIO_ACCESS_KEY", "minioadmin")
MINIO_SECRET_KEY = os.getenv("MINIO_SECRET_KEY", "minioadmin")
POSTGRES_URL = os.getenv("POSTGRES_URL", "postgresql://admin:admin@postgres:5432/ingestion_db")

def process_csv(file_path: str):
    """Ingest CSV files into the system"""
    df = pd.read_csv(file_path)
    # Validate and process data
    validated_df = validate_data(df)
    # Store in PostgreSQL
    store_in_database(validated_df)
    # Archive in MinIO
    archive_to_minio(file_path)

def ingest_csv(file_path: str):
    # 1. Read CSV
    df = pd.read_csv(file_path)
    
    # 2. Upload raw data to MinIO
    minio_client = Minio(
        MINIO_ENDPOINT,
        access_key=MINIO_ACCESS_KEY,
        secret_key=MINIO_SECRET_KEY,
        secure=False
    )
    bucket_name = "raw-data"
    if not minio_client.bucket_exists(bucket_name):
        minio_client.make_bucket(bucket_name)
    minio_client.fput_object(bucket_name, "raw.csv", file_path)
    
    # 3. Infer schema and validate
    schema = infer_schema(df)
    validate_data(df)
    
    # 4. Write to PostgreSQL
    engine = create_engine(POSTGRES_URL)
    df.to_sql("processed_data", engine, if_exists="append", index=False)

    # Add database record
    db = SessionLocal()
    try:
        file_stats = os.stat(file_path)
        db.add(ProcessedData(
            filename=os.path.basename(file_path),
            file_size=file_stats.st_size,
            status='uploaded',
            storage_path=f"minio://{bucket_name}/{os.path.basename(file_path)}"
        ))
        db.commit()
    finally:
        db.close()

def infer_schema(df: pd.DataFrame) -> dict:
    # Use Pandas Profiling for basic stats
    from pandas_profiling import ProfileReport
    profile = ProfileReport(df, minimal=True)
    return profile.to_json()

def validate_data(df: pd.DataFrame):
    # Basic Great Expectations check
    import great_expectations as ge
    ge_df = ge.dataset.PandasDataset(df)
    ge_df.expect_column_values_to_not_be_null("user_id")
    # Add more expectations here...

def store_in_database(df):
    from storage.postgres import store_processed_data
    store_processed_data(df)

def archive_to_minio(file_path):
    from storage.minio import archive_raw_file
    archive_raw_file(file_path)