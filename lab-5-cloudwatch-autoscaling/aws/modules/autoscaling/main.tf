terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

resource "aws_placement_group" "placement_group" {
  name     = "example"
  strategy = "spread"
}

resource "aws_autoscaling_policy" "cpu-policy" {
  name                   = "cpu-policy"
  scaling_adjustment     = 1
  adjustment_type        = "ChangeInCapacity"
  cooldown               = 300
  autoscaling_group_name = aws_autoscaling_group.autoscaling_group.name
}

# resource "aws_lb_target_group" "target_group_frontend" {
#   name     = "ttt-target-group-frontend"
#   port     = 80
#   protocol = "HTTP"
#   vpc_id   = var.vpc_id
# }
#
# resource "aws_lb_target_group" "target_group_backend" {
#   name     = "ttt-target-group-backend"
#   port     = 8080
#   protocol = "HTTP"
#   vpc_id   = var.vpc_id
# }

resource "aws_autoscaling_group" "autoscaling_group" {
  max_size            = 3
  min_size            = 1
  desired_capacity    = 2
  placement_group     = aws_placement_group.placement_group.name
  vpc_zone_identifier = [var.subnet_id]
  # target_group_arns   = [aws_lb_target_group.target_group_frontend.arn, aws_lb_target_group.target_group_backend.arn]
  launch_template {
    id      = aws_launch_template.ttt-launch_template.id
    version = "$Latest"
  }
}

data "aws_ami" "amazon-linux" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

}

resource "aws_autoscaling_attachment" "autoscaling_attachment" {
  autoscaling_group_name = aws_autoscaling_group.autoscaling_group.name
  elb                    = var.load_balancer_name
}

resource "aws_key_pair" "ssh-key" {
  key_name   = "ssh-key"
  public_key = var.ssh_key
}

resource "aws_launch_template" "ttt-launch_template" {
  name_prefix            = "ttt-launch-template"
  image_id               = data.aws_ami.amazon-linux.id
  instance_type          = "t2.micro"
  vpc_security_group_ids = [var.security_group_id]
  key_name               = aws_key_pair.ssh-key.key_name
  # security_group_names   = [var.security_group_name]
  lifecycle {
    create_before_destroy = true
  }

  //Install and start apache 
  user_data = base64encode(
    templatefile("${path.module}/launch_script.sh",
      {
        postgres_password = var.postgres_password
        postgres_user     = var.postgres_user
        postgres_db       = var.postgres_db
        postgres_host     = var.postgres_host
        cognito_client_id = var.cognito_client_id
  }))
}
