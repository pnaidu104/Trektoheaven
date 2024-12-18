# NodeJS App with MySQL Docker Setup

This is a simple nodejs app that interacts with a MySQL database. The app allows users to submit forms, which are then stored in the database and displayed on the php.

## Prerequisites

Before you begin, make sure you have the following installed:

- Docker
- Git (optional, for cloning the repository)

This app is opertaing on docker-compose, not individually

1. Clone this repository (if you haven't already):

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   ```

2. Navigate to the project directory:

   ```bash
   cd your-repo-name
   ```

3. Create .env file in root directory and also in backend folder
   ```bash
   touch .env
   ```
4. Open the `.env` file and add your MySQL configuration: 

	```bash
	MYSQL_HOST=mysql
	MYSQL_USER=your_username
	MYSQL_PASSWORD=your_password
	MYSQL_DB=contactdb
	MYSQL_PORT=3306
	MYSQL_ROOT_PASSWORD=your_root_password (getting used in mysql and php)
	```
## Usage

1. Start the containers using Docker Compose:

   ```bash
   docker-compose up --build
   ```

2. Access the nodejs app in your web browser:

   - Frontend: http://localhost:80
   - Backend: http://localhost:5000
   - Database: http://localhost:3307
   - phpmyAdmin: http//localhost:8081 (to view your database input)

## Cleaning Up

To stop and remove the Docker containers, press `Ctrl+C` in the terminal where the containers are running, or use the following command:

```bash
docker-compose down
```

## Notes

- Make sure to replace placeholders (e.g., `your_username`, `your_password`, `your_database`) with your actual MySQL configuration.
- Make sure create .env file in root directory and backend folder.
- If you encounter issues, check Docker logs and error messages for troubleshooting.



