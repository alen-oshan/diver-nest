import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials';
import { findUserByEmail } from '@/queries/user'
import bcrypt from 'bcryptjs';

export const {
    handlers: {GET, POST},
    auth,
    signIn,
    signOut,
    } = NextAuth({
            providers: [
                GoogleProvider({
                    clientId: process.env.GOOGLE_CLIENT_ID,
                    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                    authorization:{
                        params:{
                            prompt:"consent",
                            access_type:"offline",
                            response_code:"code"
                        }
                    }
                }),
                GithubProvider({
                    clientId: process.env.GITHUB_CLIENT_ID,
                    clientSecret: process.env.GITHUB_CLIENT_SECRET,
                    authorization:{
                        params:{
                            prompt:"consent",
                            access_type:"offline",
                            response_code:"code"
                        }
                    }
                }),
                CredentialsProvider({
                    name: "Credentials",
                    credentials: {
                        email: { label: "Email", type: "text" },
                        password: { label: "Password", type: "password" },
                    },
                    async authorize(credentials) {
                        
                        if (!credentials?.email || !credentials?.password) {
                            console.log("Missing credentials");
                            return null;
                        }

                        try {
                            const user = await findUserByEmail({email:credentials?.email});
                            console.log("User found:", user);

                            if (!user) {
                                console.log("User not found");
                                return null;
                            }

                            if (!user.password) {
                                console.log("User has no password");
                                return null;
                            }

                            console.log("Credentials password:", credentials.password);
                            console.log("User passwordHash:", user.password);

                            const isMatch = await bcrypt.compare(credentials.password, user.password);
                            console.log("Password match:", isMatch);
                            
                            if (isMatch) {
                                return {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                };
                            } else {
                                console.log("Password mismatch");
                                return null;
                            }

                        } catch (error) {
                            console.error("Error in authorize:", error);
                            return null; 
                        }
                    }
                })
            ],
            secret: process.env.NEXTAUTH_SECRET,
        });