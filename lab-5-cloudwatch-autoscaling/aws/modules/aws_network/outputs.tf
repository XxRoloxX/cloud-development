output "security_group_id" {
  value = aws_security_group.my-sg.id
}
output "subnet_id" {
  value = aws_subnet.my-subnet.id
}
output "security_group_name" {
  value = aws_security_group.my-sg.name
}
output "vpc_id" {
  value = aws_vpc.my-vpc.id
}

