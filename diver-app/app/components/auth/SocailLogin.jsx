import React from 'react'
import {doSocialLogin} from '@/app/actions/index'
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const SocailLogin = () => {
  return (
    <div className="flex justify-center mt-6">
        <form
            action={doSocialLogin}
            className="w-full max-w-sm space-y-3"
        >
            <button
            type="submit"
            name="action"
            value="google"
            className="w-full flex items-center justify-center gap-2 bg-white text-black py-2 rounded-md border hover:bg-opacity-80 transition-all"
            >
            <FcGoogle />Sign in with Google
            </button>

            <button
            type="submit"
            name="action"
            value="github"
            className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 rounded-md hover:bg-opacity-80  transition"
            >
            <FaGithub />Sign in with GitHub
            </button>
        </form>
        </div>

  )
}

export default SocailLogin