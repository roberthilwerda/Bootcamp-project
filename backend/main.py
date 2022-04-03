from msilib import schema
from fastapi import FastAPI, Depends, HTTPException
from typing import Optional
from pydantic import BaseModel
import uvicorn
# import bboard
# import spotipyapi
import json
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.orm import Session
from database import crud, models, schemas, utils
from database.database import SessionLocal, engine
from datetime import datetime
from dateutil.relativedelta import relativedelta


models.Base.metadata.create_all(bind=engine)

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

## CORS block of browser workaround
origins = [
    "http://localhost",
    # "192.168.178.16",
    # "https://192.168.178.16",
    "http://192.168.178.26:3000",
    "http://localhost:3000",
    "https://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def all_data(db: Session = Depends(get_db)):
    return utils.get_all(db=db)

@app.get("/populate_database")
def populate_database(db: Session = Depends(get_db)):
    return utils.populate_database_all(db=db)

@app.get("/populate_database_manual/{date}")
def populate_database_manual(date: str, db: Session = Depends(get_db)):
    return utils.populate_database(db=db, date=date)

@app.get("/populate_database_all")
def populate_database_all(db: Session = Depends(get_db)):
    return utils.populate_database_all(db=db)

@app.get("/save_genres")
def save_genres(db: Session = Depends(get_db)):
    return utils.save_genres(db=db)

@app.get("/save_images")
def save_images(db: Session = Depends(get_db)):
    return utils.save_images(db=db)

@app.get("/search/{genre}")
def get_genre_trend(genre: str, date_from: str, date_to: str, db: Session = Depends(get_db)):
    # most_recent_date = db.query(models.RawData.date).order_by(models.RawData.date.desc()).first()
    # three_months_before = most_recent_date[0] - relativedelta(months=3)
    date_from = datetime.strptime(date_from, "%Y-%m-%d")
    date_to = datetime.strptime(date_to, "%Y-%m-%d")
    results = db.query(models.RawData).\
        where(models.RawData.date >= date_from).\
        where(models.RawData.date <= date_to).\
        where(models.RawData.genre == genre).\
        order_by(models.RawData.date.desc()).all()
    return results

@app.get("/get_6_popular_genres")
def get_popular_genres(db: Session = Depends(get_db)):
    genres = db.execute(text("""
        SELECT
            genre,
            MIN(date) as date,
            SUM(1/CBRT(raw_data.rank)) AS weighted_rank,
            LEAD(MIN(date)) OVER (PARTITION BY genre ORDER BY date DESC),
            LEAD(SUM(1/CBRT(raw_data.rank)), 1) OVER(
                PARTITION BY genre
                ORDER BY date DESC) AS previous_weighted_rank,
            date_part('month', AGE(MIN(date), LEAD(MIN(date)) OVER (PARTITION BY genre ORDER BY date DESC))) as diff_months

        FROM raw_data
        GROUP BY date, genre
        ORDER BY date DESC, weighted_rank DESC
        LIMIT 6
        """)).all()
    return genres

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)

def resolve_growth_rate(data, db: Session = Depends(get_db)):
    entries = utils.get_all(db=db)
    print(entries)
