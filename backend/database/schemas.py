from uuid import UUID
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

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
    date: datetime
    genre: str
    rank_aggregate = float
    previous_rank_aggregate: float
    growth: float
    image_url: str



    class Config:
        orm_mode = True

class Genre(BaseModel):
    id: int
    genre: Optional[str]
    image_url: Optional[str]

    class Config:
        orm_mode = True

class User(BaseModel):
    user_id: str
    email: str
    name: str
    favorite_genre: Optional[str]
    picture_url: str
    access_token: Optional[str]

class UpdateAccessTokenSchema(BaseModel):
    access_token: str


