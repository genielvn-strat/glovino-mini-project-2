import { auth, signIn, signOut } from "@/auth";

export default async function AccountPage() {
    const session = await auth();

    return (
        <>
            <form
                action={async () => {
                    "use server";
                    await signIn("google");
                }}
            >
                <button type="submit">Sign In with Google</button>
            </form>

            <form
                action={async () => {
                    "use server";
                    await signOut();
                }}
            >
                <button>Sign Out</button>
            </form>
            {session?.user && (
                <>
                    <p>{JSON.stringify(session, null, 2)}</p>
                    <p>{session?.user.id}</p>
                </>
            )}
        </>
    );
}
