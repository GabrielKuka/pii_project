from sqlalchemy import Column, DateTime, Date, Integer, String, BigInteger

from database import Base

class Id(Base):
    __tablename__ = 'confidential_ids' 

    type = Column(String, nullable=False)
    personal_number = Column(String, primary_key=True, nullable=False)
    card_number = Column(BigInteger, nullable=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    gender = Column(String, nullable=False)

    birth_place = Column(String, nullable=True)
    birth_date = Column(DateTime, nullable=False)
    issue_date = Column(DateTime, nullable=False)
    expiry_date = Column(DateTime, nullable=False)

    authority = Column(String, nullable=False)
    phone_number = Column(Integer, nullable=True)
    photo = Column(String, nullable=False)

    

class Passport(Base):
    __tablename__ = "passports"

    id = Column(Integer, primary_key=True, index=True)
    type = "passport"
    personal_number = Column(String, nullable=False)
    passport_number = Column(String, nullable=False)
    first_name = Column(String, nullable=False)
    middle_name = Column(String, nullable=True)
    last_name = Column(String, nullable=False)

    date_of_birth = Column(DateTime, nullable=False)
    place_of_birth = Column(String, index=True, nullable=False)
    place_of_living = Column(String, index=True, nullable=False)
    phone_number = Column(Integer, nullable=True)
