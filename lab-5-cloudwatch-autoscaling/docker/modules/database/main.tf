terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "3.0.2"
    }
  }
}

resource "docker_image" "database" {
  name = "postgres:latest"
}

resource "docker_container" "database" {
  name  = "ttt-database"
  image = docker_image.database.name
  networks_advanced {
    name    = var.network_name
    aliases = ["database"]
  }
  env = [
    format("POSTGRES_USER=%s", var.postgres_user),
    format("POSTGRES_PASSWORD=%s", var.postgres_password),
    format("POSTGRES_DB=%s", var.postgres_db)
  ]
  volumes {
    container_path = "/var/lib/postgresql/data"
    host_path      = "/home/ec2-user/postgres-data"
    read_only      = false
  }
  depends_on = [docker_image.database]
}
