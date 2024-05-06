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
    <div className='mt-[100px] bg-red-500 border-2'>
      <Link to="/signup">Signup</Link>
      <h3>Login</h3>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input 
            placeholder="example@email.com" 
            name="email" 
            type="email" 
            id="email" 
            onChange={handleChange} 
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            placeholder="password"
            name="password"
            type="password"
            id="password"
            onChange={handleChange}
          />
        </div>
        {error ? (
          <div>
            <p>Incorrect email or password</p>
          </div>
        ) : null}
        <div>
          <button type="submit">Log in</button>
        </div>
      </form>
    </div>
  );
}

export default Login;