from fastapi import APIRouter
from fastapi.responses import HTMLResponse
from schemas.schemas import Timer,AppSetting, History, SampleEntry
from database import Database
router = APIRouter()

sample_timer = {
    "1": {
        "time": 25 * 60,
        "rest_time": 7 * 60,
        "user": "test_user",
        "isRunning": False
    }
}

history_dict = {
    "1": {
        "date": "2025-01-27",
        "work_total": 25 * 60,
        "task_total": 10
    }
}

db = Database()

@router.get("/timer/{user_id}")
async def get_timer(user_id: str):
    # シンプルなタイマー画面
    timer = sample_timer[user_id]
    print(timer)
    return {
        "work_time": 25 * 60,
        "rest_time": 7 * 60,
        "user": "test_user",
        "isRunning": False
    }

@router.post("/update_timer/")
async def update_timer(timer: Timer, app: AppSetting):
    user_id = timer.user_id
    work_time = timer.work_time
    rest_time = timer.rest_time
    work_color = app.work_color
    rest_color = app.rest_color
         
    db.update_timer(user_id, work_time, rest_time, work_color, rest_color)

@router.post("/entry")
async def entry(sample_entry: SampleEntry):
    
    print(sample_entry.name)
    print(sample_entry.age)


@router.get("/setting", response_class=HTMLResponse)
async def setting(timer: Timer):
    return """
    <html>
        <head>
            <title>ユーザ</title>
        </head>
        <body>
            <h1>ユーザページ</h1>
            <p>ここに設定内容を表示します。</p>
        </body>
    </html>
    """

@router.get("/history/{user_id}")
async def history(user_id: str):
    history = history_dict[user_id]
    print(history)
    return {
        "date": history["date"],
        "work_total": history["work_total"],
        "task_total": history["task_total"],
    }
