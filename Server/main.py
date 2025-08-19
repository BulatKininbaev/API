from fastapi import FastAPI, HTTPException, Query
import uvicorn
from routers.contact_router import router as main_router
from fastapi.middleware.cors import CORSMiddleware


origins = [
    # разрешенные источники
    "http://127.0.0.1:8000",
    "http://localhost:63342"
]



app = FastAPI()

app.add_middleware(
    # с начала все запрещаем
    CORSMiddleware,
    # потом начинаем разрешать необходимое
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(main_router, prefix="/api", tags=["contacts"])



if __name__ == '__main__':
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)