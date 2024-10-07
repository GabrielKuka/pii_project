from datetime import datetime
from typing import List, Union

import uvicorn
from fastapi import Depends, FastAPI, HTTPException, Query
from pydantic import BaseModel, field_validator
from sqlalchemy import String, or_
from sqlalchemy.orm import Session

import models
from database import SessionLocal, engine


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


app = FastAPI(title="Search Interface", version=1.0)

models.Base.metadata.create_all(bind=engine)


class PassportSchema(BaseModel):
    personal_number: str
    passport_number: str
    first_name: str
    middle_name: Union[str | None]
    last_name: str
    date_of_birth: str
    place_of_birth: str
    place_of_living: str
    phone_number: Union[int | None]

    @field_validator("date_of_birth", mode="before")
    def format_date_of_birth(cls, value):
        if isinstance(value, datetime):
            return value.isoformat()
        return value

    class Config:
        orm_mode = True


@app.get("/passports", response_model=List[PassportSchema])
async def search_passports(
    search: str = Query(..., min_length=1, description="Search term"),
    db: Session = Depends(get_db),
):
    search_term = f"%{search}%"

    # Construct the filter conditions
    filters = or_(
        models.Passport.personal_number.ilike(search_term),
        models.Passport.passport_number.ilike(search_term),
        models.Passport.first_name.ilike(search_term),
        (
            models.Passport.middle_name.ilike(search_term)
            if models.Passport.middle_name is not None
            else False
        ),
        models.Passport.last_name.ilike(search_term),
        models.Passport.place_of_birth.ilike(search_term),
        models.Passport.place_of_living.ilike(search_term),
        models.Passport.phone_number.cast(String).ilike(search_term),
    )

    results = db.query(models.Passport).filter(filters).all()

    if not results:
        raise HTTPException(
            status_code=404,
            detail="No passports found matching the search criteria.",
        )

    return results


@app.get("/")
async def get_main():

    return {"message": "Hello world"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=1111, reload=True)
