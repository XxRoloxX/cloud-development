variable "subnet_id" {
  description = "The ID of the subnet to create the load balancer in"
}
variable "security_group_id" {
  description = "The ID of the security group to add the load balancer to"
  type        = string
}
variable "vpc_id" {
  description = "The ID of the VPC to create the load balancer in"
  type        = string
}
