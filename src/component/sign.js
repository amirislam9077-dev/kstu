import React, { useState } from 'react';

function SignIn() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign in logic here
    console.log('Sign in with email:', email);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
    setEmail('');
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.sign-in-container')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="sign-in-container">
      <button className="sign-in-btn" onClick={toggleDropdown}>
        Sign in
      </button>

      {isOpen && (
        <div className={`sign-in-dropdown ${isOpen ? 'open' : ''}`}>
          <div className="sign-in-form">
            <h2 className="sign-in-title">Sign in</h2>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="email-input"
                  required
                />
              </div>

              <div className="form-buttons">
                <button type="button" className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
                <button type="submit" className="continue-btn">
                  Continue
                </button>
              </div>
            </form>

            <div className="sign-in-footer">
              <button
                type="button"
                className="create-account-link"
                onClick={() => {
                  window.location.assign('/login');
                }}
              >
                New to Adnan Jilani? Create account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignIn;
