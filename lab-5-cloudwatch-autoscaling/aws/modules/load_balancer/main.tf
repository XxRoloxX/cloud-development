terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }
  required_version = ">= 1.2.0"
}
#
#
# resource "aws_lb_target_group" "frontend" {
#   name     = "ttt-frontend-target-group"
#   port     = 80
#   protocol = "HTTP"
#   vpc_id   = var.vpc_id
#
#   health_check {
#     path                = "/"
#     protocol            = "HTTP"
#     port                = "traffic-port"
#     interval            = 30
#     timeout             = 5
#     healthy_threshold   = 2
#     unhealthy_threshold = 2
#
#   }
# }
#
# resource "aws_lb_target_group" "backend" {
#   name     = "ttt-backend-target-group"
#   port     = 8080
#   protocol = "HTTP"
#   vpc_id   = var.vpc_id
# }
#
# resource "aws_lb_target_group_attachment" "frontend" {
#   target_group_arn = aws_lb_target_group.frontend.arn
#   target_id        = aws_lb.lb.arn
#   port             = 80
# }
#
# resource "aws_lb_target_group_attachment" "backend" {
#   target_group_arn = aws_lb_target_group.backend.arn
#   target_id        = aws_lb.lb.arn
#   port             = 8080
# }
#

resource "aws_elb" "elb" {
  name            = "ttt-elb"
  subnets         = [var.subnet_id]
  security_groups = [var.security_group_id]
  # load_balancer_type = "application"


  health_check {
    target              = "HTTP:80/"
    interval            = 30
    timeout             = 3
    healthy_threshold   = 2
    unhealthy_threshold = 2
  }

  listener {
    instance_port     = 80
    instance_protocol = "HTTP"
    lb_port           = 80
    lb_protocol       = "HTTP"
  }
  listener {
    instance_port     = 443
    instance_protocol = "HTTP"
    lb_port           = 443
    lb_protocol       = "HTTP"
  }

  listener {
    instance_port     = 8080
    instance_protocol = "HTTP"
    lb_port           = 8080
    lb_protocol       = "HTTP"
  }
}
