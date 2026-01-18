from pydantic import BaseModel, Field
from datetime import datetime

class TaskBase(BaseModel):
    title: str
    priority: int = Field(ge=1, le=10)
    due_date: datetime

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: str | None = None
    is_done: bool | None = None
    priority: int | None = Field(default=None, ge=1, le=10)
    due_date: datetime

class TaskOut(TaskBase):
    id: int
    is_done: bool

    class Config:
        from_attributes = True
