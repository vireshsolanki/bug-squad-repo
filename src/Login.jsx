import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // BUG #1: Hardcoded URL instead of using import.meta.env.VITE_API_URL
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
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          {/* BUG #2: type="password" instead of "password" */}
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
