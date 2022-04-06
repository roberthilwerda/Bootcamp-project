from datetime import datetime
from uuid import UUID
from pydantic import BaseModel
from typing import Optional

class PopularGenre(BaseModel):
    genre: str
    date: datetime
    

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
