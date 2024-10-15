export $(grep -v '^#' ./backend/.env | xargs) && docker-compose down && docker-compose up --build -d
