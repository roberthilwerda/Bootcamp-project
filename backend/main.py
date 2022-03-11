from fastapi import FastAPI, Depends, HTTPException
from typing import Optional
from pydantic import BaseModel
import bboard
import spotipyapi
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import crud, models, schemas
from database.database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

def get_genres():
    artists = bboard.extract_artists()
    for artist in artists:
        result = spotipyapi.retrieve_artist(artist)
        print(result)
        

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

## CORS block of browser workaround
origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
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

@app.get('/first')
def index():
    data = billboard.ChartData('hot-100')
    return {str(data.entries[0])}

@app.get('/second')
def index():
    data = billboard.ChartData('hot-100')
    return {str(data.entries[1])}


@app.post("/create_artists/{name}", response_model=schemas.Artist)
def create_artist(artist: schemas.ArtistCreate, db: Session = Depends(get_db)):
    db_artist = crud.get_artist_by_name(db, name=artist.name)
    if db_artist:
        raise HTTPException(status_code=400, detail="Artist already registered")
    return crud.create_artist(db=db, artist=artist)
