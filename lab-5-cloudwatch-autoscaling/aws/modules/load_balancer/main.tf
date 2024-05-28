terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }
  required_version = ">= 1.2.0"
}

resource "aws_elb" "elb" {
  subnets         = [var.subnet_id]
  security_groups = [var.security_group_id]
  name_prefix     = "ttt"

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
