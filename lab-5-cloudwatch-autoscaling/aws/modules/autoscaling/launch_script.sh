#!/bin/bash
sudo yum install -y httpd
echo "<html><h1>Hello World</h1></html>" > /var/www/html/index.html
sudo systemctl start httpd
sudo systemctl enable httpd
usermod -a -G apache ec2-user
chown -R ec2-user:apache /var/www
sudo yum update -y
sudo amazon-linux-extras install docker
sudo service docker start

