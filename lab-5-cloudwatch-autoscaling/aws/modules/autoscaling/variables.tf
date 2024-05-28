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
