from pydantic import BaseModel

class ArtistBase(BaseModel):
    title: str
    description: str | None = None

class ArtistCreate(ArtistBase):
    pass

class Artist(ArtistBase):
    id: int
    external_urls: str
    followers: int
    genres: int
    href: int
    id: int
    images: int
    name: int
    popularity: int 
    type: int
    uri: int

    class Config:
        orm_mode = True

