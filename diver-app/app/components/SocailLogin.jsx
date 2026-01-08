import React from 'react'
import {doSocialLogin} from '@/app/actions/index'

const SocailLogin = () => {
  return (
    <div>
        <form action={doSocialLogin}>
            <button className='bg-yellow-100 text-black'type="submit" name="action" value="google">
                Sign in with Google
            </button>
            <br />
            <br />
            <button className='bg-black text-white'type="submit" name="action" value="github">
                Sign in with Github
            </button>
        </form>
    </div>
  )
}

export default SocailLogin