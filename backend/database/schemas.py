from uuid import UUID
from pydantic import BaseModel
from typing import Optional

from backend.database.database import Base

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
