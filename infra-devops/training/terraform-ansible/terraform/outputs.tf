# EC2 Instance outputs
output "ec2_public_ip" {
  description = "Public IP address of the EC2 instance"
  value       = aws_instance.web.public_ip
}

output "ec2_public_dns" {
  description = "Public DNS name of the EC2 instance"
  value       = aws_instance.web.public_dns
}

output "ec2_instance_id" {
  description = "ID of the EC2 instance"
  value       = aws_instance.web.id
}

# S3 Bucket outputs
output "s3_bucket_name" {
  description = "Name of the S3 bucket"
  value       = aws_s3_bucket.main.bucket
}

output "s3_bucket_arn" {
  description = "ARN of the S3 bucket"
  value       = aws_s3_bucket.main.arn
}

# VPC outputs
output "vpc_id" {
  description = "ID of the VPC"
  value       = aws_vpc.main.id
}

output "subnet_id" {
  description = "ID of the public subnet"
  value       = aws_subnet.public.id
}

# MongoDB Atlas outputs
output "mongodb_connection_string" {
  description = "MongoDB Atlas connection string"
  value       = mongodbatlas_cluster.main.connection_strings[0].standard_srv
  sensitive   = true
}

output "mongodb_cluster_id" {
  description = "MongoDB Atlas cluster ID"
  value       = mongodbatlas_cluster.main.cluster_id
}

output "mongodb_project_id" {
  description = "MongoDB Atlas project ID"
  value       = mongodbatlas_project.main.id
}

# Application URLs
output "application_url" {
  description = "URL to access the application"
  value       = "http://${aws_instance.web.public_dns}"
}

output "ssh_command" {
  description = "SSH command to connect to the instance"
  value       = "ssh -i ~/.ssh/${var.key_pair_name}.pem ubuntu@${aws_instance.web.public_ip}"
}

# Connection information
output "connection_info" {
  description = "Connection information for all services"
  value = {
    ec2_ssh     = "ssh -i ~/.ssh/${var.key_pair_name}.pem ubuntu@${aws_instance.web.public_ip}"
    web_url     = "http://${aws_instance.web.public_dns}"
    s3_bucket   = aws_s3_bucket.main.bucket
    mongodb_uri = mongodbatlas_cluster.main.connection_strings[0].standard_srv
  }
  sensitive = true
}
