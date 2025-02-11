from .base import Base

class User(Base):
    id: int
    work_time: int
    work_total: int
    rest_time: int
    rest_total: int
    color_bg_work: str
    color_bg_rest: str
    color_text_work: str
    color_text_rest: str
