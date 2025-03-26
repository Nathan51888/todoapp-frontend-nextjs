import api from '@/app/lib/api';
import { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'email and password',
            credentials: {
                identifier: {
                    label: 'Email or username *',
                    type: 'text',
                },
                password: { label: 'Password *', type: 'password' },
            },
            async authorize(credentials, req): Promise<any> {
                // make sure the are credentials
                // if (!credentials || !credentials.identifier || !credentials.password) {
                //     return null;
                // }
                try {
                    const res = await api.post("/login", {
                        email: "test@test.com",
                        password: credentials!.password,
                    });
                    console.log(res)

                    if (res.status != 200) {
                        throw new Error("Login fetch failed");
                    }

                    // success
                    const data = res.data
                    console.log(data)
                    if (data && data.token) {
                        return { accessToken: data.token, refreshToken: data.refreshToken, userId: 22 } as User;
                    }
                } catch (error) {
                    // Catch errors in try but also f.e. connection fails
                    throw error;
                }
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            // console.log('singIn callback', { account, profile, user });
            if (
                account &&
                account.provider === 'google' &&
                profile &&
                'email_verified' in profile
            ) {
                if (!profile.email_verified) return false;
            }
            return true;
        },

        async jwt({ token, trigger, account, user, session }) {
            // console.log('jwt callback', {
            //   token,
            //   trigger,
            //   account,
            //   user,
            //   session,
            // });

            // change username update
            if (trigger === 'update' && session?.username) {
                token.name = session.username;
            }

            // change password update
            if (trigger === 'update' && session?.accessToken) {
                token.accessToken = session.accessToken;
            }

            // first login
            if (account) {
                if (account.provider === 'credentials') {
                    // for credentials, not google provider
                    // name and email are taken care of by next-auth or authorize
                    token.userId = user.userId;
                    token.accessToken = user.accessToken;
                    token.refreshToken = user.refreshToken;
                }
            }

            // check if access token is expired

            return token;
        },
        async session({ token, session }) {
            // console.log('session callback', {
            //   token,
            //   session,
            // });

            session.accessToken = token.accessToken;
            session.refreshToken = token.refreshToken;
            session.user.userId = token.userId;

            return session;
        },
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: '/login',
        // error: '/authError',
    },
};
