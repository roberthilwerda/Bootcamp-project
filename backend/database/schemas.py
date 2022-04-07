from datetime import date
from uuid import UUID
from matplotlib import dates
from pydantic import BaseModel
from typing import Optional

class PopularGenre(BaseModel):
    genre: str
    date: date
    weighted_rank: float
    previous_date: date
    previous_weighted_rank: float
    diff_months: int
    external_url: str
    image_url: str

class GenreHistory(BaseModel):
    genre: str
    dates: list[date]
    weighted_ranks: list[float]

class RawData(BaseModel):
    id: Optional[str]
    date: str
    artist_name: str
    external_url = str
    number_of_followers = int
    genre = str
    image_url = str

    class Config:
        orm_mode = True

class ManipulatedData(BaseModel):
    id: int
    date: str
    genre: str
    rank_aggregate = float
    count = int
    image_url = str


    class Config:
        orm_mode = True

class Genre(BaseModel):
    id: int
    genre: Optional[str]
    image_url: Optional[str]

    class Config:
        orm_mode = True
