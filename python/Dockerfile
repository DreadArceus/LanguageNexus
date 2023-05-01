FROM python:3.9-slim
WORKDIR /app

ENV PYTHON_ENV production

COPY ./requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python3", "./app/main.py"]