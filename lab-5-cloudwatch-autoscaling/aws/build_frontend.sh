# Pass the backend url as an argument to the script
BACKEND_URL=$1
VITE_API_URL=$BACKEND_URL
export VITE_API_URL
echo "Building frontend with backend url: $BACKEND_URL"
sudo docker compose -f ../docker-compose.prod.yml build --build-arg VITE_API_URL=$BACKEND_URL
sudo docker push xxroloxx/ttt-frontend
