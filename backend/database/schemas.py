from uuid import UUID
from pydantic import BaseModel

class Genre(BaseModel):
    name: str
    class Config:
        orm_mode = True

