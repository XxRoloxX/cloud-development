variable "autoscaling_group_name" {
  description = "The name of the autoscaling group"
  type        = string
}

variable "autoscaling_policy" {
  description = "The arn of the autoscaling policy"
  type        = string
}

variable "loadbalancer_name" {
  description = "The name of the load balancer"
  type        = string
}
# variable "target_group_arn" {
#   description = "The arn of the target group"
#   type        = string
# }
