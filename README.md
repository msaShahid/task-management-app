# Task Management Web Application

A task management web application developed with Laravel 11 for the backend and React Inertia for the frontend. This application allows project coordinators or superiors to assign tasks to software developers, who can then update the status of tasks as they progress. Superiors can view real-time updates on task status.

## Features

- **Task Assignment**: Superiors can assign tasks to developers.
- **Task Status Update**: Developers can mark tasks as completed.
- **Real-time Updates**: Task status changes are immediately visible to all relevant users.

## Tech Stack

- **Backend**: Laravel 11
- **Frontend**: React Inertia
- **Database**: MySQL (or other supported databases)
- **Authentication**: Laravel Sanctum (or other preferred authentication method)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **PHP**: 8.1 or higher
- **Composer**: For managing PHP dependencies
- **Node.js**: For managing frontend dependencies
- **npm**: Node package manager
- **MySQL**: Or any other supported database


## Installation

Follow these steps to set up the application:

1. **Clone the Repository**

    git clone https://github.com/yourusername/task-management-app.git

2. **Navigate to the Project Directory**

    cd task-management-app

3. **Install Composer dependencies**:

    composer install

4. **Set up the environment file**:

    Copy the `.env.example` file to `.env`:

    cp .env.example .env


5. **Generate the application key**:

    php artisan key:generate

6. **Set up the database configuration**

    Update the database connection settings in the `.env` file.

    in the `.env` file. Configure the database settings according to your local setup.

7. **Run migrations**:

    php artisan migrate

8. **Install npm dependencies**:

    npm install

9. **Run the development server**:

    npm run dev

10. **Serve the Application**

    php artisan serve
  
    The application will be accessible at `http://localhost:8000`.

## Configuration

### Environment Configuration

Ensure that the following environment variables are set in your `.env` file:

- `APP_NAME`
- `APP_ENV`
- `APP_KEY`
- `APP_DEBUG`
- `APP_URL`
- `LOG_CHANNEL`
- `DB_CONNECTION`
- `DB_HOST`
- `DB_PORT`
- `DB_DATABASE`
- `DB_USERNAME`
- `DB_PASSWORD`

## Usage

1. **Log in as a Superior** to assign tasks:
   - Use the provided credentials or register a new user through the frontend.
   - Navigate to the task management section to create and assign tasks.

2. **Log in as a Developer** to view and update tasks:
   - Use the provided credentials or register a new user through the frontend.
   - Navigate to your task list to see tasks assigned to you and update their status.

3. **Real-Time Updates**: Task status updates made by developers will be reflected in real-time for all users.



## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Create a new Pull Request.

