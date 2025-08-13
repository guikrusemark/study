# User data script for EC2 instance
locals {
  user_data = <<-EOF
    #!/bin/bash
    set -e
    
    # Update system
    apt-get update
    apt-get upgrade -y
    
    # Install required packages
    apt-get install -y nginx awscli curl wget git python3 python3-pip
    
    # Install Docker
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    usermod -aG docker ubuntu
    
    # Install Docker Compose
    curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
    
    # Configure Nginx
    systemctl start nginx
    systemctl enable nginx
    
    # Create a simple index page
    cat > /var/www/html/index.html << 'HTML'
    <!DOCTYPE html>
    <html>
    <head>
        <title>Welcome to ${var.project_name}</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            .container { max-width: 800px; margin: 0 auto; }
            .header { background: #f4f4f4; padding: 20px; border-radius: 5px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Welcome to ${var.project_name}</h1>
                <p>Your infrastructure is ready!</p>
                <p>Server: $(hostname)</p>
                <p>Region: ${var.aws_region}</p>
            </div>
        </div>
    </body>
    </html>
    HTML
    
    # Restart nginx to apply changes
    systemctl restart nginx
    
    # Create log file for debugging
    echo "$(date): User data script completed successfully" >> /var/log/user-data.log
  EOF
}

# EC2 Instance
resource "aws_instance" "web" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = var.instance_type
  key_name               = var.key_pair_name
  vpc_security_group_ids = [aws_security_group.web.id]
  subnet_id              = aws_subnet.public.id
  iam_instance_profile   = aws_iam_instance_profile.ec2_profile.name
  user_data              = base64encode(local.user_data)

  root_block_device {
    volume_type = "gp3"
    volume_size = 20
    encrypted   = true
  }

  tags = {
    Name        = "${var.project_name}-web-server"
    Environment = var.environment
  }
}
