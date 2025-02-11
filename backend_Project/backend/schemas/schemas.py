from pydantic import BaseModel

class Timer(BaseModel):
    work_time: int
    rest_time: int
    user_id: str

class AppSetting(BaseModel):
    work_color: str
    rest_color: str

class History(BaseModel):
    date: str
    work_total: int
    task_total: int

class SampleEntry(BaseModel):
    name: str
    age: int
