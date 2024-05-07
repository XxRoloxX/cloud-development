terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }

    docker = {
      source  = "kreuzwerker/docker"
      version = "3.0.2"
    }
  }

  required_version = ">= 1.2.0"
}



# module "docker" {
#   source     = "./modules/docker/"
#   depends_on = [module.ec2]
# }



provider "docker" {
  host     = format("ssh://%s@%s", var.ssh_user, file("text.txt"))
  ssh_opts = ["-o", "StrictHostKeyChecking=no", "-o", "UserKnownHostsFile=/dev/null"]
  registry_auth {
    address  = var.registry_address
    username = var.registry_username
    password = var.registry_password
  }
}


provider "aws" {
  region = "us-east-1"
}

module "network" {
  source = "./modules/aws_network/"
}


module "ec2" {
  source            = "./modules/aws_ec2/"
  ssh_key           = var.ssh_key
  subnet_id         = module.network.subnet_id
  security_group_id = module.network.security_group_id
}
