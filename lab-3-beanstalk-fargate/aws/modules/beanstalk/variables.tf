variable "postgres_host" {
  type    = string
  default = "database"
}

variable "postgres_user" {
  type = string
}

variable "postgres_password" {
  type = string
}
variable "postgres_db" {
  type = string
}
variable "ssh_key" {
  type = string
}

variable "cname_prefix" {
  type = string
}
variable "PORT" {
  type    = number
  default = 8080
}

variable "vpc_id" {
  type = string
}

variable "subnet_id" {
  type = string
}

locals {
  app_env = {
    POSTGRES_HOST     = var.postgres_host
    POSTGRES_USER     = var.postgres_user
    POSTGRES_PASSWORD = var.postgres_password
    POSTGRES_DB       = var.postgres_db
    PORT              = var.PORT
  }
}
