# Next.js Authentication System

A complete Next.js authentication system with PostgreSQL database, JWT tokens, and modern UI components.

## Features

- ✅ **User Registration** - Sign up with email, password, and full name
- ✅ **User Login** - Secure authentication with JWT tokens
- ✅ **Protected Routes** - Dashboard accessible only to authenticated users
- ✅ **Session Management** - HTTP-only cookies for secure token storage
- ✅ **Modern UI** - Built with shadcn/ui components and Tailwind CSS
- ✅ **Database** - PostgreSQL with Neon database integration
- ✅ **Security** - Password hashing with bcrypt, input validation with Zod

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Database**: PostgreSQL with Neon
- **Authentication**: JWT tokens with HTTP-only cookies
- **UI**: shadcn/ui components, Tailwind CSS
- **Type Safety**: TypeScript
- **Validation**: Zod schema validation

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database (Neon recommended)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd nextjs-auth-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Copy `.env.example` to `.env.local` and configure:
   ```bash
   cp .env.example .env.local
   ```

   Update the following variables in `.env.local`:
   ```
   DATABASE_URL=your_postgresql_connection_string
   JWT_SECRET=your_jwt_secret_key
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   ```

4. **Database Setup**
   The database schema will be created automatically on first use. The system expects a `users` table with the following structure:
   ```sql
   CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     email VARCHAR(255) UNIQUE NOT NULL,
     password_hash VARCHAR(255) NOT NULL,
     full_name VARCHAR(255),
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### Authentication Flow

1. **Sign Up**: Visit `/signup` to create a new account
2. **Login**: Visit `/` to sign in with your credentials
3. **Dashboard**: Access `/dashboard` after successful login
4. **Logout**: Click the logout button to end your session

### API Endpoints

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Authenticate user
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/logout` - Logout user

## Deployment

### Deploy to Coolify

1. **Push to GitHub**
   ```bash
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy in Coolify**
   - Log in to your Coolify dashboard
   - Create a new project
   - Select "Public Repository"
   - Enter your GitHub repository URL
   - Configure environment variables:
     - `DATABASE_URL`
     - `JWT_SECRET`
     - `NEXTAUTH_URL`
     - `NEXTAUTH_SECRET`
   - Deploy!

### Environment Variables for Production

When deploying to production, make sure to set these environment variables:

- `DATABASE_URL` - Your production PostgreSQL connection string
- `JWT_SECRET` - A strong, random JWT secret
- `NEXTAUTH_URL` - Your production domain URL
- `NEXTAUTH_SECRET` - A strong, random NextAuth secret

## Project Structure

```
├── app/
│   ├── api/auth/          # Authentication API routes
│   ├── dashboard/         # Protected dashboard page
│   ├── login/            # Login page
│   ├── signup/           # Registration page
│   └── page.tsx          # Home/Login page
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── login-form.tsx    # Login form component
│   └── theme-toggle.tsx  # Theme switcher
├── lib/
│   ├── auth.ts           # Authentication utilities
│   ├── db.ts             # Database connection
│   └── utils.ts          # Utility functions
├── public/               # Static assets
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
