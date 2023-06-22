"""Defines the /normalize route."""
from typing import List, Union
from fastapi import APIRouter
from pydantic import BaseModel, StrictFloat, StrictInt  # pylint: disable=no-name-in-module

router = APIRouter()


class DataModel(BaseModel):  # pylint: disable=too-few-public-methods
    """Data model for receiving data from the client."""
    data: List[Union[StrictFloat, StrictInt]]


@router.post("/normalize")
async def normalize(body: DataModel):
    """
    Normalizes an array of numbers. Each number is scaled between 0 and 1,
    with 0 representing the minimum value in the array and 1 representing the maximum value.
    """
    data = body.data
    if not data:
        return {"normalizedData": []}

    max_value = max(data)
    min_value = min(data)
    if max_value == min_value:
        normalized_data = [0 for _ in data]
    else:
        normalized_data = [(num - min_value) / (max_value - min_value)
                           for num in data]

    return {"normalizedData": normalized_data}
