import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: "Email", type: "email" },
        password: {  label: "Password", type: "password" }
      },

      async authorize(credentials) {
        const user = await fetch(`${process.env.NEXT_PUBLIC_FETCHURL}/signin`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              email: credentials.email,
              password: credentials.password
          })
        })
        .then(response => {
          if (response.status >= 200 && response.status < 300) {
            return response.json()
          }
        })
        .catch(err => {console.log("erro", err)})
        if (user) {
          return user
        } else {
          return null
        }
      },
    })
  ],

  pages: {
    error:"/signin"
  },

  callbacks: {
    async session(session, token) {
      session.accessToken = token.accessToken
      return session
    },
    async jwt(token, user) {
        if (user) {
          token.accessToken = {... user}
        }

      return token
      }
  },

  // // A database is optional, but required to persist accounts in a database
  // database: 
})