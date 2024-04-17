#output "fargate_backend_public_ip" {
#  value = data.aws_network_interface.interface_tags.association[0].public_ip
#}
output "backend_task_id" {
  value = aws_ecs_task_definition.tic-tac-toe-backend.arn
  # value = "task"
}
