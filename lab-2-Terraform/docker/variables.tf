# variable "ssh_host" {
#   description = "SSH host with docker daemon running"
#   type        = string
# }
variable "ssh_user" {
  description = "SSH user to use on remote host"
  type        = string
}

variable "registry_address" {
  description = "Docker registry address"
  type        = string
}
variable "registry_password" {
  description = "Docker registry password"
  type        = string
}
variable "registry_username" {
  description = "Docker registry username"
  type        = string
}

variable "postgres_password" {
  description = "Postgres password"
  type        = string
}
variable "postgres_user" {
  description = "Postgres user"
  type        = string
}
variable "postgres_db" {
  description = "Postgres database"
  type        = string
}

