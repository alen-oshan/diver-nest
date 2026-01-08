'use server'
import { signIn, signOut } from "@/app/auth";

export async function doSocialLogin(formData) {
    const action = formData.get('action');
    console.log(action)
    await signIn(action, { redirectTo: "/home" });
}

export async function logout() {
    await signOut({ redirectTo: "/" });
}
