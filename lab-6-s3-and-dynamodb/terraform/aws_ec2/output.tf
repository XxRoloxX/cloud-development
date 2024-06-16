output "public_ip" {
  value      = ["${aws_instance.my_ec2.*.public_ip}"][0][0]
  depends_on = [aws_instance.my_ec2]
}
output "instance_id" {
  value      = aws_instance.my_ec2.id
  depends_on = [aws_instance.my_ec2]
}
