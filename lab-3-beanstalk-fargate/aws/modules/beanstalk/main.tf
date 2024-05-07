resource "aws_s3_bucket" "tic-tac-toe" {
  bucket = "tic-tac-toe-terraform"
  acl    = "private"
  tags = {
    Name = "tic-tac-toe s3"
  }
}

resource "aws_s3_bucket_object" "tic-tac-toe-deploymeny" {
  bucket = aws_s3_bucket.tic-tac-toe.bucket
  source = "${path.module}/docker-compose.yml"
  key    = "docker-compose.yml"
}

resource "aws_elastic_beanstalk_application" "tic-tac-toe" {
  name        = "tic-tac-toe"
  description = "A simple tic-tac-toe game"

}

resource "aws_elastic_beanstalk_application_version" "tic-tac-toe" {
  name        = "tic-tac-toe"
  application = aws_elastic_beanstalk_application.tic-tac-toe.name
  description = "A simple tic-tac-toe game"
  key         = "docker-compose.yml"
  bucket      = aws_s3_bucket.tic-tac-toe.bucket
  depends_on  = [aws_s3_bucket_object.tic-tac-toe-deploymeny]

}

#Create key pair for the environment
resource "aws_key_pair" "LabKeyPair" {
  key_name   = "LabKeyPair"
  public_key = var.ssh_key
}

resource "aws_elastic_beanstalk_environment" "tic-tac-toe-env" {
  name                = "tic-tac-toe-env"
  application         = aws_elastic_beanstalk_application.tic-tac-toe.id
  solution_stack_name = "64bit Amazon Linux 2023 v4.3.0 running Docker"
  tier                = "WebServer"
  version_label       = aws_elastic_beanstalk_application_version.tic-tac-toe.name
  cname_prefix        = var.cname_prefix

  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "IamInstanceProfile"
    # value     = aws_iam_instance_profile.tf-ellb.name
    value = "LabInstanceProfile"
  }

  # Add vpc and subnet
  setting {
    namespace = "aws:ec2:vpc"
    name      = "VPCId"
    value     = var.vpc_id
  }

  setting {
    namespace = "aws:ec2:vpc"
    name      = "Subnets"
    value     = var.subnet_id
  }

  # Define instanceType
  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "InstanceType"
    value     = "t2.micro"
  }

  ## Service role
  setting {
    namespace = "aws:elasticbeanstalk:environment"
    name      = "ServiceRole"
    value     = "LabRole"
  }


  ## Key pair
  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "EC2KeyName"
    value     = aws_key_pair.LabKeyPair.key_name
  }

  # Add listener port for backend 
  setting {
    namespace = "aws:elb:listener:8080"
    name      = "ListenerProtocol"
    value     = "HTTP"
  }

  # Define public IP
  setting {
    namespace = "aws:ec2:vpc"
    name      = "AssociatePublicIpAddress"
    value     = "true"
  }

  dynamic "setting" {
    for_each = local.app_env
    content {
      namespace = "aws:elasticbeanstalk:application:environment"
      name      = setting.key
      value     = setting.value
    }
  }
}







