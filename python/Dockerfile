FROM python:3.9-slim
WORKDIR /app

ENV PYTHON_ENV production

COPY ./requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN addgroup --system --gid 1002 python
RUN adduser --system --uid 1002 fastapi
USER fastapi

CMD ["python3", "-m", "app.main"]
