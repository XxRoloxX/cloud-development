resource "aws_ecs_cluster" "ecs_cluster" {
  name = "ecs-cluster"
}


module "backend" {
  source            = "./modules/backend"
  cluster_name      = aws_ecs_cluster.ecs_cluster.name
  subnet_id         = var.subnet_id
  security_group_id = var.security_group_id
  postgres_user     = var.postgres_user
  postgres_password = var.postgres_password
  postgres_database = var.postgres_database

}

resource "null_resource" "build_frontend_script" {
  triggers = {
    always_run = timestamp()
  }

  provisioner "local-exec" {
    environment = {
      CLUSTER_NAME = aws_ecs_cluster.ecs_cluster.name
      TASK_ID      = module.backend.backend_task_id
    }
    command = "../fargate_build_image.sh"
  }

  depends_on = [module.backend]
}



module "frontend" {
  source            = "./modules/frontend"
  subnet_id         = var.subnet_id
  security_group_id = var.security_group_id
  cluster_name      = aws_ecs_cluster.ecs_cluster.name
  depends_on        = [null_resource.build_frontend_script]
}


