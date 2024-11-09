# Simple Trip Search Client

This project is a Simple Trip Search application built with a React frontend and an Express backend. It allows users to search for trips based on specified criteria, and it retains search inputs for a smoother user experience when navigating back to the search screen.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup and Installation](#setup-and-installation)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Dockerization](#dockerization)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Trip Search**: Allows users to search for trips based on specified criteria.
- **State Management**: Retains search inputs when navigating back to the search screen for a smooth experience.
- **Docker Support**: Docker configuration for both the client and server applications.
- **Responsive Design**: Optimized for various screen sizes.

## Tech Stack

- **Frontend**: React, Redux, TypeScript
- **Backend**: Node.js, Express, TypeScript
- **Database**: (Specify your database if applicable, e.g., MongoDB, PostgreSQL)
- **Testing**: Jest

## Setup and Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [Docker](https://www.docker.com/) (optional, for Dockerized setup)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/simple-trip-search.git
   cd simple-trip-search

2. **Install server dependencies** :
   ```bash
    cd server
    npm install

3. **Install client dependencies** :
   ```bash
    cd client
    npm install

4. **Configure environment variables:** :
    Create a .env file in the server folder with any required environment variables (e.g., PORT, DATABASE_URL).
    Create a .env file in the client folder if needed.      

5. **Running the Application:** :

### Client
     cd client
     npm start

### Server
     cd server
     npm start


6. **Dockerization:** 

1.Build and run the Docker containers:
 ```bash
  docker-compose up --build
