from msilib import schema
from fastapi import FastAPI, Depends, HTTPException
from typing import Optional
from pydantic import BaseModel
import uvicorn
# import bboard
# import spotipyapi
import json
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import crud, models, schemas, utils
from database.database import SessionLocal, engine
from datetime import datetime

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

    

# if __name__ == "__main__":
#     uvicorn.run(app, host="localhost", port=8000)

