from sqlalchemy import create_engine
from app.models import Base
import time
from sqlalchemy import exc

DATABASE_URL = "postgresql://admin:admin@postgres:5432/ingestion_db?client_encoding=utf8"

engine = create_engine(DATABASE_URL)

def init_db():
    max_retries = 5
    retry_count = 0
    
    while retry_count < max_retries:
        try:
            Base.metadata.create_all(bind=engine)
            print("Database tables created successfully")
            return
        except exc.OperationalError:
            retry_count += 1
            print(f"Database connection failed, retry {retry_count}/{max_retries}")
            time.sleep(2)
    
    print("Failed to connect to database after multiple attempts")
    exit(1)

if __name__ == "__main__":
    init_db()
    print("Database tables created") 