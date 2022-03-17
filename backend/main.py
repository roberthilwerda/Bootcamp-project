from fastapi import FastAPI, Depends, HTTPException
from typing import Optional
from pydantic import BaseModel
import bboard
import spotipyapi
import json
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import crud, models, schemas, utils
from database.database import SessionLocal, engine

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

@app.get("/secret_update_page")
def update(db: Session = Depends(get_db)):
    chart_data = utils.get_chart_data()
    for item in chart_data:
        genre = models.Genre(item["genres"])
        artist = models.Artist(
            external_urls = item["external_urls"],
            followers = item["followers"],
            href = item["href"],
            name = item["name"],
            popularity = item["popularity"],
            #type 
            #uri I think these properties are not nessecery?
        )
        song = models.Song
        song = models.GenreArtist

@app.get("/")
def get_all_genres(db: Session = Depends(get_db)):
    return crud.get_all_genres(db=db)

@app.get("/populate_database")
def populate_database(db: Session = Depends(get_db)):
    return crud.populate_database(db=db)

