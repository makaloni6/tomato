from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from models.base import User, Task
from models.base import Base

db_url = "postgresql://postgres:password@db:5432/tomato"

class Database:
    def __init__(self):

        self.engine = create_engine(db_url)
        Session = sessionmaker(bind=self.engine)
        self.session = Session()

    def update_timer(self, user_id: str, work_time: int, rest_time: int, work_color: str, rest_color: str):
        try:
            user = self.session.query(User).filter(User.user_id == user_id).one()
            user.work_time = work_time
            user.rest_time = rest_time
            user.color_bg_work = work_color
            user.color_bg_rest = rest_color
            self.session.commit()
        except Exception as e:
            print(e)
            self.session.rollback()
        
    def update_task():
        pass
    def delete_timer():
        pass

    def create_database(self):
        Base.metadata.create_all(bind=self.engine)


if __name__ == '__main__':
    db = Database()
    db.create_database()
