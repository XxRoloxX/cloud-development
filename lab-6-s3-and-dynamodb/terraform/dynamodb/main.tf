terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

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
