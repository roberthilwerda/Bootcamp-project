from fastapi import FastAPI
from typing import Optional
from pydantic import BaseModel
import billboard
from fastapi.middleware.cors import CORSMiddleware

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