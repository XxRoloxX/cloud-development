//Output aws security groups id 
output "security_group" {
  value = aws_security_group.my-sg.id
}
output "subnet" {
  value = aws_subnet.my-subnet.id
}
