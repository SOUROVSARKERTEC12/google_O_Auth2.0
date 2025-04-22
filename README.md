# 🔐 Google OAuth 2.0 Authentication System

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Google OAuth](https://img.shields.io/badge/Google_OAuth-4285F4?style=for-the-badge&logo=google&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

A full-stack application implementing Google OAuth 2.0 authentication with a React frontend and Node.js backend.

## Project Structure

```
├── Backend/                 # Node.js backend server
│   ├── src/                # Source code
│   │   ├── config/        # Configuration files
│   │   ├── controllers/   # Route controllers
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   └── app.js         # Main application file
│   └── package.json       # Backend dependencies
│
└── Frontend/              # React frontend application
    ├── src/              # Source code
    ├── public/           # Static assets
    └── package.json      # Frontend dependencies
```

## Technologies Used

### Backend
- **Node.js**: Runtime environment
- **Express**: Web framework
- **Passport.js**: Authentication middleware
- **Google OAuth 2.0**: Authentication strategy
- **MySQL/Sequelize**: Database and ORM
- **JWT**: Token-based authentication
- **CORS**: Cross-origin resource sharing
- **Morgan**: HTTP request logger

### Frontend
- **React**: UI library
- **Vite**: Build tool and development server
- **Material-UI**: UI component library
- **React Router**: Client-side routing
- **Emotion**: CSS-in-JS styling

## Features
- Google OAuth 2.0 authentication
- Session management
- Protected routes
- Responsive UI
- Modern Material Design interface

## Setup Instructions

### Backend Setup
1. Navigate to the Backend directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   JWT_SECRET=your_jwt_secret
   DATABASE_URL=your_database_url
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the Frontend directory:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   VITE_API_URL=http://localhost:5000
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /auth/google` - Initiate Google OAuth
- `GET /auth/google/callback` - Google OAuth callback
- `GET /auth/logout` - Logout user
- `GET /auth/status` - Check authentication status

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

The MIT License is a permissive free software license originating at the Massachusetts Institute of Technology. It is a simple license that permits reuse within proprietary software provided all copies of the licensed software include a copy of the MIT License terms and the copyright notice.

### Key Features of MIT License:
- Commercial use
- Modification
- Distribution
- Private use
- No liability
- No warranty

For more information about the MIT License, visit [opensource.org](https://opensource.org/licenses/MIT).

## Author Permissions

### Important Notice
This project is NOT open for public use. All rights are reserved by the author (SOUROVSARKERTEC12).

### Usage Policy
- ❌ This project cannot be used without explicit written permission from the author
- ❌ No commercial or personal use is allowed without authorization
- ❌ No modifications or distributions are permitted without consent
- ❌ The code cannot be used as a learning resource without permission

### How to Request Permission
If you wish to use this project:
- 📧 Contact the author directly for permission
- 📝 Provide details about your intended use
- ⏳ Wait for explicit written authorization

### Copyright Notice
All rights reserved. Unauthorized use, reproduction, or distribution of this project, or any portion of it, may result in severe civil and criminal penalties.
