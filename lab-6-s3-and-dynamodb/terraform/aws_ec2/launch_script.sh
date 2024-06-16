#!/bin/bash
echo "Installing Docker"
sudo yum update -y
sudo amazon-linux-extras install docker -y
sudo yum install git -y
sudo service docker start
sudo usermod -a -G docker ec2-user

echo "Installing Docker Compose"
mkdir -p /usr/local/lib/docker/cli-plugins/
sudo curl -SL https://github.com/docker/compose/releases/download/v2.27.0/docker-compose-linux-x86_64 -o /usr/local/lib/docker/cli-plugins/docker-compose
sudo chmod +x /usr/local/lib/docker/cli-plugins/docker-compose

echo "Fetching app config"
git clone https://github.com/XxRoloxX/cloud-development.git
cd cloud-development/lab-6-s3-and-dynamodb
echo "export POSTGRES_PASSWORD=${postgres_password}" > .env
echo "export POSTGRES_USER=${postgres_user}" >> .env
echo "export POSTGRES_DB=${postgres_db}" >> .env
echo "export POSTGRES_HOST=${postgres_host}" >> .env
echo "export COGNITO_CLIENT_ID=${cognito_client_id}" >> .env
echo "export COGNITO_USER_POOL_ID=${cognito_user_pool_id}" >> .env
echo "export AWS_ACCESS_KEY_ID=${aws_access_key}" >> .env
echo "export AWS_SECRET_ACCESS_KEY=${aws_secret_key}" >> .env
echo "export AWS_SESSION_TOKEN=${aws_session_token}" >> .env
echo "export BUCKET_NAME=${bucket_name}" >> .env
echo "export DYNAMODB_TABLE_NAME=${dynamodb_table_name}" >> .env
docker compose -f docker-compose.prod.yml up -d

