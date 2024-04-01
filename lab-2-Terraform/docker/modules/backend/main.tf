terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "3.0.2"
    }
  }
}

resource "docker_image" "backend" {
  # name = "registry.rolo-labs.xyz/ttt-backend"
  name = format("%s/ttt-backend", var.registry_address)
}

resource "docker_container" "backend" {
  name  = "ttt-backend"
  image = docker_image.backend.name
  ports {
    internal = 8080
    external = 8080
  }
  networks_advanced {
    name    = var.network_name
    aliases = ["backend"]
  }

  env = [
    format("POSTGRES_HOST=%s", var.postgres_host),
    format("POSTGRES_USER=%s", var.postgres_user),
    format("POSTGRES_PASSWORD=%s", var.postgres_password),
    format("POSTGRES_DB=%s", var.postgres_db)
  ]

  depends_on = [docker_image.backend]
}

