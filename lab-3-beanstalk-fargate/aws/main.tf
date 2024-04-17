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

module "network" {
  source = "./modules/network/"
}


module "beanstalk" {
  source            = "./modules/beanstalk/"
  postgres_user     = var.postgres_user
  postgres_password = var.postgres_password
  postgres_db       = var.postgres_db
  cname_prefix      = var.cname_prefix
  ssh_key           = var.ssh_key
  vpc_id            = module.network.vpc_id
  subnet_id         = module.network.subnet_id
}

# module "fargate" {
#   source            = "./modules/fargate/"
#   security_group_id = module.network.security_group_id
#   subnet_id         = module.network.subnet_id
# }
