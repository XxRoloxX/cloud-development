# Tworzenie wiaderka S3 w tf

Tworzymy buckety generalnego przeznaczenia (General Purpose). Możliwe
jest również utworzenie bucketów S3 Express Directory, który pozwala na
szybkie przesyłanie plików do S3.

Tutaj jest tworzona instance S3 z publicznie dostępnym odczytem plików.

```hcl

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
```

## Definiowanie tabeli DynamoDB

```hcl

DynamoDB is a key-value NO-SQL database. It is a fully managed database provided by AWS. It is a serverless database, which means that you don't have to manage the infrastructure.
You just have to create a table and start using it. No schema is required, and you can store any type of data in it.
To be able to index by non-primary keys, you can create local secondary indexes.

resource "aws_dynamodb_table" "matches" {
  name         = var.table_name
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "GameId"
  range_key    = "Player1Id"

  attribute {
    name = "Player1Id"
    type = "S"
  }

  attribute {
    name = "Player2Id"
    type = "S"
  }

  attribute {
    name = "GameId"
    type = "S"
  }


  local_secondary_index {
    name            = "Player1IdIndex"
    range_key       = "Player1Id"
    projection_type = "ALL"
  }

  local_secondary_index {
    name            = "Player2IdIndex"
    range_key       = "Player2Id"
    projection_type = "ALL"
  }
}

```

## Decyzja o wyborze bazy danych

Baza NO-SQL jest zwykle wybierania kiedy nie mamy określonego schematu,
oraz dane nie muszą utrzymywać spójności w każdym momencie.

W tym przypadku dane są związane z wynikami gier, które nie muszą być
spójne w każdym momencie.
