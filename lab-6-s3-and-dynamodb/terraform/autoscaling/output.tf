output "autoscaling_group_name" {
  value = aws_autoscaling_group.autoscaling_group.name
}

output "autoscaling_policy_arn" {
  value = aws_autoscaling_policy.cpu-policy.arn
}
