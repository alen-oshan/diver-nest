# 🚀 DIVER NEST - Deployment Guide

> Comprehensive deployment instructions for production environments

## 📋 Table of Contents

- [🏗️ Infrastructure Requirements](#️-infrastructure-requirements)
- [🐳 Docker Deployment](#-docker-deployment)
- [☁️ Cloud Platform Deployment](#️-cloud-platform-deployment)
- [🗄️ Database Setup](#️-database-setup)
- [🔐 Security Configuration](#-security-configuration)
- [📊 Monitoring & Logging](#-monitoring--logging)
- [🔄 CI/CD Pipeline](#-cicd-pipeline)
- [🛡️ Backup Strategy](#️-backup-strategy)
- [🔧 Maintenance](#-maintenance)

---

## 🏗️ Infrastructure Requirements

### Minimum System Requirements

#### Production Server
- **CPU**: 4 cores (2.4 GHz+)
- **RAM**: 8 GB minimum, 16 GB recommended
- **Storage**: 100 GB SSD (with auto-scaling)
- **Network**: 1 Gbps connection
- **OS**: Ubuntu 20.04 LTS or CentOS 8+

#### Database Server
- **CPU**: 2 cores (2.4 GHz+)
- **RAM**: 4 GB minimum, 8 GB recommended
- **Storage**: 50 GB SSD with IOPS optimization
- **Backup Storage**: 3x database size

### Technology Stack
- **Frontend**: React.js 18+ / Vue.js 3+
- **Backend**: Node.js 18+ with Express.js
- **Database**: MongoDB 6.0+
- **Cache**: Redis 7.0+
- **Web Server**: Nginx 1.20+
- **Process Manager**: PM2
- **Container**: Docker & Docker Compose

---

## 🐳 Docker Deployment

### Docker Compose Setup

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  # Frontend Service
  frontend:
    build:
      context: ./src/frontend
      dockerfile: Dockerfile
    ports:
      - \"3000:3000\"
    environment:
      - REACT_APP_API_URL=http://backend:5000
      - NODE_ENV=production
    depends_on:
      - backend
    restart: unless-stopped
    volumes:
      - ./uploads:/app/uploads

  # Backend Service
  backend:
    build:
      context: ./src/backend
      dockerfile: Dockerfile
    ports:
      - \"5000:5000\"
    environment:
      - NODE_ENV=production
      - MONGO_URI=mongodb://database:27017/divernest
      - REDIS_URL=redis://cache:6379
      - JWT_SECRET=${JWT_SECRET}
      - STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
      - PAYPAL_CLIENT_SECRET=${PAYPAL_CLIENT_SECRET}
    depends_on:
      - database
      - cache
    restart: unless-stopped
    volumes:
      - ./uploads:/app/uploads
      - ./logs:/app/logs

  # Database Service
  database:
    image: mongo:6.0
    ports:
      - \"27017:27017\"
    environment:
      - MONGO_INITDB_ROOT_USERNAME=${DB_USERNAME}
      - MONGO_INITDB_ROOT_PASSWORD=${DB_PASSWORD}
      - MONGO_INITDB_DATABASE=divernest
    volumes:
      - mongo_data:/data/db
      - ./scripts/mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro
    restart: unless-stopped

  # Cache Service
  cache:
    image: redis:7.0-alpine
    ports:
      - \"6379:6379\"
    command: redis-server --appendonly yes --requirepass ${REDIS_PASSWORD}
    volumes:
      - redis_data:/data
    restart: unless-stopped

  # Nginx Reverse Proxy
  nginx:
    image: nginx:1.20-alpine
    ports:
      - \"80:80\"
      - \"443:443\"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./nginx/ssl:/etc/nginx/ssl
      - ./uploads:/var/www/uploads
    depends_on:
      - frontend
      - backend
    restart: unless-stopped

volumes:
  mongo_data:
  redis_data:
```

### Environment Configuration

Create `.env.production`:

```bash
# Application
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://divernest.com
BACKEND_URL=https://api.divernest.com

# Database
DB_USERNAME=divernest_user
DB_PASSWORD=secure_db_password_here
MONGO_URI=mongodb://divernest_user:secure_db_password_here@database:27017/divernest?authSource=admin

# Cache
REDIS_PASSWORD=secure_redis_password_here
REDIS_URL=redis://:secure_redis_password_here@cache:6379

# Authentication
JWT_SECRET=your_very_secure_jwt_secret_here
JWT_EXPIRE=7d
BCRYPT_ROUNDS=12

# Payment Gateways
STRIPE_PUBLIC_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
PAYPAL_CLIENT_ID=your_paypal_live_client_id
PAYPAL_CLIENT_SECRET=your_paypal_live_secret

# Email Service
EMAIL_SERVICE=sendgrid
EMAIL_API_KEY=your_sendgrid_api_key
EMAIL_FROM=noreply@divernest.com
EMAIL_REPLY_TO=support@divernest.com

# File Storage
UPLOAD_PATH=/app/uploads
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=jpg,jpeg,png,pdf

# Security
CORS_ORIGIN=https://divernest.com,https://www.divernest.com
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX=100

# Monitoring
LOG_LEVEL=info
SENTRY_DSN=your_sentry_dsn_here
```

### Dockerfile Examples

**Frontend Dockerfile** (`src/frontend/Dockerfile`):
```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD [\"nginx\", \"-g\", \"daemon off;\"]
```

**Backend Dockerfile** (`src/backend/Dockerfile`):
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S divernest -u 1001
USER divernest

EXPOSE 5000
CMD [\"npm\", \"start\"]
```

### Deployment Commands

```bash
# Clone repository
git clone https://github.com/alen-oshan/diver-nest.git
cd diver-nest

# Set up environment
cp .env.example .env.production
# Edit .env.production with your values

# Build and start services
docker-compose -f docker-compose.yml --env-file .env.production up -d

# View logs
docker-compose logs -f

# Scale services if needed
docker-compose up -d --scale backend=3
```

---

## ☁️ Cloud Platform Deployment

### AWS Deployment (Recommended)

#### EC2 Setup
```bash
# Launch EC2 instance (t3.large or larger)
# Security Groups: Allow ports 22, 80, 443

# Connect and install Docker
sudo apt update
sudo apt install -y docker.io docker-compose
sudo usermod -aG docker $USER

# Install AWS CLI
sudo apt install -y awscli
aws configure
```

#### RDS MongoDB Atlas
```bash
# Create MongoDB Atlas cluster
# Connection string: mongodb+srv://user:pass@cluster.mongodb.net/divernest

# Update environment variables
MONGO_URI=mongodb+srv://divernest_user:password@cluster.mongodb.net/divernest?retryWrites=true&w=majority
```

#### S3 File Storage
```bash
# Create S3 bucket for file uploads
aws s3 mb s3://divernest-uploads

# Update environment for S3
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
S3_BUCKET=divernest-uploads
```

#### CloudFront CDN
```bash
# Create CloudFront distribution
# Origin: S3 bucket
# Update image URLs to use CloudFront domain
```

### Digital Ocean Deployment

```bash
# Create Droplet (4GB+ RAM recommended)
# Install Docker and Docker Compose

# Create managed database
# Update MONGO_URI with managed database connection string

# Set up load balancer for high availability
# Configure SSL certificate
```

### Heroku Deployment

Create `Procfile`:
```
web: npm start
worker: npm run worker
```

Create `heroku.yml`:
```yaml
build:
  docker:
    web: src/backend/Dockerfile
    worker: src/backend/Dockerfile
run:
  web: npm start
  worker: npm run worker
```

Deploy commands:
```bash
# Install Heroku CLI
heroku login
heroku create divernest-api

# Add MongoDB addon
heroku addons:create mongolab:sandbox

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_jwt_secret

# Deploy
git push heroku main
```

---

## 🗄️ Database Setup

### MongoDB Configuration

#### Production MongoDB Setup
```bash
# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
sudo apt-get update
sudo apt-get install -y mongodb-org

# Configure MongoDB
sudo nano /etc/mongod.conf
```

**MongoDB Configuration** (`/etc/mongod.conf`):
```yaml
storage:
  dbPath: /var/lib/mongodb
  journal:
    enabled: true

systemLog:
  destination: file
  logAppend: true
  path: /var/log/mongodb/mongod.log

net:
  port: 27017
  bindIp: 127.0.0.1,10.0.0.0/8

security:
  authorization: enabled

replication:
  replSetName: \"divernest-rs\"
```

#### Database Initialization Script

Create `scripts/mongo-init.js`:
```javascript
// Create database
use divernest;

// Create admin user
db.createUser({
  user: \"admin\",
  pwd: \"secure_password_here\",
  roles: [
    { role: \"readWrite\", db: \"divernest\" },
    { role: \"dbAdmin\", db: \"divernest\" }
  ]
});

// Create indexes
db.users.createIndex({ \"email\": 1 }, { \"unique\": true });
db.activities.createIndex({ \"date\": 1, \"status\": 1 });
db.activitybookings.createIndex({ \"user_id\": 1, \"booking_status\": 1 });
db.payments.createIndex({ \"user_id\": 1, \"status\": 1, \"created_at\": -1 });

// Create collections
db.createCollection(\"users\");
db.createCollection(\"activities\");
db.createCollection(\"vehicles\");
db.createCollection(\"resorts\");
db.createCollection(\"courses\");
db.createCollection(\"activitybookings\");
db.createCollection(\"vehiclebookings\");
db.createCollection(\"resortbookings\");
db.createCollection(\"coursebookings\");
db.createCollection(\"payments\");
db.createCollection(\"invoices\");
db.createCollection(\"refunds\");
db.createCollection(\"contacts\");
```

#### Database Seeding

Create `scripts/seed-production.js`:
```javascript
const mongoose = require('mongoose');
require('dotenv').config();

// Sample admin user
const adminUser = {
  name: \"System Administrator\",
  email: \"admin@divernest.com\",
  role: \"admin\",
  passwordHash: \"$2b$12$hashed_password_here\"
};

// Sample activities
const sampleActivities = [
  {
    name: \"Beginner Scuba Diving\",
    description: \"Perfect for first-time divers\",
    date: new Date('2026-02-01'),
    price: 75.00,
    totalSeats: 12,
    status: \"available\",
    location: \"Coral Bay\",
    duration: 180,
    difficulty: \"beginner\"
  }
  // Add more sample data...
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Insert admin user
    await mongoose.connection.db.collection('users').insertOne(adminUser);
    
    // Insert sample activities
    await mongoose.connection.db.collection('activities').insertMany(sampleActivities);
    
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
```

---

## 🔐 Security Configuration

### SSL/TLS Setup

#### Let's Encrypt with Certbot
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Generate SSL certificate
sudo certbot --nginx -d divernest.com -d www.divernest.com -d api.divernest.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

#### Nginx SSL Configuration
```nginx
server {
    listen 443 ssl http2;
    server_name divernest.com www.divernest.com;
    
    ssl_certificate /etc/letsencrypt/live/divernest.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/divernest.com/privkey.pem;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;
    ssl_dhparam /etc/nginx/dhparam.pem;
    
    location / {
        proxy_pass http://frontend:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    location /api {
        proxy_pass http://backend:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Firewall Configuration
```bash
# UFW Firewall setup
sudo ufw enable
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw deny 3000
sudo ufw deny 5000
sudo ufw deny 27017
sudo ufw deny 6379
```

### Security Headers
```nginx
# Add to Nginx configuration
add_header X-Frame-Options \"SAMEORIGIN\" always;
add_header X-XSS-Protection \"1; mode=block\" always;
add_header X-Content-Type-Options \"nosniff\" always;
add_header Referrer-Policy \"no-referrer-when-downgrade\" always;
add_header Content-Security-Policy \"default-src 'self' http: https: data: blob: 'unsafe-inline'\" always;
add_header Strict-Transport-Security \"max-age=31536000; includeSubDomains\" always;
```

---

## 📊 Monitoring & Logging

### Application Monitoring

#### PM2 Setup
```bash
# Install PM2 globally
npm install -g pm2

# Create ecosystem file
```

Create `ecosystem.config.js`:
```javascript
module.exports = {
  apps: [{
    name: 'divernest-api',
    script: 'src/backend/server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    max_memory_restart: '1G',
    node_args: '--max_old_space_size=1024'
  }]
};
```

#### Log Management
```bash
# Set up log rotation
sudo nano /etc/logrotate.d/divernest

# Log rotation configuration
/var/log/divernest/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 divernest divernest
    postrotate
        pm2 reloadLogs
    endscript
}
```

#### Health Checks
Create `scripts/health-check.sh`:
```bash
#!/bin/bash

# Check application health
HEALTH_URL=\"http://localhost:5000/health\"
HTTP_STATUS=$(curl -o /dev/null -s -w \"%{http_code}\" $HEALTH_URL)

if [ $HTTP_STATUS -eq 200 ]; then
    echo \"Application is healthy\"
    exit 0
else
    echo \"Application is unhealthy (HTTP $HTTP_STATUS)\"
    # Restart application
    pm2 restart divernest-api
    exit 1
fi
```

### External Monitoring

#### Prometheus & Grafana Setup
```yaml
# docker-compose.monitoring.yml
version: '3.8'

services:
  prometheus:
    image: prom/prometheus
    ports:
      - \"9090:9090\"
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus

  grafana:
    image: grafana/grafana
    ports:
      - \"3001:3000\"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin123
    volumes:
      - grafana_data:/var/lib/grafana
      - ./monitoring/grafana/dashboards:/etc/grafana/provisioning/dashboards

volumes:
  prometheus_data:
  grafana_data:
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: |
        cd src/backend
        npm ci
        
    - name: Run tests
      run: |
        cd src/backend
        npm test
        
    - name: Run security audit
      run: |
        cd src/backend
        npm audit --audit-level=high

  deploy:
    needs: test
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy to server
      uses: appleboy/ssh-action@v0.1.5
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.SSH_PRIVATE_KEY }}
        script: |
          cd /var/www/diver-nest
          git pull origin main
          docker-compose down
          docker-compose up -d --build
          docker system prune -f
```

### Deployment Scripts

Create `scripts/deploy.sh`:
```bash
#!/bin/bash

set -e

echo \"Starting deployment...\"

# Pull latest code
git pull origin main

# Build new images
docker-compose build

# Stop current services
docker-compose down

# Start new services
docker-compose up -d

# Clean up old images
docker system prune -f

# Run health check
sleep 30
./scripts/health-check.sh

echo \"Deployment completed successfully!\"
```

---

## 🛡️ Backup Strategy

### Database Backup

Create `scripts/backup-db.sh`:
```bash
#!/bin/bash

BACKUP_DIR=\"/var/backups/divernest\"
DATE=$(date +%Y%m%d_%H%M%S)
DB_NAME=\"divernest\"

# Create backup directory
mkdir -p $BACKUP_DIR

# MongoDB backup
mongodump --host localhost --port 27017 --db $DB_NAME --out $BACKUP_DIR/mongodb_$DATE

# Compress backup
tar -czf $BACKUP_DIR/mongodb_backup_$DATE.tar.gz -C $BACKUP_DIR mongodb_$DATE

# Remove uncompressed backup
rm -rf $BACKUP_DIR/mongodb_$DATE

# Upload to S3 (if configured)
if [ ! -z \"$AWS_S3_BUCKET\" ]; then
    aws s3 cp $BACKUP_DIR/mongodb_backup_$DATE.tar.gz s3://$AWS_S3_BUCKET/backups/
fi

# Keep only last 7 days of backups
find $BACKUP_DIR -name \"mongodb_backup_*.tar.gz\" -mtime +7 -delete

echo \"Backup completed: mongodb_backup_$DATE.tar.gz\"
```

### File Backup
```bash
# Backup uploaded files
rsync -av --delete /var/www/diver-nest/uploads/ /var/backups/divernest/uploads/

# Sync to remote backup server
rsync -av --delete /var/backups/divernest/ backup-server:/backups/divernest/
```

### Automated Backup Cron
```bash
# Add to crontab
sudo crontab -e

# Daily database backup at 2 AM
0 2 * * * /var/www/diver-nest/scripts/backup-db.sh >> /var/log/backup.log 2>&1

# Weekly full backup at 3 AM on Sundays
0 3 * * 0 /var/www/diver-nest/scripts/full-backup.sh >> /var/log/backup.log 2>&1
```

---

## 🔧 Maintenance

### Regular Maintenance Tasks

#### System Updates
```bash
# Create update script
#!/bin/bash

# Update system packages
sudo apt update && sudo apt upgrade -y

# Update Node.js dependencies
cd /var/www/diver-nest/src/backend
npm audit fix

# Restart services
sudo systemctl restart mongod
docker-compose restart

# Clean up Docker
docker system prune -f

echo \"System maintenance completed\"
```

#### Database Maintenance
```bash
# MongoDB maintenance
mongo --eval \"db.runCommand({reIndex: 'users'})\"
mongo --eval \"db.runCommand({compact: 'activities'})\"

# Check database size
mongo --eval \"db.stats()\"
```

#### Log Cleanup
```bash
# Clean old logs
find /var/log/divernest -name \"*.log\" -mtime +30 -delete

# Clean PM2 logs
pm2 flush
```

### Performance Optimization

#### Database Indexing
```javascript
// Create optimal indexes
db.activities.createIndex({ \"date\": 1, \"status\": 1, \"location\": 1 });
db.bookings.createIndex({ \"user_id\": 1, \"booking_date\": -1 });
db.payments.createIndex({ \"status\": 1, \"created_at\": -1 });
```

#### Nginx Optimization
```nginx
# Add to nginx.conf
gzip on;
gzip_comp_level 6;
gzip_types text/plain text/css application/json application/javascript;

# Enable caching
location ~* \\.(jpg|jpeg|png|gif|ico|css|js)$ {
    expires 1y;
    add_header Cache-Control \"public, immutable\";
}
```

### Monitoring Commands

```bash
# Check service status
systemctl status mongod
docker-compose ps
pm2 status

# Monitor resources
htop
iotop
df -h

# Check logs
tail -f /var/log/divernest/app.log
docker-compose logs -f backend
```

---

## 📞 Support and Troubleshooting

### Common Issues

#### High Memory Usage
```bash
# Check memory usage
free -h
ps aux --sort=-%mem | head

# Restart services if needed
pm2 restart all
docker-compose restart
```

#### Database Connection Issues
```bash
# Check MongoDB status
sudo systemctl status mongod

# Test connection
mongo --eval \"db.runCommand({ ping: 1 })\"

# Restart MongoDB
sudo systemctl restart mongod
```

#### SSL Certificate Issues
```bash
# Check certificate expiry
sudo certbot certificates

# Renew certificates
sudo certbot renew --dry-run
sudo certbot renew
```

### Emergency Contacts
- **System Administrator**: admin@divernest.com
- **Database Administrator**: dba@divernest.com
- **DevOps Engineer**: devops@divernest.com

### Rollback Procedure
```bash
# Quick rollback to previous version
git log --oneline -5
git checkout <previous-commit>
docker-compose down
docker-compose up -d --build
```

---

**Deployment Version:** 2.0  
**Last Updated:** January 5, 2026  
**Maintained By:** DIVER NEST DevOps Team

For deployment support, contact: devops@divernest.com