// @ts-nocheck

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from '../../../utils/axios';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'E-mail', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        console.log('credentials'.credentials);

        try {
          const user = await axios.post(
            'auth/signin',
            {
              password: credentials?.password,
              email: credentials?.email,
            },
            {
              headers: {
                accept: '*/*',
                'Content-Type': 'application/json',
              },
            }
          );

          if (user) {
            return user.data;
          } else {
            return null;
          }
        } catch (err: any) {
          const errorMessage = err.response.data.message;
          // Redirecting to the login page with error message in the URL
          throw new Error(errorMessage + '&email=' + credentials?.email);
        }
      },
    }),
  ],

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },

  callbacks: {
    // Getting the JWT token from API response
    async jwt({ token, user, profile }) {
      // console.log('toke from jwt', token);
      // console.log('user from jwt', user);
      // console.log('profile from jwt', profile);

      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },

    session: async ({ session, token, user }) => {
      // console.log('session from api', session);
      // console.log('token from api', token);
      // console.log('user from api', user);
      session.accessToken = token.accessToken;
      session.user = { id: token.sub, email: token.email };
      // console.log('session from api 2', session);

      return session;
    },
  },

  pages: {
    error: '/sign-in',
    signIn: '/sign-in',
  },
});
