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

export async function doCredentialLogin(formData) {
    try {
        const response = await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false
        });
        
        console.log("SignIn response:", response);
        return response;
    } catch (error) {
        console.error("Login error:", error);
        
        if (error.type === 'CredentialsSignin') {
            return { error: "Invalid email or password" };
        }
        
        return { error: error.message || "Authentication failed" };
    }
}
