output "security_group_id" {
  value = aws_security_group.my-sg.id
}
output "subnet_id" {
  value = aws_subnet.my-subnet.id
}

