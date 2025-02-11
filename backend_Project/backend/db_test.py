from sqlalchemy import create_engine
import psycopg2
from sqlalchemy.orm import sessionmaker

# データベースURL
db_url = "postgresql://postgres:postgres@db:5432/tomato"

conn = psycopg2.connect(
        host="db",
        port=5432,
        database="tomato",
        user="postgres",
        password="password"
    )
engine = create_engine('postgresql+psycopg2://', creator=conn)
Session = sessionmaker(bind=engine)