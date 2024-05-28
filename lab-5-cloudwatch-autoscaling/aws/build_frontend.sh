# Pass the backend url as an argument to the script
BACKEND_URL=$1
VITE_API_URL=$BACKEND_URL
export VITE_API_URL
echo "Building frontend with backend url: $BACKEND_URL"
# docker build -f ../tic-tac-toe-frontend/Dockerfile -t ttt-frontend --build-arg VITE_API_URL=$BACKEND_URL .
docker compose -f ../docker-compose.prod.yml build --build-arg VITE_API_URL=$BACKEND_URL
docker push xxroloxx/ttt-frontend