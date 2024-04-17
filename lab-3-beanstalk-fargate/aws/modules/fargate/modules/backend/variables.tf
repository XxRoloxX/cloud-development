variable "security_group_id" {
  description = "The ID of the security group to apply to the instance"
}
variable "subnet_id" {
  description = "The ID of the subnet to launch the instance into"
}

variable "cluster_name" {
  description = "The name of the ECS cluster"
}

variable "postgres_user" {
  description = "The username for the Postgres database"
}
variable "postgres_password" {
  description = "The password for the Postgres database"
}
variable "postgres_database" {
  description = "The username for the Postgres database"
}
