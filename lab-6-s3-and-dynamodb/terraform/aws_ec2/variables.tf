
variable "ssh_key" {
  type = string
}
variable "security_group_id" {
  type = string
}
variable "subnet_id" {
  type = string
}

variable "postgres_password" {
  description = "The password for the PostgreSQL database"
  type        = string
}

variable "postgres_user" {
  description = "The username for the PostgreSQL database"
  type        = string
}

variable "postgres_db" {
  description = "The name of the PostgreSQL database"
  type        = string
}

variable "postgres_host" {
  description = "The hostname for the PostgreSQL database"
  type        = string
}

variable "cognito_client_id" {
  description = "The client ID for the Cognito user pool"
  type        = string
}

variable "cognito_user_pool_id" {
  description = "The ID of the Cognito user pool"
  type        = string
}

variable "aws_access_key" {
  description = "The access key for the AWS account"
  type        = string
}

variable "aws_secret_key" {
  description = "The secret key for the AWS account"
  type        = string
}

variable "aws_session_token" {
  description = "The session token for the AWS account"
  type        = string
}

variable "table_name" {
  description = "The name of the DynamoDB table"
  type        = string
}
variable "bucket_name" {
  description = "The name of the S3 bucket"
  type        = string
}
