terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

resource "aws_s3_bucket" "user-images" {
  bucket        = var.bucket_name
  force_destroy = true
}


resource "aws_s3_bucket_ownership_controls" "user-images-ownership" {
  bucket = aws_s3_bucket.user-images.bucket
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "user-images-public-access" {
  bucket                  = aws_s3_bucket.user-images.bucket
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false

}

data "aws_iam_policy_document" "user-images-policy" {
  statement {
    actions   = ["s3:GetObject"]
    effect    = "Allow"
    resources = ["${aws_s3_bucket.user-images.arn}/*"]
    principals {
      type        = "AWS"
      identifiers = ["*"]
    }
    sid = "PublicReadGetObject"
  }
  depends_on = [aws_s3_bucket.user-images]
}

resource "aws_s3_bucket_policy" "user-images-policy" {
  bucket = aws_s3_bucket.user-images.bucket
  policy = data.aws_iam_policy_document.user-images-policy.json
}

resource "aws_s3_bucket_acl" "user-images-acl" {
  bucket = aws_s3_bucket.user-images.bucket
  acl    = "public-read"
  depends_on = [aws_s3_bucket_ownership_controls.user-images-ownership,
  aws_s3_bucket_public_access_block.user-images-public-access]
}
