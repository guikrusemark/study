# AWS Configuration
variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-west-2"
}

variable "project_name" {
  description = "Name of the project"
  type        = string
  default     = "terraform-ansible-stack"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "dev"
}

# EC2 Configuration
variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.medium"
}

variable "key_pair_name" {
  description = "Name of the AWS key pair"
  type        = string
}

# S3 Configuration
variable "s3_bucket_name" {
  description = "Name of the S3 bucket"
  type        = string
}

# Neon PostgreSQL Configuration
variable "neon_api_key" {
  description = "Neon API key"
  type        = string
  sensitive   = true
}

variable "neon_project_name" {
  description = "Neon project name"
  type        = string
  default     = "terraform-postgres"
}

# Upstash Redis Configuration
variable "upstash_email" {
  description = "Upstash account email"
  type        = string
}

variable "upstash_api_key" {
  description = "Upstash API key"
  type        = string
  sensitive   = true
}

# MongoDB Atlas Configuration
variable "mongodbatlas_public_key" {
  description = "MongoDB Atlas public key"
  type        = string
}

variable "mongodbatlas_private_key" {
  description = "MongoDB Atlas private key"
  type        = string
  sensitive   = true
}

variable "mongodbatlas_org_id" {
  description = "MongoDB Atlas organization ID"
  type        = string
}

variable "mongodb_cluster_name" {
  description = "MongoDB cluster name"
  type        = string
  default     = "terraform-cluster"
}

variable "mongodb_username" {
  description = "MongoDB database username"
  type        = string
  default     = "admin"
}

variable "mongodb_password" {
  description = "MongoDB database password"
  type        = string
  sensitive   = true
}
