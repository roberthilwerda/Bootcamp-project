from sqlalchemy import Boolean, Column, ForeignKey, Integer, String

from database_connection import Base

class Artist(Base):
    __tablename__ = 'Artists'
    external_urls = Column(String,index = True)
    followers = Column(Integer, index = True)
    genres = Column(String, index = True)
    href = Column(String, index= True)
    id = Column(String, primary_key= True, index= True)
    images = Column(String, index= True)
    name = Column(String, index= True)
    popularity = Column(Integer, index= True)
    type = Column(String, index=True )
    uri = Column(String, index = True)

class Test(Base):
    __tablename__ = "Test"
    id = Column(Integer, primary_key=True, index=True)


# all_dict = retrieve_artist('linkin park')
# artists_dict = json.loads(json.dumps(all_dict))
# artists_object = Artist(**artists_dict) 
# print(artists_object)