import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

declare module "next-auth" {
    interface User {
        uid: string;
    }
    interface AdapterUser {
        uid: string;
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            profile(profile) {
                console.log(profile);
                return {
                    id: profile.sub,
                    uid: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.image,
                };
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    id: user.id,
                    uid: user.uid,
                };
            }
            return token;
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id as string,
                    uid: token.uid as string,
                },
            };
        },
    },
});

/* 
callbacks: {
    async jwt({ token, user}) {
        if (user) {
            return {
                ...token
                id: user.id,
            };
        }
        return token
    }
}
*/
