terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }
  required_version = ">= 1.2.0"
}

resource "aws_sns_topic" "alarm-topic" {
  name = "my-sns-topic"
}

resource "aws_sns_topic_subscription" "email-subscription" {
  topic_arn = aws_sns_topic.alarm-topic.arn
  protocol  = "email"
  endpoint  = "al.lo3opole@gmail.com"
}

resource "aws_cloudwatch_metric_alarm" "cpu-alarm" {
  alarm_name          = "cpu-alarm"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = "1"
  metric_name         = "CPUUtilization"
  namespace           = "AWS/EC2"
  period              = "60"
  statistic           = "Average"
  threshold           = "20"
  alarm_description   = "This metric monitors ec2 cpu utilization"
  alarm_actions       = [aws_sns_topic.alarm-topic.arn, var.autoscaling_policy]
  dimensions = {
    AutoScalingGroupName = var.autoscaling_group_name
  }
}
resource "aws_cloudwatch_metric_alarm" "healthy_hosts" {
  alarm_name          = "healthy-hosts"
  comparison_operator = "LessThanThreshold"
  evaluation_periods  = "1"
  metric_name         = "HealthyHostCount"
  namespace           = "AWS/ELB"
  period              = "60"
  statistic           = "Average"
  threshold           = "2"
  alarm_description   = "This metric monitors the number of healthy hosts"
  alarm_actions       = [aws_sns_topic.alarm-topic.arn, var.autoscaling_policy]
  dimensions = {
    LoadBalancerName = var.loadbalancer_name
  }
}
