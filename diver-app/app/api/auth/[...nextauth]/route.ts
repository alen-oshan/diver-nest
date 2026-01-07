// app/api/auth/[...nextauth]/route.ts - NO ADAPTER, ONLY MONGOOSE
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '@/lib/models/User.model';
import connectDB from '@/lib/db/mongoose';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({ 
          email: credentials?.email?.toLowerCase() 
        });
        
        if (!user || !user.passwordHash) return null;
        
        const isValid = await bcrypt.compare(
          credentials?.password || '', 
          user.passwordHash
        );
        
        return isValid ? {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
          phone: user.phone,
        } : null;
      },
    }),
  ],
  
  callbacks: {
    // Handle JWT token
    async jwt({ token, user, account, profile }: any) {
      // ========== GOOGLE OAUTH SIGN IN ==========
      if (account?.provider === 'google' && profile) {
        try {
          await connectDB();
          
          // 1. Check if user exists by email
          let existingUser = await User.findOne({ 
            email: profile.email?.toLowerCase() 
          });
          
          // 2. If user doesn't exist, create new user
          if (!existingUser) {
            existingUser = await User.create({
              name: profile.name,
              email: profile.email?.toLowerCase(),
              googleId: profile.sub, // Google's unique ID
              emailVerified: new Date(),
              image: profile.picture,
              role: 'customer',
              phone: '', // Google doesn't provide phone
              // No passwordHash for Google users
            });
          } 
          // 3. If user exists but doesn't have googleId, update it
          else if (!existingUser.googleId) {
            existingUser.googleId = profile.sub;
            existingUser.image = profile.picture || existingUser.image;
            existingUser.emailVerified = existingUser.emailVerified || new Date();
            await existingUser.save();
          }
          
          // 4. Add user data to token
          token.id = existingUser._id.toString();
          token.role = existingUser.role;
          token.phone = existingUser.phone || '';
          token.picture = existingUser.image;
          token.email = existingUser.email;
          
        } catch (error) {
          console.error('Google sign in error:', error);
        }
      }
      
      // ========== EMAIL/PASSWORD SIGN IN ==========
      if (user) {
        token.id = user.id;
        token.role = user.role || 'customer';
        token.phone = user.phone || '';
      }
      
      return token;
    },
    
    // Handle session data
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.phone = token.phone;
        if (token.picture) {
          session.user.image = token.picture;
        }
      }
      return session;
    },
  },
  
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  
  secret: process.env.NEXTAUTH_SECRET,
  
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };