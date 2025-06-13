# Note: Neon PostgreSQL doesn't have an official Terraform provider
# This file contains configuration for managing Neon via HTTP API
# You'll need to create the database manually or use their API

# Null resource to create Neon PostgreSQL database via API
resource "null_resource" "neon_postgres" {
  provisioner "local-exec" {
    command = <<-EOT
      # Create Neon project using API
      curl -X POST \
        "https://console.neon.tech/api/v2/projects" \
        -H "Authorization: Bearer ${var.neon_api_key}" \
        -H "Content-Type: application/json" \
        -d '{
          "project": {
            "name": "${var.neon_project_name}",
            "region_id": "aws-us-west-2"
          }
        }' > neon_project.json
      
      # Extract project details
      PROJECT_ID=$(cat neon_project.json | python3 -c "import sys, json; print(json.load(sys.stdin)['project']['id'])" 2>/dev/null || echo "")
      
      if [ ! -z "$PROJECT_ID" ]; then
        echo "Neon PostgreSQL project created successfully"
        echo "Project ID: $PROJECT_ID"
        echo $PROJECT_ID > neon_project_id.txt
      else
        echo "Failed to create Neon project or project already exists"
      fi
    EOT
  }

  triggers = {
    neon_api_key = var.neon_api_key
    project_name = var.neon_project_name
  }
}

# Store Neon connection details in AWS Systems Manager Parameter Store
resource "aws_ssm_parameter" "neon_connection_string" {
  name  = "/${var.project_name}/neon/connection_string"
  type  = "SecureString"
  value = "postgresql://username:password@ep-example.us-west-2.aws.neon.tech/neondb"

  description = "Neon PostgreSQL connection string - Update manually after creating Neon database"

  tags = {
    Name        = "${var.project_name}-neon-connection"
    Environment = var.environment
  }

  lifecycle {
    ignore_changes = [value]
  }
}
