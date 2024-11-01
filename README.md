# Golden Point Web Application

Golden Point is a web application designed to streamline the organization and management of amateur padel tournaments. This platform enhances interactions between players, organizers, and spectators by digitalizing key tournament processes, including managing user participation, tracking scores, and displaying rankings.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)

## Getting Started

### Prerequisites

To set up this project locally, ensure you have the following software installed:

- [Node.js (v14 or higher)](https://nodejs.org/) – Required for running the application.
- [Docker](https://www.docker.com/) – To run the application in a containerized environment.
- [Docker Compose](https://docs.docker.com/compose/install/) – Required for orchestrating Docker containers.
- [Git](https://git-scm.com/) – For cloning the repository.

### Installation

#### Clone the Repository

```bash
git clone https://github.com/AngeloMenel98/Golden_Point.git
cd Golden_Point
```

#### Install Dependencies

```bash
npm install
```

#### Install Docker-Compose

###### Linux

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/$(curl -s https://api.github.com/repos/docker/compose/releases/latest | jq -r .tag_name)/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose
```

- To verify installation

```bash
docker-compose --version
```

## Project structure

```bash
golden-point/
├── service-backend/                 # Contains the backend service code
│   ├── src/                         # Source files for the backend application
│   ├── package.json                 # Dependencies and scripts for the backend
│   ├── tsconfig.json                # TypeScript configuration file for the backend
│   ├── .env.template                # Template for environment variables for the backend
│   ├── Dockerfile                   # Dockerfile for building the backend service container
│
├── service-frontend/                # Contains the frontend application code
│   ├── src/                         # Source files for the frontend application
│   ├── Dockerfile                   # Dockerfile for building the frontend application container
│   ├── package.json                 # Dependencies and scripts for the frontend
│   ├── vite.config.ts               # Configuration file for Vite, the frontend build tool
│   └── tsconfig.json                # TypeScript configuration file for the frontend
│
├── docker-compose.yml               # Docker Compose configuration file for orchestrating services
├── README.md                        # Project documentation, including setup and usage instructions
└── ...                               # Other project files and directories
```

## Available Scripts

#### BackEnd

- `npm start`: Starts the backend server in development mode.
- `npm run typeorm`: Executes TypeORM commands. Make sure to provide the appropriate arguments as needed (e.g., migration, seeding).
- `npm run typeCheck`: Checks TypeScript types without emitting any output files.
- `npm run build`: Compiles the TypeScript code into JavaScript, generating files in the `build/` directory.

#### FrontEnd

- `npm run dev`: Starts the frontend application in development mode.
- `npm run build`: Compiles TypeScript code and builds the frontend application for production.
- `npm run lint`: Runs ESLint on the project, checking for code quality and style issues. It only allows warnings if they are reported and fails if any are found.
- `npm run preview`: Serves the production build for previewing the application locally.

#### Docker

To run both services using Docker, execute the following command in the root of the project:

- `docker-compose --env-file {path/to/env_file} up -d`: Builds and starts the backend and frontend services in containers. Replace _{path/to/env_file}_ with the actual path to your environment variable file.
- `docker-compose --env-file {path/to/env_file} down`: Stops and removes the containers. Again, replace _{path/to/env_file}_ with the path to your environment variable file.

## Environment Variables

To run the application, you'll need to set up the following environment variables. You can create a .env file in the root of your project and populate it with the values shown below:

```bash
PORT=             # Port on which the server will run
JWT_TTL=          # JSON Web Token time-to-live in seconds
DB_HOST=          # Database host
DB_PORT=          # Database port (default is usually 5432 for PostgreSQL)
DB_NAME=          # Name of the database
DB_USERNAME=      # Database username
DB_PASSWORD=      # Database password
LOG_LEVEL=        # Logging level (options: debug, info, warn, error)
DB_TIMEOUT=       # Timeout for database connections in milliseconds
JWT_SECRET_KEY=   # Secret key for signing JWTs
```

## Deployment

To deploy the application using Docker, follow these steps:

1. Log in to DockerHub: `docker login`
2. Build the new image: `docker-compose --env-file {path/to/env_file} build`
3. If the local image name is different to the dockerhub image name, add this command: `docker tag {local_image_name} angemenel98/{dockerhub_image_name}:{tag_version}`
4. Push the Local Image to DockerHub:`docker push angemenel98/{image_name}:{tag_version}`
