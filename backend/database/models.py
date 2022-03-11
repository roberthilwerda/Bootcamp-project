from ast import For
from turtle import back
from uuid import UUID
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .database import Base

class Artist(Base):
    __tablename__ = 'artist'
    id = Column(Integer, primary_key=True, index=True)
    external_urls = Column(String,index = True)
    followers = Column(Integer, index = True)
    genres = Column(String, index = True)
    href = Column(String, index= True)
    name = Column(String, index= True)
    popularity = Column(Integer, index= True)
    type = Column(String, index=True)
    uri = Column(String, index = True)
    
    songs = relationship("Song", back_populates="artist")
    genre_artist = relationship("GenreArtist", back_populates="artist")

class Genre(Base):
    __tablename__ = 'genre'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)

    genre_artist = relationship("GenreArtist", back_populates="genre")

class Song(Base):
    __tablename__ = 'song'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index = True)
    artist_id = Column(Integer, ForeignKey("artist.id"))

    artist = relationship("Artist", back_populates="song")

class GenreArtist(Base):
    __tablename__ = 'genre_artist'
    id = Column(Integer, primary_key=True, index=True)
    genre_id = Column(Integer, ForeignKey("genre.id"))
    artist_id = Column(Integer, ForeignKey("artist.id"))

    genre = relationship("Genre", back_populates="genre_artist")
    artist = relationship("Artist", back_populates="genre_artist")


