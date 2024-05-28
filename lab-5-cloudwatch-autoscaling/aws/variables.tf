variable "ssh_key" {
  description = "SSH key to use for EC2 instances"
  type        = string
}

variable "postgres_password" {
  description = "Password for the PostgreSQL database"
  type        = string
}

variable "postgres_user" {
  description = "Username for the PostgreSQL database"
  type        = string
}
variable "postgres_db" {
  description = "Name of the PostgreSQL database"
  type        = string
}
variable "postgres_host" {
  description = "Host for the PostgreSQL database"
  type        = string
}
