terraform {
  required_version = ">= 1.6.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.0"
    }
  }
}

provider "aws" {
  region = var.region
}

variable "region" {
  type    = string
  default = "us-east-1"
}

# Skeleton resources
resource "aws_s3_bucket" "documents" {
  bucket = "careops-docs-${var.region}"
  force_destroy = true
  acl    = "private"
}

resource "aws_secretsmanager_secret" "app" {
  name = "careops/app"
}

output "s3_bucket" {
  value = aws_s3_bucket.documents.bucket
}
