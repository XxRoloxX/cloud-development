terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "3.0.2"
    }
  }
}


resource "docker_image" "frontend" {
  name = format("%s/ttt-frontend", var.registry_address)
}

resource "docker_container" "frontend" {
  name  = "ttt-frontend"
  image = docker_image.frontend.name
  ports {
    internal = 80
    external = 80
  }
}
