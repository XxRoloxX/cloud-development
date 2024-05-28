output "load_balancer_arn" {
  value = aws_elb.elb.arn
}

output "load_balancer_name" {
  value = aws_elb.elb.name
}

output "load_balancer_dns_name" {
  value = aws_elb.elb.dns_name
}
