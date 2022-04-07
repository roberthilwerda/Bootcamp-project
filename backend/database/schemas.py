from datetime import date
from uuid import UUID
from matplotlib import dates
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class PopularGenre(BaseModel):
    genre: str
    date: date
    weighted_rank: float
    previous_date: date
    previous_weighted_rank: float
    diff_months: int
    external_url: str
    image_url: str

class GenreData(BaseModel):
    date: date
    weighted_rank: float

class GenreHistory(BaseModel):
    genre: str
    data: list[GenreData]

