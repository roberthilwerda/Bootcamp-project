from pydantic import BaseModel

class GenreBase(BaseModel):
    title: str
    description: str | None = None


class Genre(GenreBase):
    id: int
    name: str
    class Config:
        orm_mode = True

