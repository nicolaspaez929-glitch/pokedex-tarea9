FROM python:3.11-slim
WORKDIR /app
COPY . .
RUN pip install flask flask-cors psycopg2-binary supabase python-dotenv
EXPOSE 5000
CMD ["python", "app.py"]
