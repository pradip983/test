import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { dbConnect } from '@/lib/dbconnect';
import User from '@/models/User';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await dbConnect();
          console.log("Database connected successfully");

          const user = await User.findOne({ username: credentials.username });
          console.log("User query result:", user);

          if (!user) {
            console.error("No user found with this username");
            throw new Error("Invalid username or password");
          }

          // Directly compare passwords (only for testing; NOT secure for production)
          if (user.password !== credentials.password) {
            console.error("Invalid password");
            throw new Error("Invalid username or password");
          }

          // Return user data to be stored in the token
          return { id: user._id.toString(), username: user.username };
        } catch (error) {
          console.error("Error in authorize function:", error.message);
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      console.log("Session callback triggered");

      if (token) {
        session.user = {
          id: token.id,
          username: token.username,
        };
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt", // Change to "jwt" to support CredentialsProvider
  },
 
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
