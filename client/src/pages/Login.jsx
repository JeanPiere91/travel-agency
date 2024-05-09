import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { USER_LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

// Login User

// Auth

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(USER_LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
        const mutationResponse = await login({
            variables: { email: formState.email, password: formState.password },
        });
        const token = mutationResponse.data.login.token;
        Auth.login(token);
    } catch (error) {
        console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
        ...formState,
        [name]: value,
    });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
      <Link to="/signup" className="text-blue-500 hover:text-blue-600 font-semibold">Signup</Link>
      <h3 className="text-lg font-semibold text-gray-800 mt-2">Login</h3>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
          <input 
            placeholder="example@email.com" 
            name="email" 
            type="email" 
            id="email" 
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
          <input
            placeholder="password"
            name="password"
            type="password"
            id="password"
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {error ? (
          <div className="text-red-500 text-sm mb-2">
            <p>Incorrect email or password</p>
          </div>
        ) : null}
        <div>
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Log in</button>
        </div>
      </form>
      </div>
    </div>
  );
}

export default Login;