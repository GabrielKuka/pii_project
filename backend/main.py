from datetime import datetime
from typing import List, Union

import uvicorn
from fastapi import Depends, FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, field_validator
from sqlalchemy import String, func, or_
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

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to your frontend URL
    allow_credentials=True,
    allow_methods=[
        "*"
    ],  # Allow specific methods, or use ["GET", "POST", etc.]
    allow_headers=[
        "*"
    ],  # Allow specific headers, or use ["Content-Type", "Authorization", etc.]
)

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


@app.get("/", response_model=List[PassportSchema])
async def search(
    search: str = Query(..., min_length=1, description="Search term"),
    passports: bool = Query(..., description="Include passports"),
    ids: bool = Query(..., description="Include ids"),
    db: Session = Depends(get_db),
):
    search_term = f"%{search}%".lower()
    results = []

    if passports:
        # Construct the filter conditions
        passports_filter = or_(
            models.Passport.personal_number.ilike(search_term),
            models.Passport.passport_number.ilike(search_term),
            models.Passport.first_name.ilike(search_term),
            (
                models.Passport.middle_name.ilike(search_term)
                if models.Passport.middle_name is not None
                else False
            ),
            models.Passport.last_name.ilike(search_term),
            func.lower(models.Passport.place_of_birth).contains(search_term),
            func.lower(models.Passport.place_of_living).contains(search_term),
            func.lower(models.Passport.phone_number.cast(String)).contains(
                search_term
            ),
        )

        passports_result = (
            db.query(models.Passport)
            .filter(passports_filter)
            .distinct(models.Passport.personal_number)
            .all()
        )
        results.extend(passports_result)

    if ids:
        pass

    return results


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=1111, reload=True)
