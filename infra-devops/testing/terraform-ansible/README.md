# Full-Stack Application with Infrastructure as Code

This project combines a **Next.js application** with **Terraform infrastructure** for a complete development and deployment solution.

## Project Structure

```
├── src/                         # Next.js application source code
│   ├── app/                     # App router pages
│   └── components/              # React components
├── terraform/                   # Infrastructure as Code
│   ├── main.tf                  # Terraform main configuration
│   ├── variables.tf             # Variable definitions
│   ├── *.tf                     # Other Terraform files
│   └── README.md                # Infrastructure documentation
├── public/                      # Static assets
├── package.json                 # Node.js dependencies
└── README.md                    # This file
```

## Quick Start

### 1. Application Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 2. Infrastructure Deployment
```bash
# Navigate to infrastructure directory
cd terraform

# Configure your variables
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your API keys and settings

# Deploy infrastructure
terraform init
terraform plan
terraform apply
```

## Infrastructure Components

The Terraform configuration creates:

### AWS Resources
- **VPC** with public subnet and Internet Gateway
- **EC2 instance** (Ubuntu 22.04) with Nginx pre-configured
- **S3 bucket** for file storage
- **Security Groups** for web traffic
- **IAM roles** for service integration

### External Services
- **MongoDB Atlas** cluster for document storage
- **Neon PostgreSQL** for relational data
- **Upstash Redis** for caching and sessions

## Development Workflow

### Local Development
1. **Run the Next.js app locally** for rapid development
2. **Use local databases** or connect to deployed services
3. **Test features** before deploying

### Infrastructure Management
1. **Plan changes**: `terraform plan`
2. **Apply updates**: `terraform apply`
3. **Monitor resources** via AWS Console and service dashboards

### Deployment
1. **Build the application**: `npm run build`
2. **Deploy to EC2** via SSH or CI/CD pipeline
3. **Configure Nginx** to serve the application

## Environment Configuration

### Application (.env.local)
```env
# Database connections (from Terraform outputs)
MONGODB_URI=mongodb+srv://...
POSTGRES_URL=postgresql://...
REDIS_URL=redis://...

# AWS S3
AWS_S3_BUCKET=your-bucket-name
AWS_REGION=us-west-2
```

### Infrastructure (terraform/terraform.tfvars)
```hcl
aws_region = "us-west-2"
key_pair_name = "your-key-pair"
s3_bucket_name = "your-unique-bucket-name"
# ... other configuration
```

## Key Features

### Application Stack
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Modern React patterns** and hooks

### Infrastructure Stack
- **AWS** for compute and storage
- **Multi-database architecture** (MongoDB, PostgreSQL, Redis)
- **Security best practices** with proper IAM roles
- **Scalable networking** with VPC and subnets

## Documentation

- **Application**: See package.json scripts and src/ directory
- **Infrastructure**: See [terraform/README.md](terraform/README.md) for detailed infrastructure documentation
- **API Keys**: Required for MongoDB Atlas, Neon, and Upstash

## Production Deployment

### Security Checklist
- [ ] Restrict database access from 0.0.0.0/0
- [ ] Use environment-specific API keys
- [ ] Enable AWS CloudTrail logging
- [ ] Configure backup strategies
- [ ] Set up monitoring and alerts

### Performance Optimization
- [ ] Configure CDN for static assets
- [ ] Implement database connection pooling
- [ ] Set up Redis caching strategies
- [ ] Optimize Nginx configuration

## Troubleshooting

### Common Issues
1. **Port conflicts**: Ensure port 3000 is available for Next.js
2. **API key errors**: Verify all service credentials
3. **Terraform state**: Keep terraform.tfstate secure and backed up
4. **Network connectivity**: Check security group rules

### Useful Commands
```bash
# Application
npm run build          # Build for production
npm run lint          # Check code quality

# Infrastructure  
terraform validate    # Check syntax
terraform refresh     # Update state
terraform destroy     # Clean up resources
```

## Contributing

1. **Application changes**: Test locally with `npm run dev`
2. **Infrastructure changes**: Use `terraform plan` before applying
3. **Database migrations**: Plan schema changes carefully
4. **Security updates**: Keep dependencies and infrastructure updated

## Support

- **Next.js**: [Next.js Documentation](https://nextjs.org/docs)
- **Terraform**: [Terraform Documentation](https://terraform.io/docs)
- **AWS**: [AWS Documentation](https://docs.aws.amazon.com)
- **Infrastructure Details**: See [terraform/README.md](terraform/README.md)
