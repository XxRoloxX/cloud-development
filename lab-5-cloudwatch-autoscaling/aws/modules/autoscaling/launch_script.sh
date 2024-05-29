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
cd cloud-development/lab-5-cloudwatch-autoscaling
echo "export POSTGRES_PASSWORD=${postgres_password}" > .env
echo "export POSTGRES_USER=${postgres_user}" >> .env
echo "export POSTGRES_DB=${postgres_db}" >> .env
echo "export POSTGRES_HOST=${postgres_host}" >> .env
echo "export COGNITO_CLIENT_ID=${cognito_client_id}" >> .env
docker compose -f docker-compose.prod.yml up -d

