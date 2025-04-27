import os
import time
import logging
from redis import Redis
from connectors.csv_connector import process_csv
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Configuration from environment variables
REDIS_HOST = os.getenv("REDIS_HOST", "redis")
REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))
REDIS_CHANNEL = os.getenv("REDIS_CHANNEL", "file_ingestion")
WATCH_DIR = os.getenv("WATCH_DIR", "/data/incoming")
PROCESSED_DIR = os.getenv("PROCESSED_DIR", "/data/processed")
FAILED_DIR = os.getenv("FAILED_DIR", "/data/failed")
MAX_RETRIES = int(os.getenv("MAX_RETRIES", 3))

class FileHandler(FileSystemEventHandler):
    """Watchdog handler for directory monitoring"""
    def on_created(self, event):
        if not event.is_directory:
            logger.info(f"New file detected: {event.src_path}")
            process_file(event.src_path)

def connect_redis():
    """Create Redis connection with retries"""
    retries = 5
    while retries > 0:
        try:
            redis = Redis(host=REDIS_HOST, port=REDIS_PORT, decode_responses=True)
            redis.ping()
            return redis
        except Exception as e:
            logger.warning(f"Redis connection failed: {str(e)}")
            retries -= 1
            time.sleep(5)
    raise ConnectionError("Could not connect to Redis")

def process_file(file_path: str):
    """Process a file with retry logic"""
    logger.info(f"Processing file: {file_path}")
    
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            process_csv(file_path)
            archive_file(file_path, PROCESSED_DIR)
            logger.info(f"Successfully processed {file_path}")
            return
        except Exception as e:
            logger.error(f"Attempt {attempt}/{MAX_RETRIES} failed: {str(e)}")
            if attempt == MAX_RETRIES:
                archive_file(file_path, FAILED_DIR)
                logger.error(f"Permanently failed to process {file_path}")
            time.sleep(2 ** attempt)

def archive_file(source_path: str, target_dir: str):
    """Move processed files to archive directory"""
    try:
        os.makedirs(target_dir, exist_ok=True)
        file_name = os.path.basename(source_path)
        target_path = os.path.join(target_dir, file_name)
        os.rename(source_path, target_path)
    except Exception as e:
        logger.error(f"Failed to archive file: {str(e)}")

def start_file_watcher():
    """Start directory watcher for new files"""
    observer = Observer()
    event_handler = FileHandler()
    observer.schedule(event_handler, WATCH_DIR, recursive=False)
    observer.start()
    logger.info(f"Watching directory: {WATCH_DIR}")
    return observer

def main():
    # Initialize directories
    os.makedirs(WATCH_DIR, exist_ok=True)
    os.makedirs(PROCESSED_DIR, exist_ok=True)
    os.makedirs(FAILED_DIR, exist_ok=True)
    
    # Connect to Redis
    redis = connect_redis()
    pubsub = redis.pubsub()
    pubsub.subscribe(REDIS_CHANNEL)
    
    # Start file watcher
    observer = start_file_watcher()
    
    try:
        logger.info("Ingestion service started")
        while True:
            # Process Redis messages
            message = pubsub.get_message(ignore_subscribe_messages=True)
            if message:
                file_path = message.get('data')
                if isinstance(file_path, str) and os.path.exists(file_path):
                    process_file(file_path)
            
            # Check for new files periodically
            time.sleep(1)
            
    except KeyboardInterrupt:
        logger.info("Shutting down ingestion service")
    finally:
        observer.stop()
        observer.join()
        redis.close()

if __name__ == "__main__":
    main() 