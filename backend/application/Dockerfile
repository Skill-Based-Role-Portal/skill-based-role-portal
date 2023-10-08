FROM python:3-slim
WORKDIR /usr/src/app
COPY backend/common/requirements.txt backend/common/invokes.py ./
RUN pip install --no-cache-dir -r requirements.txt
COPY backend/application/application.py ./
CMD [ "python", "./application.py" ]
