
resource "aws_ecs_service" "tic-tac-toe-backend" {
  name                    = "tic-tac-toe-backend"
  cluster                 = var.cluster_name
  task_definition         = aws_ecs_task_definition.tic-tac-toe-backend.arn
  desired_count           = 1
  launch_type             = "FARGATE"
  enable_ecs_managed_tags = true
  wait_for_steady_state   = true

  network_configuration {
    subnets          = [var.subnet_id]
    security_groups  = [var.security_group_id]
    assign_public_ip = true
  }
}



resource "aws_ecs_task_definition" "tic-tac-toe-backend" {
  family                   = "tic-tac-toe-backend"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]

  container_definitions = jsonencode([
    {
      name   = "backend"
      image  = "xxroloxx/ttt-backend:latest"
      cpu    = 128
      memory = 512
      portMappings = [
        {
          containerPort = 8080
          hostPort      = 8080
          protocol      = "tcp"
        }
      ],
      environment = [
        {
          name  = "POSTGRES_USER"
          value = var.postgres_user
        },
        {
          name  = "POSTGRES_PASSWORD"
          value = var.postgres_password
        },
        {
          name  = "POSTGRES_DB"
          value = var.postgres_database
        },
        {
          name  = "POSTGRES_HOST"
          value = "localhost"
        }
      ]

    },
    {
      name   = "database"
      image  = "postgres:latest"
      cpu    = 128
      memory = 256
      environment = [
        {
          name  = "POSTGRES_USER"
          value = var.postgres_user
        },
        {
          name  = "POSTGRES_PASSWORD"
          value = var.postgres_password
        },
        {
          name  = "POSTGRES_DB"
          value = var.postgres_database
        }
      ],
      mountPoints = [
        {
          sourceVolume  = "postgres"
          containerPath = "/var/lib/postgresql/data"
        }
      ]
    },

  ])


  volume {
    name = "postgres"
  }

  cpu    = 256
  memory = 1024
}

