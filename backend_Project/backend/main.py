# FastAPI + Uvicorn
from fastapi import FastAPI
import uvicorn
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
app = FastAPI()
# app.mount("/static", StaticFiles(directory="static"), name="static")
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:5173",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Timer(BaseModel):
    time: int
    user: str
    mood: str

@app.post("/timer")
async def timer(timer: Timer):
    print(timer)
    return timer

@app.get("/timer")
async def root():
    # シンプルなタイマー画面
    return {
        "time": 25 * 60,
        "user": "test_user",
        "isRunning": False
    }

@app.get("/index", response_class=HTMLResponse)
async def index():
    return """
    <html>
        <head>
            <title>設定</title>
        </head>
        <body>
            <h1>設定ページ</h1>
            <p>ここに設定内容を表示します。</p>
        </body>
    </html>
    """

@app.get("/setting", response_class=HTMLResponse)
async def setting():
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

def main():
    uvicorn.run(host="0.0.0.0", port=8080, reload=True) 
# 開発環境での実行
if __name__ == "__main__":
    main()
