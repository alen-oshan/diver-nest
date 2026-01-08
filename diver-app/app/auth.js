import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials';

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
                    clientId: process.env.GITHUB_CLIENT_ID,
                    clientSecret: process.env.GITHUB_CLIENT_SECRET,
                    authorization:{
                        params:{
                            prompt:"consent",
                            access_type:"offline",
                            response_code:"code"
                        }
                    }
                })
            ],
            secret: process.env.NEXTAUTH_SECRET,
        });