import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sql } from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface User {
  id: number;
  email: string;
  full_name?: string;
  created_at: Date;
}

export interface AuthUser {
  id: number;
  email: string;
  full_name?: string;
}

export async function createUser(email: string, password: string, fullName?: string): Promise<User> {
  const passwordHash = await bcrypt.hash(password, 10);
  
  const result = await sql`
    INSERT INTO users (email, password_hash, full_name)
    VALUES (${email}, ${passwordHash}, ${fullName || null})
    RETURNING id, email, full_name, created_at
  `;
  
  return result[0] as User;
}

export async function authenticateUser(email: string, password: string): Promise<AuthUser | null> {
  const result = await sql`
    SELECT id, email, password_hash, full_name, created_at
    FROM users
    WHERE email = ${email}
  `;
  
  if (result.length === 0) {
    return null;
  }
  
  const user = result[0];
  const isValid = await bcrypt.compare(password, user.password_hash);
  
  if (!isValid) {
    return null;
  }
  
  return {
    id: user.id,
    email: user.email,
    full_name: user.full_name
  };
}

export function generateToken(user: AuthUser): string {
  return jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): AuthUser | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return {
      id: decoded.userId,
      email: decoded.email
    };
  } catch {
    return null;
  }
}
