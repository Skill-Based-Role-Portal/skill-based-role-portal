FROM python:3-slim
WORKDIR /usr/src/app
COPY backend/common/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY backend/staff/staff.py ./
CMD [ "python", "./staff.py" ]