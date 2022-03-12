from fastapi import FastAPI, Depends, HTTPException
from typing import Optional
from pydantic import BaseModel
import bboard
import spotipyapi
import json
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import crud, models, schemas
from database.database import SessionLocal, engine
from uuid import UUID

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

@app.post("/add_genres", response_model=schemas.Genre)
def add_genre(genre: schemas.Genre, db: Session = Depends(get_db)):
    return crud.create_genre(db=db, genre=genre)

@app.post("/update_genres")
def update_genres(db: Session = Depends(get_db)):
    return crud.update_genres(db=db)

@app.get("/get_all_genres")
def get_all_genres(db: Session = Depends(get_db)):
    return crud.get_all_genres(db=db)