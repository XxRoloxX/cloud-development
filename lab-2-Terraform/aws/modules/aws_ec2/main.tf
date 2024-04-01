terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}


provider "aws" {
  region = "us-east-1"
}


# Create a EC2 instance
resource "aws_instance" "my_ec2" {
  ami                         = data.aws_ami.amazon-linux.id
  instance_type               = "t2.micro"
  key_name                    = aws_key_pair.ssh-key.key_name
  vpc_security_group_ids      = [var.security_group_id]
  associate_public_ip_address = true
  subnet_id                   = var.subnet_id
  user_data                   = <<-EOF
                                #!/bin/bash
                                sudo yum install -y docker
                                sudo service docker start
                                sudo usermod -a -G docker ec2-user
                                EOF

  tags = {
    Name = "TicTacToeServerInstance"
  }
}


resource "aws_key_pair" "ssh-key" {
  key_name   = "ssh-key"
  public_key = var.ssh_key
}


data "aws_ami" "amazon-linux" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

}
