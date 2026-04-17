import React, { useState } from 'react';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    if (!emailRegex.test(newEmail)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Authenticating with: http://localhost:8080/api/login");
    console.log("Data:", { email, password });
  };

  return (
    <div className="login-card">
      <h1 className="title">Welcome Back</h1>
      <p className="subtitle">Please enter your details to sign in</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input 
            id="email"
            type="email" 
            placeholder="name@company.com" 
            value={email}
            onChange={handleEmailChange}
          />
          {emailError && <div style={{color: 'red'}}>{emailError}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            id="password"
            type="password" 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <button type="submit" className="login-btn">
          Sign In
        </button>
      </form>
      
      <div className="footer">
        Don't have an account? <a href="#">Create account</a>
      </div>
    </div>
  );
};

export default Login;