terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "3.0.2"
    }
  }
}



# module "remote_docker" {
#   source            = "./modules/remote_docker/"
#   ssh_host          = element(module.ec2.public_ip, 0)
#   ssh_user          = "ec2-user"
#   registry_password = var.registry_password
#   registry_username = var.registry_username
# }

data "terraform_remote_state" "host" {
  backend = "local"
  config = {
    path = "../aws/terraform.tfstate"
  }
}


provider "docker" {
  host     = format("ssh://%s@%s", var.ssh_user, data.terraform_remote_state.host.outputs.public_ip)
  ssh_opts = ["-o", "StrictHostKeyChecking=no", "-o", "UserKnownHostsFile=/dev/null"]
  registry_auth {
    address  = var.registry_address
    username = var.registry_username
    password = var.registry_password
  }
}

module "network" {
  source = "./modules/network/"
}

module "frontend" {
  source           = "./modules/frontend/"
  registry_address = var.registry_address
}

module "database" {
  source            = "./modules/database/"
  registry_address  = var.registry_address
  postgres_password = var.postgres_password
  postgres_user     = var.postgres_user
  postgres_db       = var.postgres_db
  network_name      = module.network.network_name
  depends_on        = [module.network]
}

module "backend" {
  source            = "./modules/backend/"
  registry_address  = var.registry_address
  network_name      = module.network.network_name
  postgres_password = var.postgres_password
  postgres_user     = var.postgres_user
  postgres_db       = var.postgres_db
  depends_on        = [module.network, module.database]
}





