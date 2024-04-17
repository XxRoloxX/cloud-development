#!/bin/env bash

BACKEND_ADDRESS=ttt-xxroloxx.us-east-1.elasticbeanstalk.com

echo "Building the frontend with the backend address: $BACKEND_ADDRESS"

sudo docker build -t xxroloxx/ttt-frontend:latest --build-arg VITE_API_URL=http://$BACKEND_ADDRESS:8080 ../lab-1-TicTacToe/tic-tac-toe-frontend/

echo "Pushing the frontend image to the registry"

sudo docker push xxroloxx/ttt-frontend:latest


