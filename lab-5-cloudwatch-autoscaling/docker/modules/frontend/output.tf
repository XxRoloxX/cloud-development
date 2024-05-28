output "container_name" {
  description = "The name of the container"
  value = docker_container.frontend.name
}
