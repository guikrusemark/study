# Note: Upstash doesn't have an official Terraform provider
# This file contains configuration for managing Upstash Redis via HTTP API

# Null resource to create Upstash Redis database via API
resource "null_resource" "upstash_redis" {
  provisioner "local-exec" {
    command = <<-EOT
      # Create Upstash Redis database using API
      curl -X POST \
        "https://api.upstash.com/v2/redis/database" \
        -H "Authorization: Bearer ${var.upstash_api_key}" \
        -H "Content-Type: application/json" \
        -d '{
          "name": "${var.project_name}-redis",
          "region": "us-west-1",
          "tls": true
        }' > upstash_redis.json
      
      # Extract database details
      DB_ID=$(cat upstash_redis.json | python3 -c "import sys, json; print(json.load(sys.stdin)['database_id'])" 2>/dev/null || echo "")
      
      if [ ! -z "$DB_ID" ]; then
        echo "Upstash Redis database created successfully"
        echo "Database ID: $DB_ID"
        echo $DB_ID > upstash_redis_id.txt
        
        # Get connection details
        curl -X GET \
          "https://api.upstash.com/v2/redis/database/$DB_ID" \
          -H "Authorization: Bearer ${var.upstash_api_key}" > upstash_redis_details.json
      else
        echo "Failed to create Upstash Redis database or database already exists"
      fi
    EOT
  }

  triggers = {
    upstash_api_key = var.upstash_api_key
    project_name    = var.project_name
  }
}

# Store Upstash Redis connection details in AWS Systems Manager Parameter Store
resource "aws_ssm_parameter" "upstash_redis_url" {
  name  = "/${var.project_name}/upstash/redis_url"
  type  = "SecureString"
  value = "redis://default:password@example.upstash.io:6380"

  description = "Upstash Redis URL - Update manually after creating Upstash database"

  tags = {
    Name        = "${var.project_name}-upstash-redis-url"
    Environment = var.environment
  }

  lifecycle {
    ignore_changes = [value]
  }
}

resource "aws_ssm_parameter" "upstash_redis_token" {
  name  = "/${var.project_name}/upstash/redis_token"
  type  = "SecureString"
  value = "example-token"

  description = "Upstash Redis token - Update manually after creating Upstash database"

  tags = {
    Name        = "${var.project_name}-upstash-redis-token"
    Environment = var.environment
  }

  lifecycle {
    ignore_changes = [value]
  }
}
