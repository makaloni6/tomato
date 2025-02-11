from typing import Any
from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy import Integer, String, ForeignKey
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped, mapped_column

class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "user_detail"

    user_id: Mapped[int] = mapped_column(primary_key=True)
    work_time: Mapped[int] = mapped_column(default=25 * 60)
    work_total: Mapped[int] = mapped_column(default=0)
    rest_time: Mapped[int] = mapped_column(default=5 * 60)
    rest_total: Mapped[int] = mapped_column(default=0)
    color_bg_work: Mapped[str] = mapped_column(default="#000000")
    color_bg_rest: Mapped[str] = mapped_column(default="#000000")

class Task(Base):
    __tablename__ = "task_detail"

    task_id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey('user_detail.user_id'))
    task_name: Mapped[str] = mapped_column(String)
    task_time: Mapped[int] = mapped_column(Integer)
    task_total: Mapped[int] = mapped_column(Integer)
    rest_time: Mapped[int] = mapped_column(Integer)
    rest_total: Mapped[int] = mapped_column(Integer)


