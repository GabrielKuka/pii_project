from sqlalchemy import Column, DateTime, Integer, String

from database import Base


class Passport(Base):
    __tablename__ = "passports"

    id = Column(Integer, primary_key=True, index=True)
    personal_number = Column(String, nullable=False)
    passport_number = Column(String, nullable=False)
    first_name = Column(String, nullable=False)
    middle_name = Column(String, nullable=True)
    last_name = Column(String, nullable=False)

    date_of_birth = Column(DateTime, nullable=False)
    place_of_birth = Column(String, index=True, nullable=False)
    place_of_living = Column(String, index=True, nullable=False)
    phone_number = Column(Integer, nullable=True)
