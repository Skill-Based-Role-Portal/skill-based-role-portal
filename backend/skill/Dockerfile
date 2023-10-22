FROM python:3-slim
WORKDIR /usr/src/app
COPY backend/common/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY backend/skill/skill.py ./
CMD [ "python", "./skill.py" ]