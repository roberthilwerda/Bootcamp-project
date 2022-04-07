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
from datetime import date, datetime
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
    # "192.168.1.58:3000",
    "http://192.168.1.58:3000",
    "http://192.168.1.58:3000",
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

@app.get("/", response_model=list[schemas.PopularGenre])
def all_data(limit: int = 6, year: int = 2021, month: int = 12, db: Session = Depends(get_db)):
    date = datetime(year, month, 1)
    genres = crud.get_popular_genres(db, limit, date)
    output = []
    for genre in genres:
        urls = crud.get_urls(genre[0], date, db)
        output.append({
            "genre": genre[0],
            "date": genre[1],
            "weighted_rank": genre[2],
            "previous_date": genre[3],
            "previous_weighted_rank": genre[4],
            "diff_months": genre[5],
            "external_url": urls[0][0],
            "image_url": urls[0][1]
        })
    return output


@app.get("/{genre}", response_model=schemas.GenreHistory)
def get_genre_trend(genre: str, db: Session = Depends(get_db)):
    history = crud.get_genre_history(genre, db)
    if not history: genre = "genre not found"
    plots = []
    for plot in history:
        plots.append({
            "date": plot[0],
            "weighted_rank": plot[1]
        })
    return {
        "genre": genre,
        "data": plots
    }



  
if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
