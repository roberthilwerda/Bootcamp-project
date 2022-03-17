from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float
from sqlalchemy.orm import relationship
from .database import Base

import uuid

class Artist(Base):
    __tablename__ = 'artist'
<<<<<<< HEAD
    id = Column(Integer, primary_key=True, index=True, default=uuid.uuid4)
    external_urls = Column(String,index = True)
    followers = Column(Integer, index = True)
    href = Column(String, index= True)
    name = Column(String, index= True)
    popularity = Column(Integer, index= True)
    type = Column(String, index=True)
    uri = Column(String, index = True)
=======
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    name = Column(String, unique=True)
    external_urls = Column(String)
    followers = Column(Integer)
    href = Column(String)
    images = Column(String)
    popularity = Column(Float)
    type = Column(String)
    uri = Column(String)
>>>>>>> development
    
    songs = relationship("Song", back_populates="artist")
    genre_artist = relationship("GenreArtist", back_populates="artist")


class Genre(Base):
    __tablename__ = 'genre'
<<<<<<< HEAD
    id = Column(Integer, primary_key=True, index=True, default=uuid.uuid4)
    name = Column(String, index=True)
    popularity = Column(Integer, index=True)
=======
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    name = Column(String, unique=True)
>>>>>>> development

    genre_artist = relationship("GenreArtist", back_populates="genre")

class Song(Base):
    __tablename__ = 'song'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index = True)
    artist_id = Column(Integer, ForeignKey("artist.id"))

    artist = relationship("Artist", back_populates="songs")

class GenreArtist(Base):
    __tablename__ = 'genre_artist'
    id = Column(Integer, primary_key=True, index=True)
    genre_id = Column(Integer, ForeignKey("genre.id"))
    artist_id = Column(Integer, ForeignKey("artist.id"))

    genre = relationship("Genre", back_populates="genre_artist")
    artist = relationship("Artist", back_populates="genre_artist")


