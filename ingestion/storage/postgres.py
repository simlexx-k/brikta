from sqlalchemy import create_engine
from .models import Base

def store_in_database(df):
    """Store validated data in PostgreSQL"""
    engine = create_engine("postgresql://admin:admin@postgres:5432/ingestion_db")
    Base.metadata.create_all(engine)
    df.to_sql('processed_data', engine, if_exists='append', index=False) 