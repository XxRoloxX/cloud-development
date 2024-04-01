#!/bin/env bash

# This script is used to build the frontend of the application with address of the backend generated by the terraform script
cd aws
BACKEND_ADDRESS=$(terraform output -json | jq -r '.public_ip.value')
cd ..

echo "Building the frontend with the backend address: $BACKEND_ADDRESS"

docker build -t registry.rolo-labs.xyz/ttt-frontend:latest --build-arg VITE_API_URL=http://$BACKEND_ADDRESS:8080 ../lab-1-TicTacToe/tic-tac-toe-frontend/

echo "Pushing the frontend image to the registry"

docker push registry.rolo-labs.xyz/ttt-frontend:latest

