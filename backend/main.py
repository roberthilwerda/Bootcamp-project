from fastapi import FastAPI
from typing import Optional
from pydantic import BaseModel
import bboard
import spotipyapi
import json
from fastapi.middleware.cors import CORSMiddleware

def get_genres():
    artists = bboard.extract_artists()
    artists_jsons = [spotipyapi.retrieve_artist(artist) for artist in artists]
    with open("json_output.txt", "w") as file:
        file.write(json.dumps(artists_jsons))
        

app = FastAPI()

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