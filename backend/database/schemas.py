from uuid import UUID
from pydantic import BaseModel
from typing import Optional


class Genre(BaseModel):
    name: str
    


class GenreArtist(BaseModel):
    id: Optional[str]

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
    date: str
    genre: str
    rank_aggregate = float
    count = int


    class Config:
        orm_mode = True
