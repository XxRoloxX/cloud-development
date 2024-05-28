variable "subnet_id" {
  description = "The ID of the subnet to create the scaling group in"
  type        = string
}
variable "security_group_name" {
  description = "The name of the security group to attach to the EC2 instance"
  type        = string
}
variable "security_group_id" {
  description = "The ID of the security group to attach to the ELB"
  type        = string
}

variable "vpc_id" {
  description = "The ID of the VPC to create the LB in"
  type        = string
}

variable "ssh_key" {
  type = string
}

variable "load_balancer_name" {
  description = "The name of the load balancer"
  type        = string
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
