import React from 'react'
import RegisterForm from './RegisterForm'

const RegisterPage = () => {
  return (
    <section>
      <div className='flex flex-col items-center justify-center mt-10'>
        <span className="text-6xl font-semibold text-red-600 hover:text-red-700 transition-colors">
        lakeSide <span className="text-gray-800">hotel</span>
      </span>
      <div className='flex flex-col items-center justify-center mt-2 text-md text-gray-700 leading-relaxed font-light'>
        <p>Experience serenity by the lake, wrapped in luxury and warmth.</p>
        <p>Create an account and let your perfect stay begin.</p>
      </div>
      </div>
      <div className='flex w-full items-center justify-center mt-5 mb-5'>
        <RegisterForm/>
      </div>
    </section>
  )
}

export default RegisterPage
