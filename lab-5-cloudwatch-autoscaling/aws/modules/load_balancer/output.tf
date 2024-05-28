output "load_balancer_arn" {
  value = aws_elb.elb.arn
}

output "load_balancer_name" {
  value = aws_elb.elb.name
}
# output "target_group_arn" {
#   value = aws_elb_target_group.frontend.arn
# }
