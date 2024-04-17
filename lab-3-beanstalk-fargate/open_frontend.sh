cd aws
BACKEND_ADDRESS=$(terraform output -json | jq -r '.public_ip.value')
cd ..

echo "Opening the browser..."
firefox http://$BACKEND_ADDRESS
