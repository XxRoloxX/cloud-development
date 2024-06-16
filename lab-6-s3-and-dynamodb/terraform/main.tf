provider "aws" {
  region = "us-east-1"
}

resource "aws_cognito_user_pool" "user_pool" {
  name                     = "tic-tac-toe-tf-pool"
  username_attributes      = ["email"]
  auto_verified_attributes = ["email"]

  schema {
    name                = "email"
    attribute_data_type = "String"
    mutable             = true
    required            = true
  }
  schema {
    name                = "name"
    attribute_data_type = "String"
    mutable             = true
  }


  password_policy {
    minimum_length    = 8
    require_lowercase = true
    require_numbers   = true
    require_symbols   = true
    require_uppercase = true
  }


}
resource "aws_cognito_user_pool_client" "app_client" {
  name                = "tic-tac-toe-tf-client"
  user_pool_id        = aws_cognito_user_pool.user_pool.id
  generate_secret     = false
  explicit_auth_flows = ["ALLOW_USER_PASSWORD_AUTH", "ALLOW_REFRESH_TOKEN_AUTH"]
}
resource "aws_cognito_user_pool_domain" "domain" {
  domain       = "tic-tac-toe-tf-domain"
  user_pool_id = aws_cognito_user_pool.user_pool.id
}


module "s3" {
  source      = "./s3"
  bucket_name = var.bucket_name
}
module "dynamodb" {
  source     = "./dynamodb"
  table_name = var.table_name
}

module "aws_network" {
  source = "./aws_network"
}

module "aws_ec2" {
  source               = "./aws_ec2"
  cognito_client_id    = aws_cognito_user_pool_client.app_client.id
  subnet_id            = module.aws_network.subnet_id
  security_group_id    = module.aws_network.security_group_id
  ssh_key              = var.ssh_key
  postgres_password    = var.postgres_password
  postgres_user        = var.postgres_user
  postgres_db          = var.postgres_db
  postgres_host        = var.postgres_host
  aws_access_key       = var.aws_access_key
  aws_secret_key       = var.aws_secret_key
  aws_session_token    = var.aws_session_token
  table_name           = var.table_name
  bucket_name          = var.bucket_name
  cognito_user_pool_id = aws_cognito_user_pool.user_pool.id
}

resource "null_resource" "frontend_build" {
  triggers = {
    always_run = "${timestamp()}"
  }
  provisioner "local-exec" {
    command = "./build_frontend.sh ${module.aws_ec2.public_ip}"
  }
  depends_on = [module.aws_ec2]
}


