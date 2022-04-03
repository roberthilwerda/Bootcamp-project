from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import Boolean, Column, ForeignKey, Integer, BigInteger, String, Float, text, Date
from sqlalchemy.orm import Session
from datetime import datetime


SQLALCHEMY_DATABASE_URL = "postgresql://postgres:master1234@localhost:5432/bootcamp_project_gentrend"

engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class RawData(Base):
    __tablename__ = 'raw_data'
    id = Column(Integer, primary_key=True)
    date = Column(Date)
    artist_name = Column(String)
    rank = Column(Integer)
    external_url = Column(String)
    number_of_followers = Column(Integer)
    genre = Column(String)
    image_url = Column(String)

class ManipulatedData(Base):
    __tablename__ = 'manipulated_data'
    id = Column(Integer, primary_key=True)
    date = Column(Date)
    genre = Column(String, ForeignKey("genre.genre"))
    rank_aggregate = Column(Float)
    count = Column(BigInteger)
    image_url = Column(String)

class Genre(Base):
    __tablename__ = 'genre'
    id = Column(Integer, primary_key=True)
    genre = Column(String)
    image_url = Column(String)

db: Session = SessionLocal()

def convert_to_number(date):
    begin = datetime.strptime("2010-01-01", "%Y-%m-%d")
    number = datetime.strptime(date, "%Y-%m-%d")
    return (number.year - begin.year) * 12 + number.month - begin.month

genres = db.execute(text("SELECT DISTINCT genre FROM raw_data"))

counts = db.execute(text("""
    SELECT genre, COUNT(*) FROM raw_data
    WHERE date > (SELECT date FROM raw_data ORDER BY date DESC LIMIT 1) - interval '3 month'
    GROUP BY genre
    ORDER BY count DESC
    LIMIT 6"""))

for count in counts:
    print(count[0], count[1])