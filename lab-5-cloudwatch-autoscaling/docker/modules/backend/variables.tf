variable "network_name" {
  type    = string
  default = "default"
}

variable "registry_address" {
  type = string
}

variable "postgres_user" {
  type    = string
  default = "postgres"
}
variable "postgres_password" {
  type    = string
  default = "password"
}
variable "postgres_db" {
  type    = string
  default = "ttt"
}
variable "postgres_host" {
  type    = string
  default = "database"
}
