from numpy import unicode_
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import Boolean, Column, ForeignKey, Integer, BigInteger, String, Float, Date
from sqlalchemy.orm import relationship
from .database import Base

import uuid


class RawData(Base):
    __tablename__ = 'raw_data'
    id = Column(Integer, primary_key=True)
    date = Column(Date)
    artist_name = Column(String)
    rank = Column(Integer)
    external_url = Column(String)
    number_of_followers = Column(Integer)
    genre = Column(String)
    image_url = Column(String)

class ManipulatedData(Base):
    __tablename__ = 'manipulated_data'
    id = Column(Integer, primary_key=True)
    date = Column(Date)
    genre = Column(String, ForeignKey("genre.genre"))
    rank_aggregate = Column(Float)
    count = Column(BigInteger)
    image_url = Column(String)
    date_index = Column(Integer)

class Genre(Base):
    __tablename__ = 'genre'
    id = Column(Integer, primary_key=True)
    genre = Column(String)
    image_url = Column(String)

