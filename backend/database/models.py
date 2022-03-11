from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .database import Base

class Artist(Base):
    __tablename__ = 'Artists'
    id = Column(Integer, primary_key=True, index=True)
    external_urls = Column(String,index = True)
    followers = Column(Integer, index = True)
    genres = Column(String, index = True)
    href = Column(String, index= True)
    images = Column(String, index= True)
    name = Column(String, index= True)
    popularity = Column(Integer, index= True)
    type = Column(String, index=True )
    uri = Column(String, index = True)

    def convert_artist():
        artist_

class Song(Base):
    __tablename__ = "Songs"
    song_id = Column(Integer, primary_key=True, index=True)
    songs = Column(String,index = True)


