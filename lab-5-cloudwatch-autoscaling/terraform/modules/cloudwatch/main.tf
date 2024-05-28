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
  threshold           = "90"
  alarm_description   = "This metric monitors ec2 cpu utilization"
  alarm_actions       = [aws_sns_topic.alarm-topic.arn]
  dimensions = {
    InstanceId = "i-0c1f7b7b7b7b7b7b7"
  }
}
