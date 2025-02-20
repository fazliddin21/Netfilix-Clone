import NextAuth, {
  NextAuthOptions,
} from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env
        .GITHUB_CLIENT_ID as string,
      clientSecret: process.env
        .GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env
        .GOOGLE_CLIENT_ID as string,
      clientSecret: process.env
        .GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    /*************  ✨ Codeium Command ⭐  *************/
    /**
     * Callback that is triggered whenever a session is checked.
     * It modifies the session object to include a normalized username
     * by concatenating the user's name without spaces in lowercase.
     * Additionally, it sets the user's unique identifier (uid) from the token's subject.
     *
     * @param session - The session object containing user information.
     * @param token - The token object containing user authentication details.
     * @returns The modified session object.
     */

    /******  7842a52a-fe8a-4265-a1cb-d50f48e9e97c  *******/
    async session({ session, token }: any) {
      session.user.username = session?.user?.name
        .split(" ")
        .join("")
        .toLowerCase();
      session.user.uid = token.sub;
      return session;
    },
  },
  secret: process.env.SECRET_KEY,
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
