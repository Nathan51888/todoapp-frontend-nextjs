// https://next-auth.js.org/getting-started/typescript
// not sure about any of this but it throws no TS errors (anymore)

import NextAuth, { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
    // Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context

    interface Session {
        accessToken?: string;
        refreshToken?: string;
        user: User;
    }

    /**
     * The shape of the user object returned in the OAuth providers' `profile` callback,
     * or the second parameter of the `session` callback, when using a database.
     */
    interface User extends DefaultSession['user'] {
        // not setting this will throw ts error in authorize function
        userId?: number;
        accessToken?: string;
        refreshToken?: string;
    }
}

declare module 'next-auth/jwt' {
    // Returned by the `jwt` callback and `getToken`, when using JWT sessions
    interface JWT {
        userId?: number;
        accessToken?: string;
        refreshToken?: string;
    }
}
