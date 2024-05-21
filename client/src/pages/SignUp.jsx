import { useState } from 'react';
import { Link, useNavigate }from 'react-router-dom'
import OAuth from '../components/OAuth';



export default function SignUp() {

  const [formData, setFormData] = useState({});
  const [error, setError ] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handlechange = (e) => {
    setFormData ({
      ...formData,
      [e.target.id]: e.target.value
    });
};

const handleSubmit = async (e) => {
  setLoading(true);
  e.preventDefault()

  try {

    const res = await fetch('/api/auth/signup',
    {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(formData)
    });
    const data = await res.json()
    if(data.success === false) {
      setError(data.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    setError(null);
    navigate('/sign-in');

  }

  catch(error) {

    setLoading(false);
    setError(error.message);
    
  }



}



  return (
    <div className='p-5 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder='Username' className='border p-3 rounded-lg' id='username' onChange={handlechange}/>
        <input type="email" placeholder='Email' className='border p-3 rounded-lg' id='email' onChange={handlechange}/>
        <input type="password" placeholder='Password' className='border p-3 rounded-lg' id='password' onChange={handlechange}/>
      <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg hover:opacity-90 disabled:opacity-50 '> {loading ? 'Loading...' : 'SIGN UP'}</button>
      <OAuth/>
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={"/sign-in"}
        ><span className='text-blue-700'>Sign in</span></Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}


