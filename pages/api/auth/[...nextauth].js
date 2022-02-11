import NextAuth from "next-auth";

export default NextAuth({
    pages : {
        signIn : '/signup',
        login : '/login'
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {

            return true
        },
        async jwt({ token, account }) {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                token.accessToken = account.access_token
            }
            return token
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            console.log()
            session.accessToken = token.accessToken
            return session
        }
    }
})