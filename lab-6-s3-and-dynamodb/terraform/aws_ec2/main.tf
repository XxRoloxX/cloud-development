terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}



# Create a EC2 instance
resource "aws_instance" "my_ec2" {
  ami                         = data.aws_ami.amazon-linux.id
  instance_type               = "t2.micro"
  key_name                    = aws_key_pair.ssh-key.key_name
  vpc_security_group_ids      = [var.security_group_id]
  associate_public_ip_address = true
  subnet_id                   = var.subnet_id

  user_data = base64encode(
    templatefile("${path.module}/launch_script.sh",
      {
        postgres_password    = var.postgres_password
        postgres_user        = var.postgres_user
        postgres_db          = var.postgres_db
        postgres_host        = var.postgres_host
        cognito_client_id    = var.cognito_client_id
        aws_access_key       = var.aws_access_key
        aws_secret_key       = var.aws_secret_key
        aws_session_token    = var.aws_session_token
        dynamodb_table_name  = var.table_name
        bucket_name          = var.bucket_name
        cognito_user_pool_id = var.cognito_user_pool_id
  }))

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
