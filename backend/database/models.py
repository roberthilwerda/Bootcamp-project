from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float
from sqlalchemy.orm import relationship
from .database import Base

import uuid


class RawData(Base):
    __tablename__ = 'raw_data'
    id = Column(Integer, primary_key=True)
    date = Column(String)
    artist_name = Column(String)
    external_url = Column(String)
    number_of_followers = Column(Integer)
    genre = Column(String)
    image_url = Column(String)

