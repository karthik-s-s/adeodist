# User and Role Management System

## Table of Contents
1. [Introduction](#introduction)
2. [Requirements](#requirements)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Usage](#usage)
6. [API Endpoints](#api-endpoints)
7. [File System](#file-system)
8. [Logging](#logging)
9. [Security](#security)
10. [Future Enhancements](#future-enhancements)
11. [Contributing](#contributing)
12. [License](#license)

---

## Introduction

This Node.js Express application is a User and Role Management System that allows the creation and management of three user roles: "Admin," "Super Admin," and "Basic" (read-only user). It provides RESTful APIs for user authentication using JWT, user role management, CRUD operations on users and feeds based on their roles, and access to logs for the Super Admin.

---

## Requirements

The application fulfills the following requirements:

1. **User Roles:**
   - "Admin," "Super Admin," and "Basic" roles.
   - Only one Super Admin with access to all feeds.
   - Super Admin can create, update, and delete other users and manage their roles and access to feeds.
   - Super Admin can provide "delete" access to Admins on specific feeds.
   - Admins can create and delete Basic users and provide access to specific feeds.
   - Admins can only delete feeds if they have the permission.

2. **Server Startup:**
   - Create a "superAdmin" user with credentials in the user table on server startup.

3. **Authentication:**
   - JWT-based authentication for different user types.

4. **RESTful APIs:**
   - Create different user types with access to feeds.
   - CRUD operations on users based on roles.
   - CRUD operations on feeds based on roles.
   - Log operations by users to files every 5 minutes

5. **File System:**
   - Log operations by users to files every 5 minutes.
   - Only Super Admin can access these logs via API.
   - Automatically delete files older than 30 minutes.

---

## Technologies Used

- Node.js
- Express.js
- JSON Web Tokens (JWT) for authentication
- File system for logging

---

## Installation

1. Clone this repository.
2. Navigate to the project directory.
3. Run `npm install` to install the required dependencies.
4. Configure environment variables as needed.

---

## Usage

1. Start the server: `npm run dev`
2. Use the provided RESTful APIs to manage users and feeds based on user roles.
3. Super Admin can access logs via the API.

---

## API Endpoints

- Detailed API documentation can be found in the API documentation file. do check the postman collection

---

## File System

- The application logs operations performed by users to files every 5 minutes.
- Super Admin can access these logs via the API.
- Files older than 30 minutes are automatically deleted.

---

## Logging

- Logs are created in the following format: `[timestamp] [user] [operation] [details]`.
- Logs are stored in files and can be accessed by the Super Admin via API.

---

## Security

- Authentication is based on JWT to ensure secure access to APIs.
- Role-based access control is implemented to restrict actions based on user roles.

---

## Future Enhancements

- Implement front-end for better user interaction.
- Enhance error handling and validation.
