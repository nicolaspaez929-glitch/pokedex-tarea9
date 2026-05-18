FROM python:3.11-slim
WORKDIR /app
COPY . .
RUN pip install flask flask-cors psycopg2-binary supabase python-dotenv requests
EXPOSE 5001
CMD ["python", "app.py"]
