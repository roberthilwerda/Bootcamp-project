from sqlalchemy.orm import Session


from . import models, schemas


def create_genre(db: Session, genre: schemas.Genre):
    db_item = models.Genre(name="Henk") ## create Genre instance with your data
    db.add(db_item) 
    db.commit()
    db.refresh(db_item)
    return db_item

