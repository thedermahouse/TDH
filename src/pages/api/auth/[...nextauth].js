import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
export const authOptions = {
  providers: [
    Credentials({
      credentials: {
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const user = {
          id: 1,
          name: "Admin",
          email: null,
          image: null,
        };
        if (credentials.password === process.env.ADMIN_PASSWORD) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};
export default NextAuth(authOptions);
