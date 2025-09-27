# Docker Setup Guide

This guide will help you run the E-commerce project using Docker.

## Prerequisites

- Docker Desktop installed
- Docker Compose installed (usually comes with Docker Desktop)

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd your-project-name
   ```

2. **Create environment file**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file with your actual values:
   ```env
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

3. **Start all services**
   ```bash
   docker-compose up -d
   ```

4. **Access the applications**
   - **Customer Frontend**: http://localhost:3000
   - **Admin Panel**: http://localhost:3001
   - **Backend API**: http://localhost:4000
   - **MongoDB**: localhost:27017

## Services Overview

| Service | Port | Description |
|---------|------|-------------|
| Frontend | 3000 | Customer-facing React app |
| Admin | 3001 | Admin panel React app |
| Backend | 4000 | Node.js API server |
| MongoDB | 27017 | Database |

## Docker Commands

### Start all services
```bash
docker-compose up -d
```

### Stop all services
```bash
docker-compose down
```

### View logs
```bash
# All services
docker-compose logs

# Specific service
docker-compose logs backend
docker-compose logs frontend
docker-compose logs admin
docker-compose logs mongodb
```

### Rebuild services
```bash
# Rebuild all
docker-compose up --build

# Rebuild specific service
docker-compose up --build backend
```

### Remove all containers and volumes
```bash
docker-compose down -v
```

## Development Mode

For development, you might want to run services individually:

### Backend only
```bash
docker-compose up mongodb backend
```

### Frontend development (with hot reload)
```bash
# Run backend and database
docker-compose up -d mongodb backend

# Run frontend locally
cd frontend
npm install
npm run dev
```

## Production Deployment

### Environment Variables
Make sure to set production values:

```env
# Use strong JWT secret
JWT_SECRET=your-super-strong-jwt-secret-for-production

# Use production MongoDB
MONGODB_URI=mongodb://username:password@your-production-mongodb-host:27017/ecommerce

# Production admin credentials
ADMIN_EMAIL=your-admin@company.com
ADMIN_PASSWORD=strong-admin-password
```

### Build for production
```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## Troubleshooting

### Port conflicts
If ports are already in use, modify `docker-compose.yml`:
```yaml
ports:
  - "3001:80"  # Change 3001 to available port
```

### Database connection issues
1. Check if MongoDB container is running:
   ```bash
   docker-compose ps
   ```

2. Check MongoDB logs:
   ```bash
   docker-compose logs mongodb
   ```

3. Reset database:
   ```bash
   docker-compose down -v
   docker-compose up -d
   ```

### Image build issues
1. Clear Docker cache:
   ```bash
   docker system prune -a
   ```

2. Rebuild without cache:
   ```bash
   docker-compose build --no-cache
   ```

### Container memory issues
Increase Docker Desktop memory allocation:
- Docker Desktop → Settings → Resources → Memory

## Database Management

### Access MongoDB shell
```bash
docker-compose exec mongodb mongosh -u admin -p password123 --authenticationDatabase admin
```

### Backup database
```bash
docker-compose exec mongodb mongodump -u admin -p password123 --authenticationDatabase admin --db ecommerce --out /backup
```

### Restore database
```bash
docker-compose exec mongodb mongorestore -u admin -p password123 --authenticationDatabase admin --db ecommerce /backup/ecommerce
```

## Monitoring

### Check container health
```bash
docker-compose ps
```

### Monitor resource usage
```bash
docker stats
```

### View container details
```bash
docker inspect ecommerce-backend
```

## Security Notes

1. **Change default passwords** in production
2. **Use environment variables** for sensitive data
3. **Enable MongoDB authentication** in production
4. **Use HTTPS** in production
5. **Regularly update** Docker images

## Performance Optimization

1. **Use multi-stage builds** (already implemented)
2. **Optimize Docker images** with Alpine Linux
3. **Use .dockerignore** files (already included)
4. **Enable gzip compression** (configured in nginx)
5. **Set up proper caching** headers

## Support

If you encounter issues:
1. Check the logs: `docker-compose logs [service-name]`
2. Verify environment variables
3. Ensure all required ports are available
4. Check Docker Desktop resources