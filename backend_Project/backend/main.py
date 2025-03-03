# FastAPI + Uvicorn
from fastapi import FastAPI
import uvicorn
from api import endpoint

# app.mount("/static", StaticFiles(directory="static"), name="static")
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://localhost:8080",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(endpoint.router)

def main():
    uvicorn.run(host="0.0.0.0", port=8080, reload=True) 
# 開発環境での実行
if __name__ == "__main__":
    main()

