variable "bucket_name" {
  type        = string
  description = "The name of the bucket"
}
variable "table_name" {
  type        = string
  description = "The name of the table"
}

variable "ssh_key" {
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
