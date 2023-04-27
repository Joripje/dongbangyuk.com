FROM python:3.9.7

WORKDIR /app

COPY requirements.txt /app

RUN apt-get update && apt-get install -y libgl1-mesa-glx
RUN pip install cmake==3.26.3
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY . /app

EXPOSE 8020

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8020"]
