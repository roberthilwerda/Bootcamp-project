from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from .database import Base

import uuid

class Artist(Base):
    __tablename__ = 'artist'
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    external_urls = Column(String,index = True)
    followers = Column(Integer, index = True)
    href = Column(String, index= True)
    images = Column(String,index = True)
    name = Column(String, index= True)
    popularity = Column(Integer, index= True)
    type = Column(String, index=True)
    uri = Column(String, index = True)
    
    songs = relationship("Song", back_populates="artist")
    genre_artist = relationship("GenreArtist", back_populates="artist")


class Genre(Base):
    __tablename__ = 'genre'
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    name = Column(String, index=True)

    genre_artist = relationship("GenreArtist", back_populates="genre")

class Song(Base):
    __tablename__ = 'song'
    id = Column(UUID(as_uuid=True), primary_key=True, index=True)
    name = Column(String, index = True)
    artist_id = Column(UUID, ForeignKey("artist.id"))

    artist = relationship("Artist", back_populates="songs")

class GenreArtist(Base):
    __tablename__ = 'genre_artist'
    id = Column(UUID(as_uuid=True), primary_key=True, index=True)
    genre_id = Column(UUID, ForeignKey("genre.id"))
    artist_id = Column(UUID, ForeignKey("artist.id"))

    genre = relationship("Genre", back_populates="genre_artist")
    artist = relationship("Artist", back_populates="genre_artist")

class Song(Base):
    __tablename__ = "Songs"
    song_id = Column(Integer, primary_key=True, index=True)
    songs = Column(String,index = True)


