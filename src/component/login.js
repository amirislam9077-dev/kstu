import React, { useState } from 'react';
import '../App.css';

export const pingPong = (signal = 'ping') => {
  return signal.toLowerCase() === 'ping' ? 'pong' : 'ping';
};

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '', remember: false });
  const [serverSignal, setServerSignal] = useState('ping');
  const [feedback, setFeedback] = useState('');

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const response = pingPong(serverSignal);
    setServerSignal(response);
    setFeedback(`Server says: ${response}`);
  };

  return (
    <section id="login" className="login-section">
      <div className="login-card">
        <h2 className="login-title">Sign in to your account</h2>
        <p className="login-subtitle">Enter your credentials to continue.</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-label" htmlFor="login-email">
            Email
            <input
              id="login-email"
              name="email"
              type="email"
              className="login-input"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </label>

          <label className="login-label" htmlFor="login-password">
            Password
            <input
              id="login-password"
              name="password"
              type="password"
              className="login-input"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </label>

          <label className="login-remember">
            <input
              name="remember"
              type="checkbox"
              checked={formData.remember}
              onChange={handleChange}
            />
            Remember me
          </label>

          <button type="submit" className="login-submit">
            Log In
          </button>
        </form>

        {feedback && <p className="login-feedback">{feedback}</p>}
      </div>
    </section>
  );
};

export default Login;
