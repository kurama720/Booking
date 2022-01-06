#!/bin/sh

echo "Flush the manage.py command it any"

while ! python manage.py flush --no-input 2>&1; do
  echo "Flusing django manage command"
  sleep 3
done

echo "Migrate the Database at startup of project"

# Wait for few minute and run db migraiton
while ! python manage.py migrate  2>&1; do
   echo "Migration is in progress status"
   sleep 3
done

echo "Collect static files"

while ! python manage.py collectstatis 2>&1; do
   echo "Collectstatis is in progress status"
   sleep 3
done

echo "Django docker is fully configured successfully."

echo "Starting Django server"

gunicorn backend.wsgi:application --workers 2 --log-level info --bind 0.0.0.0:3000

exec "$@"
