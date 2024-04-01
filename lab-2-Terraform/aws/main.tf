module "network" {
  source = "./modules/aws_network/"
}

module "ec2" {
  source            = "./modules/aws_ec2/"
  ssh_key           = var.ssh_key
  subnet_id         = module.network.subnet_id
  security_group_id = module.network.security_group_id
}
