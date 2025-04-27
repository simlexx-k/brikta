from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class ProcessedData(Base):
    __tablename__ = "processed_data"
    
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, unique=True, index=True)
    status = Column(String, default="pending")  # pending/processing/complete/error
    file_size = Column(Integer)
    content_type = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    storage_path = Column(String)
    error_message = Column(String, nullable=True)

    def __repr__(self):
        return f"<ProcessedData {self.filename} ({self.status})>"
