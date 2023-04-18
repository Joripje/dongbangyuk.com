from fastapi import FastAPI, File, Form, UploadFile

app = FastAPI()

@app.post("/emotions")
async def emotion_classification(image: UploadFile = File(), game_id: int = Form(), user_id: str = Form()):
    image_data = await image.read()

    return 0