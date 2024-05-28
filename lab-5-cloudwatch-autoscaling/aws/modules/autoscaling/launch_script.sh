#!/bin/bash
# sudo yum install -y httpd 
# echo "<html><h1>Hello World</h1></html>" > /var/www/html/index.html
# sudo systemctl start httpd
# sudo systemctl enable httpd
# usermod -a -G apache ec2-user
# chown -R ec2-user:apache /var/www
sudo yum update -y
sudo amazon-linux-extras install docker git -y
sudo service docker start
sudo usermod -a -G docker ec2-user
git clone https://github.com/XxRoloxX/cloud-development.git
cd cloud-development/lab-5-cloudwatch-autoscaling
echo "export POSTGRES_PASSWORD=${postgres_password}" > .env
echo "export POSTGRES_USER=${postgres_user}" >> .env
echo "export POSTGRES_DB=${postgres_db}" >> .env
echo "export POSTGRES_HOST=${postgres_host}" >> .env
echo "export COGNITO_CLIENT_ID=${cognito_client_id}" >> .env
sudo docker-compose -f docker-compose.prod.yml up -d

