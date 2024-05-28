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

provider "aws" {
  region = "us-east-1"
}

module "network" {
  source = "./modules/aws_network/"
}

module "codepipeline" {
  source = "./modules/cognito/"
}

module "load_balancer" {
  source            = "./modules/load_balancer/"
  subnet_id         = module.network.subnet_id
  security_group_id = module.network.security_group_id
  vpc_id            = module.network.vpc_id
}

resource "null_resource" "frontend_build" {
  triggers = {
    always_run = "${timestamp()}"
  }
  provisioner "local-exec" {
    command = "./build_frontend.sh ${module.load_balancer.load_balancer_name}"
  }
  depends_on = [module.load_balancer]
}

module "cloudwatch" {
  source                 = "./modules/cloudwatch/"
  autoscaling_policy     = module.autoscaling.autoscaling_policy_arn
  autoscaling_group_name = module.autoscaling.autoscaling_group_name
  loadbalancer_name      = module.load_balancer.load_balancer_name
}

module "autoscaling" {
  source              = "./modules/autoscaling/"
  subnet_id           = module.network.subnet_id
  security_group_name = module.network.security_group_name
  security_group_id   = module.network.security_group_id
  vpc_id              = module.network.vpc_id
  ssh_key             = var.ssh_key
  load_balancer_name  = module.load_balancer.load_balancer_name
  postgres_db         = var.postgres_db
  postgres_user       = var.postgres_user
  postgres_password   = var.postgres_password
  postgres_host       = var.postgres_host
  cognito_client_id   = module.codepipeline.cognito_client_id
  depends_on          = [module.load_balancer, module.codepipeline, null_resource.frontend_build]
}
