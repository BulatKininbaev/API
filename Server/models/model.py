from pydantic import BaseModel, validator
import re


class ContactInfo(BaseModel):
    id: int
    fio: str
    phone: str
    comment: str

    @validator("phone")
    def phone_validator(cls, value):
        if re.match(r'8\d{10}', value) is None:
            raise ValueError("Не верный формат номера телефона")
        return value

