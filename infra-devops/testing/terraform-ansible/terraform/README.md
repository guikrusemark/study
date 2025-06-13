# Terraform Infrastructure

This directory contains Terraform configuration files for provisioning the complete infrastructure stack.

## Infrastructure Components

- **AWS EC2** instance with Nginx web server
- **AWS S3** bucket for storage
- **Neon PostgreSQL** database
- **Upstash Redis** cache
- **MongoDB Atlas** database
- **VPC** with proper networking setup
- **Security Groups** with appropriate rules

## Quick Start

### 1. Configure Variables
```bash
cd terraform
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your actual values
```

### 2. Deploy Infrastructure
```bash
terraform init
terraform plan
terraform apply
```

## File Structure

```
terraform/
├── main.tf                      # Main configuration and providers
├── variables.tf                 # Variable definitions
├── network.tf                   # VPC, subnets, security groups
├── ec2.tf                       # EC2 instance configuration
├── s3.tf                        # S3 bucket and IAM roles
├── mongodb.tf                   # MongoDB Atlas resources
├── neon.tf                      # Neon PostgreSQL configuration
├── upstash.tf                   # Upstash Redis configuration
├── outputs.tf                   # Output values
└── terraform.tfvars.example     # Example variables file
```

## Prerequisites

### Required API Keys and Accounts
- **AWS**: CLI configured with appropriate credentials
- **MongoDB Atlas**: Account with organization ID and API keys
- **Neon**: Account with API key
- **Upstash**: Account with API key

### AWS Resources Required
- Key pair for EC2 access
- Appropriate IAM permissions for creating resources

## Configuration

### Required Variables in terraform.tfvars

```hcl
# AWS Configuration
aws_region    = "us-west-2"
key_pair_name = "your-key-pair-name"
s3_bucket_name = "your-unique-bucket-name-12345"

# MongoDB Atlas
mongodbatlas_public_key  = "your-public-key"
mongodbatlas_private_key = "your-private-key"
mongodbatlas_org_id      = "your-org-id"
mongodb_password         = "secure-password"

# Neon PostgreSQL
neon_api_key = "your-neon-api-key"

# Upstash Redis
upstash_email   = "your-email@example.com"
upstash_api_key = "your-upstash-api-key"
```

## What Gets Created

### AWS Infrastructure
- **VPC** (10.0.0.0/16) with Internet Gateway
- **Public Subnet** (10.0.1.0/24) 
- **Security Group** (HTTP/HTTPS/SSH access)
- **EC2 Instance** (t3.medium, Ubuntu 22.04)
- **S3 Bucket** (encrypted, versioned)
- **IAM Roles** (EC2 → S3 access)

### Database Services
- **MongoDB Atlas** M10 cluster
- **Neon PostgreSQL** database
- **Upstash Redis** cache

### Software Installed on EC2
- Nginx web server
- Docker & Docker Compose
- AWS CLI
- Python 3

## Outputs

After successful deployment:
- EC2 public IP and DNS
- SSH connection command
- S3 bucket information
- Database connection strings (stored in AWS Systems Manager)

## Security Notes

⚠️ **Production Considerations**:
- MongoDB Atlas allows all IPs (0.0.0.0/0) - restrict in production
- Consider VPC peering for database connections
- Rotate API keys regularly
- Use least-privilege IAM policies

## Cleanup

To destroy all resources:
```bash
terraform destroy
```

**Warning**: This permanently deletes all infrastructure. Backup important data first.

## Troubleshooting

### Common Issues
1. **S3 bucket name must be globally unique**
2. **Ensure AWS key pair exists in the target region**
3. **Verify all API keys have appropriate permissions**
4. **Check AWS CLI configuration**: `aws sts get-caller-identity`

### Logs
- EC2 user data: `/var/log/user-data.log`
- Nginx: `/var/log/nginx/`
- Cloud-init: `/var/log/cloud-init-output.log`

## Integration with Application

The infrastructure is designed to support the Next.js application in the parent directory. After deployment:

1. **Deploy application to EC2**:
   ```bash
   # SSH to EC2 instance
   ssh -i ~/.ssh/your-key.pem ubuntu@<EC2_IP>
   
   # Clone your application
   git clone <your-repo>
   cd <your-app>
   
   # Build and run
   npm install
   npm run build
   npm start
   ```

2. **Configure reverse proxy** in Nginx to serve your app
3. **Use environment variables** from Systems Manager for database connections
