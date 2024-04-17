variable "ssh_key" {
  description = "SSH key to use for EC2 instances"
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
variable "postgres_host" {
  description = "Postgres host"
  type        = string
}
variable "cname_prefix" {
  description = "CNAME prefix for the environment"
  type        = string
}

variable "PORT" {
  description = "Port to run the application on"
  type        = number
  default     = 8080
}
