import React, { useState, useEffect } from 'react';

import blogService from './services/blogs';
import loginService from './services/login';

import Blog from './components/Blog';


const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, []);

  const handleUsernameInput = e => setUsername(e.target.value);
  const handlePasswordInput = e => setPassword(e.target.value);
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const userLogged = await loginService.login({ username, password });
      if (userLogged) {
        setUser(userLogged);
        setUsername('');
        setPassword('');
      }
    } catch (error) {
      console.log('Wrong Credentials')
    }
  };

  const loginForm = () => {
    return (
      <form onSubmit={handleSubmitLogin}>
        <p>Username:
          <input type='text'
            onChange={handleUsernameInput}
          />
        </p>
        <p>Password:
          <input type='password'
            onChange={handlePasswordInput}
          />
        </p>
        <button type='submit'>Log In</button>
      </form>
    );
  };

  if (user === null) {
    return loginForm();
  } else {
    return (
      <div>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }
}

export default App
