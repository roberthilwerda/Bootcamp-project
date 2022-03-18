from numpy import array
from sqlalchemy.orm import Session
from . import models, schemas

def create_genre(db: Session, genre: schemas.Genre):
    db_item = models.Genre(name=genre.name) ## create Genre instance with your data
    db.add(db_item) 
    db.commit()
    db.refresh(db_item)
    return db_item

def update_genres(db: Session):
    print("UPDATING GENRES")
    genres = ["Rock", "Jazz", "Blues"] ## replace this array with the data from the API
    response = []

    for x in genres:
        
        db_item = models.Genre(name=x) ## create Genre instance with your data
        db.add(db_item) 
        response.append({'name': db_item.name})
        db.commit()
        db.refresh(db_item)
        
    
    return response

def get_all_genres(db: Session):
    genres = db.query(models.Genre).all()
    return genres

def get_genre(db: Session):
    pass

    
    