from uuid import UUID
from pydantic import BaseModel
from typing import Optional

from backend.database.database import Base

class Genre(BaseModel):
    name: str

    class Config:
        orm_mode = True

class GenreArtist(BaseModel):
    id: Optional[str]



