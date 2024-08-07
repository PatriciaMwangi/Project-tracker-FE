# Project Tracking System

The Project Tracking System at Moringa School tracks projects completed by students, providing a project bank for future reference and fostering collaboration and idea exchange among students.


## Installation

### Prerequisites
- Python 3.x
- pip (Python package installer)
- Node.js
- npm (Node package manager)
- PostgreSQL

### Backend Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/your-repo/project-tracking-system.git
    cd project-tracking-system
    ```

2. Set up a virtual environment and install dependencies:
    ```bash
    python -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    ```

3. Configure the database in `config.py`.

4. Run database migrations:
    ```bash
    flask db upgrade
    ```

5. Start the backend server:
    ```bash
    flask run
    ```

### Frontend Setup
1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the frontend server:
    ```bash
    npm start
    ```

## Usage

### Access the Application
- Backend: `http://localhost:5000`
- Frontend: `http://localhost:3000`

## API Documentation

### Authentication

#### Register
**POST /api/auth/register**
- Request Body:
    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string"
    }
    ```
- Response:
    ```json
    {
      "message": "User registered successfully"
    }
    ```

#### Login
**POST /api/auth/login**
- Request Body:
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
- Response:
    ```json
    {
      "access_token": "string"
    }
    ```

### Projects

#### Get All Projects
**GET /api/projects**
- Response:
    ```json
    [
      {
        "id": "integer",
        "title": "string",
        "description": "string",
        "owner_id": "integer",
        "created_at": "string",
        "updated_at": "string"
      }
    ]
    ```

#### Get Project by ID
**GET /api/projects/{id}**
- Response:
    ```json
    {
      "id": "integer",
      "title": "string",
      "description": "string",
      "owner_id": "integer",
      "created_at": "string",
      "updated_at": "string"
    }
    ```

#### Create a Project
**POST /api/projects**
- Request Body:
    ```json
    {
      "title": "string",
      "description": "string",
      "owner_id": "integer"
    }
    ```
- Response:
    ```json
    {
      "id": "integer",
      "title": "string",
      "description": "string",
      "owner_id": "integer",
      "created_at": "string",
      "updated_at": "string"
    }
    ```

#### Update a Project
**PUT /api/projects/{id}**
- Request Body:
    ```json
    {
      "title": "string",
      "description": "string"
    }
    ```
- Response:
    ```json
    {
      "id": "integer",
      "title": "string",
      "description": "string",
      "owner_id": "integer",
      "created_at": "string",
      "updated_at": "string"
    }
    ```

#### Delete a Project
**DELETE /api/projects/{id}**
- Response:
    ```json
    {
      "message": "Project deleted successfully"
    }
    ```

### Users

#### Get All Users
**GET /api/users**
- Response:
    ```json
    [
      {
        "id": "integer",
        "username": "string",
        "email": "string",
        "created_at": "string",
        "updated_at": "string"
      }
    ]
    ```

#### Get User by ID
**GET /api/users/{id}**
- Response:
    ```json
    {
      "id": "integer",
      "username": "string",
      "email": "string",
      "created_at": "string",
      "updated_at": "string"
    }
    ```

### Admin

#### Add Cohort
**POST /api/admin/cohort**
- Request Body:
    ```json
    {
      "name": "string",
      "start_date": "string",
      "end_date": "string"
    }
    ```
- Response:
    ```json
    {
      "id": "integer",
      "name": "string",
      "start_date": "string",
      "end_date": "string"
    }
    ```

#### Add or Delete Projects
**POST /api/admin/projects**
- Request Body:
    ```json
    {
      "project_id": "integer",
      "action": "add/delete"
    }
    ```
- Response:
    ```json
    {
      "message": "Project added/deleted successfully"
    }
    ```

## Data Models

### User
```json
{
  "id": "integer",
  "username": "string",
  "email": "string",
  "password": "string",
  "created_at": "string",
  "updated_at": "string"
}
```
### Project
```json

{
  "id": "integer",
  "title": "string",
  "description": "string",
  "owner_id": "integer",
  "members": ["integer"],
  "github_link": "string",
  "created_at": "string",
  "updated_at": "string"
}
```
## Cohort
```json

{
  "id": "integer",
  "name": "string",
  "start_date": "string",
  "end_date": "string"
}
```
## Examples
Register a New User
``` bash

curl -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d '{"username": "john_doe", "email": "john@example.com", "password": "password123"}'
```
## Create a New Project
``` bash

curl -X POST http://localhost:5000/api/projects -H "Content-Type: application/json" -d '{"title": "Project Title", "description": "Project Description", "owner_id": 1}'
```
## Contributing
*Fork the repository.
*Create a new branch.
*Make your changes.
*Submit a pull request.

## License
This project is licensed under the MIT License.