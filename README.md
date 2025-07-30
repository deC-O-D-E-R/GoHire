# GoHire - Microservices Recruitment Platform

A modern, scalable recruitment platform built with microservices architecture, featuring seamless job management, authentication, and a React frontend.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Features](#features)
- [Services](#services)
- [Configuration](#configuration)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Overview

**GoHire** is a recruitment platform designed with microservices architecture to provide scalability, maintainability, and high performance. It offers job management, robust authentication, and an intuitive user experience.

### Key Benefits

- **Microservices Architecture**: Scalable and maintainable service separation
- **High Performance**: Redis caching and optimized database queries
- **Secure**: JWT-based authentication with Redis session management
- **Modern UI**: Responsive React frontend
- **Container-Ready**: Fully dockerized for easy deployment

## Tech Stack

### Backend Microservices
- **Spring Boot**: REST API Framework
- **MongoDB**: NoSQL Database
- **Redis**: Caching & Session Management
- **JWT**: Secure Authentication
- **Docker**: Containerization

### Frontend
- **React.js**: UI Library
- **Axios**: HTTP Client

### DevOps
- **Docker Compose**: Multi-container Orchestration
- **GitHub Actions**: CI/CD Pipeline

## Project Structure

```
GOHIRE/
├── .github/
│   └── workflows/          # CI/CD pipelines
├── auth-service/           # Authentication microservice
│   ├── src/
│   ├── Dockerfile
│   └── application.properties
├── job-service/            # Job management microservice
│   ├── src/
│   ├── Dockerfile
│   └── application.properties
├── frontend/               # React application
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml      # Multi-container orchestration
├── .gitignore
└── README.md
```

## Quick Start

### Prerequisites

- Docker (v20.0+)
- Docker Compose (v2.0+)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kshitijmainkar/gohire.git
   cd gohire
   ```

2. **Start all services**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Auth Service: http://localhost:8080
   - Job Service: http://localhost:8081

### Health Check

```bash
# Check if all containers are running
docker-compose ps

# View logs for specific service
docker-compose logs auth-service
docker-compose logs job-service
docker-compose logs frontend
```

## Features

### Authentication & Security
- User Registration & Login
- JWT Authentication
- Redis Session Management
- Protected Routes

### Job Management
- Create Jobs
- Browse Jobs
- Job Details
- Application Management

### User Experience
- Responsive Design
- Modern UI
- Real-time Updates
- Performance Optimized

## Services

### Auth Service (Port: 8080)
**Responsibilities:**
- User registration and authentication
- JWT token generation and validation
- Password encryption and security
- Redis-based token caching

**Key Endpoints:**
```
POST /api/auth/register     # User registration
POST /api/auth/login        # User login
POST /api/auth/logout       # User logout
GET  /api/auth/profile      # User profile
```

### Job Service (Port: 8081)
**Responsibilities:**
- Job creation and management
- Job search and filtering
- Application tracking

**Key Endpoints:**
```
GET    /api/jobs           # List all jobs
POST   /api/jobs           # Create new job
GET    /api/jobs/{id}      # Get job details
PUT    /api/jobs/{id}      # Update job
DELETE /api/jobs/{id}      # Delete job
```

## Configuration

### Environment Variables

#### Auth Service
```properties
spring.data.mongodb.uri=mongodb://mongo-auth:27017/auth-db
spring.redis.host=redis
spring.redis.port=6379
jwt.secret=your_super_secret_key
jwt.expiration=86400000
server.port=8080
```

#### Job Service
```properties
spring.data.mongodb.uri=mongodb://mongo-job:27018/job-db
server.port=8081
auth.service.url=http://auth-service:8080
```

#### Frontend
```env
REACT_APP_AUTH_SERVICE_URL=http://localhost:8080
REACT_APP_JOB_SERVICE_URL=http://localhost:8081
```

### Docker Compose Services

```yaml
services:
  auth-service:
    ports: ["8080:8080"]
    depends_on: [mongo-auth, redis]
  
  job-service:
    ports: ["8081:8081"]
    depends_on: [mongo-job]
  
  frontend:
    ports: ["3000:3000"]
    depends_on: [auth-service, job-service]
  
  mongo-auth: { ports: ["27017:27017"] }
  mongo-job: { ports: ["27018:27018"] }
  redis: { ports: ["6379:6379"] }
```

## Development

### Local Development Setup

1. **Backend Services (without Docker):**
   ```bash
   # Auth Service
   cd auth-service
   ./mvnw spring-boot:run
   
   # Job Service (in another terminal)
   cd job-service
   ./mvnw spring-boot:run
   ```

2. **Frontend Development:**
   ```bash
   cd frontend
   npm install
   npm start
   ```

3. **Database Setup:**
   ```bash
   # Start MongoDB and Redis
   docker-compose up mongo-auth mongo-job redis
   ```

### Debugging

```bash
# View service logs
docker-compose logs -f auth-service
docker-compose logs -f job-service

# Access database
docker exec -it gohire_mongo-auth_1 mongo auth-db
docker exec -it gohire_redis_1 redis-cli
```

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for new functionality
5. Commit your changes (`git commit -m 'feat: add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Guidelines

- Follow existing code style and conventions
- Write clear, concise commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all CI checks pass

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built by Kshitij Mainkar**
