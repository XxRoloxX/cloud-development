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
