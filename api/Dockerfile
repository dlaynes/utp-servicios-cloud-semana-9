FROM python:3.10-slim
WORKDIR /app/api
ENV DATOS_PATH=/app/datos
ENV API_PORT=8000
ENV PYTHONUNBUFFERED=1
COPY api/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY api/app.py .
COPY datos/ /app/datos/
EXPOSE 8000
CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:8000"]
