import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { HTTP_BACKEND } from "@/config";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),

        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                try {
                    const res = await axios.post(`${HTTP_BACKEND}/signin`, {
                        username: credentials.email,
                        password: credentials.password
                    });

                    if (res.data && res.data.token) {

                        return {
                            id: res.data.userId || credentials.email,
                            email: credentials.email,
                            accessToken: res.data.token
                        };
                    }
                    return null;
                } catch (error) {
                    console.error("Credentials auth error:", error);
                    return null;
                }
            }
        })
    ],

    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        async jwt({ token, user, account }) {
            // Store user id in token
            if (user) {
                token.userId = user.id;
            }

            if (user && user.accessToken) {
                token.accessToken = user.accessToken;
                return token;
            }

            if (user && account?.provider === "google" && !token.accessToken) {
                try {
                    const res = await axios.post(`${HTTP_BACKEND}/google-login`, {
                        email: user.email,
                        name: user.name,
                        photo: user.image
                    });

                    if (res.data && res.data.data && res.data.data.token) {
                        token.accessToken = res.data.data.token;
                        token.userId = res.data.data.userId;
                    }
                } catch (error) {
                    console.error("Failed to sync user with backend:", error);
                }
            }
            return token;
        },

        async session({ session, token }) {
            session.accessToken = token.accessToken;
            session.user.id = token.userId as string;
            return session;
        }
    },
    pages: {
        signIn: "/signin"
    }
};