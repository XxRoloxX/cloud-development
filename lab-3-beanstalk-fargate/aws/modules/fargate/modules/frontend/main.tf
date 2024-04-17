resource "aws_ecs_service" "tic-tac-toe-frontend" {
  name            = "tic-tac-toe-frontend"
  cluster         = var.cluster_name
  task_definition = aws_ecs_task_definition.tic-tac-toe-frontend.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = [var.subnet_id]
    security_groups  = [var.security_group_id]
    assign_public_ip = true


  }
}

resource "aws_ecs_task_definition" "tic-tac-toe-frontend" {
  family                   = "tic-tac-toe-frontend"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  container_definitions = jsonencode([
    {
      name   = "frontend"
      image  = "xxroloxx/ttt-frontend:latest"
      cpu    = 10
      memory = 256
      portMappings = [
        {
          containerPort = 80
          hostPort      = 80
          protocol      = "tcp"
        }
      ]
    }
  ])


  cpu    = 256
  memory = 512
}
