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
# Create security groups to allow inbound traffic on port 22 and 80 and outbound traffic on all ports
resource "aws_security_group" "my-sg" {
  name        = "my-sg"
  description = "Allow inbound traffic on port 22 and 80"
  vpc_id      = aws_vpc.my-vpc.id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
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

# Create a EC2 instance
resource "aws_instance" "my-ec2" {
  ami                         = data.aws_ami.amazon-linux.id
  instance_type               = "t2.micro"
  key_name                    = aws_key_pair.adam-keys.key_name
  subnet_id                   = aws_subnet.my-subnet.id
  vpc_security_group_ids      = [aws_security_group.my-sg.id]
  associate_public_ip_address = true

  tags = {
    Name = "TicTacToeServerInstance"
  }
}

# Define the vpc and subnet
resource "aws_vpc" "my-vpc" {
  cidr_block       = var.subnet_cidr_block
  instance_tenancy = "default"

  tags = {
    Name = "my-vpc"
  }
}

# Define gatway to connect the VPC to the internet
resource "aws_internet_gateway" "my-igw" {
  vpc_id = aws_vpc.my-vpc.id

  tags = {
    Name = "my-igw"
  }
}

# Define routing table for the subnet
resource "aws_route_table" "my-rt" {
  vpc_id = aws_vpc.my-vpc.id


  route {
    cidr_block = "10.0.0.0/14"
    gateway_id = aws_internet_gateway.my-igw.id
  }
}

resource "aws_subnet" "my-subnet" {
  vpc_id            = aws_vpc.my-vpc.id
  cidr_block        = var.subnet_cidr_block
  availability_zone = "us-east-1a"

  tags = {
    Name = "my-subnet"
  }
}


# Associate the route table with the subnet
resource "aws_route_table_association" "my_rta" {
  subnet_id      = aws_subnet.my-subnet.id
  route_table_id = aws_route_table.my-rt.id
}



resource "aws_key_pair" "adam-keys" {
  key_name   = "adam-keys"
  public_key = var.ssh-key
}


# Define the subnet
variable "subnet_cidr_block" {
  default = "10.0.0.0/16"
  type    = string
}

variable "ssh-key" {
  type = string
}
