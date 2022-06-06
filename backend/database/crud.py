from numpy import array
from sqlalchemy.orm import Session
from . import models, schemas

def get_all_genres(db: Session):
    genres = db.query(models.Genre).all()
    return [str(genre) for genre in genres]

def create_raw_data(db:Session, item):
    db.add(item)
    db.commit()
    db.refresh(item)

def create_genre(db:Session, item):
    db.add(item)
    db.commit()
    db.refresh(item)



