# MongoDB Atlas Project
resource "mongodbatlas_project" "main" {
  name   = "${var.project_name}-mongodb"
  org_id = var.mongodbatlas_org_id

  is_collect_database_specifics_statistics_enabled = true
  is_data_explorer_enabled                         = true
  is_performance_advisor_enabled                   = true
  is_realtime_performance_panel_enabled            = true
  is_schema_advisor_enabled                        = true
}

# MongoDB Atlas Cluster
resource "mongodbatlas_cluster" "main" {
  project_id   = mongodbatlas_project.main.id
  name         = var.mongodb_cluster_name
  cluster_type = "REPLICASET"

  # Provider Settings
  provider_name               = "AWS"
  backing_provider_name       = "AWS"
  provider_region_name        = "US_WEST_2"
  provider_instance_size_name = "M10"

  # Storage
  mongo_db_major_version = "7.0"
  auto_scaling_disk_gb_enabled = true

  # Backup
  backup_enabled                 = true
  pit_enabled                   = true
  cloud_backup                  = true
  auto_scaling_compute_enabled  = false
  auto_scaling_compute_scale_down_enabled = false
}

# Database User
resource "mongodbatlas_database_user" "main" {
  username           = var.mongodb_username
  password           = var.mongodb_password
  project_id         = mongodbatlas_project.main.id
  auth_database_name = "admin"

  roles {
    role_name     = "readWriteAnyDatabase"
    database_name = "admin"
  }

  roles {
    role_name     = "dbAdminAnyDatabase"
    database_name = "admin"
  }
}

# IP Access List (Allow access from anywhere - restrict this in production)
resource "mongodbatlas_project_ip_access_list" "main" {
  project_id = mongodbatlas_project.main.id
  cidr_block = "0.0.0.0/0"
  comment    = "Allow access from anywhere - RESTRICT IN PRODUCTION"
}

# Store MongoDB connection string in AWS Systems Manager Parameter Store
resource "aws_ssm_parameter" "mongodb_connection_string" {
  name  = "/${var.project_name}/mongodb/connection_string"
  type  = "SecureString"
  value = replace(
    mongodbatlas_cluster.main.connection_strings[0].standard_srv,
    "<password>",
    var.mongodb_password
  )

  description = "MongoDB Atlas connection string"

  tags = {
    Name        = "${var.project_name}-mongodb-connection"
    Environment = var.environment
  }

  depends_on = [
    mongodbatlas_cluster.main,
    mongodbatlas_database_user.main
  ]
}
