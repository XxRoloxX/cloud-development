terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "3.0.2"
    }
  }
}


resource "docker_container" "watchtower" {
  name    = "watchtower"
  image   = "containrrr/watchtower"
  command = ["--interval", "30"]
  env = [
    format("REPO_USER=%s", var.registry_username),
    format("REPO_PASS=%s", var.registry_password),
  ]

  volumes {
    container_path = "/var/run/docker.sock"
    host_path      = "/var/run/docker.sock"
  }
}
