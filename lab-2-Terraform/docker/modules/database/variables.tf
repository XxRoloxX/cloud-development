variable "postgres_password" {
  description = "The password for the PostgreSQL database"
  type        = string
}
variable "postgres_user" {
  description = "The user for the PostgreSQL database"
  type        = string
}
variable "postgres_db" {
  description = "The name of the PostgreSQL database"
  type        = string
}

variable "network_name" {
  description = "The network to deploy the PostgreSQL instance to"
  type        = string
}

variable "registry_address" {
  description = "The address of the Docker registry"
  type        = string
}
