import NextAuth from "next-auth"
import CredentialProvider from "next-auth/providers/credentials"
import axios from "axios";

const handler = NextAuth({
    providers: [
        CredentialProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "email" },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials, req) {
                const data = {
                    email: credentials?.email,
                    password: credentials?.password,
                }
                try {
                    const res = await axios.post('http://localhost:8080/login', {
                        email: data.email,
                        password: data.password,
                    });

                    if (res.data && res.data.accessToken) {
                        return { accessToken: res.data.accessToken, user: res.data.user };
                    }
                    return null;
                } catch (error) {
                    throw new Error('Invalid email or password');
                }
            },
        }),
    ],
    callbacks: {
        async jwt(token, user) {
            if (user) {
                token.accessToken = user.accessToken;
            }
            return token;
        },
        async session(session, token) {
            session.accessToken = token.accessToken;
            return session;
        },
    },
    pages: {
        signIn: '/login',
    },
})

export { handler as GET, handler as POST }
