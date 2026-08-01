import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';

export default function Login({ setCurrentPage, user, setUser, initialSignUp = false }) {
  const [isSignUp, setIsSignUp] = useState(initialSignUp);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    rememberMe: false,
    agreeTerms: false
  });
  const [successMsg, setSuccessMsg] = useState('');
  const [googleLoadError, setGoogleLoadError] = useState(false);

  useEffect(() => {
    if (window.google) {
      return;
    }

    const scriptId = 'google-gsi-client';
    let script = document.getElementById(scriptId);
    
    if (!script) {
      script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.id = scriptId;
      script.async = true;
      script.defer = true;
      script.onerror = () => {
        setGoogleLoadError(true);
        console.error('Google Identity Services script failed to load.');
      };
      document.body.appendChild(script);
    } else {
      const interval = setInterval(() => {
        if (window.google) {
          clearInterval(interval);
        }
      }, 100);
      
      const timeout = setTimeout(() => {
        clearInterval(interval);
        if (!window.google) {
          setGoogleLoadError(true);
        }
      }, 5000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      setSuccessMsg('Account created successfully! Welcome aboard.');
      setUser({ name: formData.name || 'New Investor', email: formData.email });
    } else {
      setSuccessMsg('Logged in successfully! Redirecting...');
      setUser({ name: 'Active Investor', email: formData.email });
    }
    setTimeout(() => {
      setSuccessMsg('');
      setCurrentPage('dashboard');
    }, 2000);
  };

  const handleGoogleAuth = () => {
    if (!window.google) {
      if (googleLoadError) {
        alert("Google Sign-In is blocked or failed to load. Please disable your ad-blocker or Brave Shields for this site, check your internet connection, and refresh the page.");
      } else {
        alert("Google Identity Services script is still loading. Please try again in a few seconds.");
      }
      return;
    }
    
    setSuccessMsg('Connecting to Google...');
    
    try {
      const tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: '19426202653-roidhljh0m1995e8h1ip5onok3ubvuo8.apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
        callback: async (tokenResponse) => {
          if (tokenResponse.error) {
            console.error('Google Auth Error:', tokenResponse.error);
            setSuccessMsg('');
            alert('Google authentication failed: ' + tokenResponse.error);
            return;
          }
          
          if (tokenResponse.access_token) {
            setSuccessMsg(isSignUp ? 'Verifying account with backend...' : 'Verifying login with backend...');
            try {
              const res = await fetch('http://127.0.0.1:5000/api/auth/google', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: tokenResponse.access_token }),
              });
              
              if (!res.ok) {
                throw new Error('Failed to verify token with backend');
              }
              
              const data = await res.json();
              
              // Set the user in the parent component and store session
              localStorage.setItem('user', JSON.stringify(data.user));
              localStorage.setItem('token', data.token);
              setUser(data.user);
              
              setSuccessMsg(isSignUp ? 'Signed up with Google successfully!' : 'Logged in with Google successfully!');
              setTimeout(() => {
                setSuccessMsg('');
                setCurrentPage('dashboard');
              }, 1500);
            } catch (err) {
              console.error(err);
              setSuccessMsg('');
              alert('Error during backend verification: ' + err.message);
            }
          }
        },
      });
      
      tokenClient.requestAccessToken();
    } catch (err) {
      console.error('Google Sign-In initialization error:', err);
      setSuccessMsg('');
      alert('Could not initialize Google Sign-in: ' + err.message);
    }
  };


  return (
    <div className="min-h-screen bg-white flex flex-col justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
        
        {/* Left Side: Dark Panel (Branding) */}
        <div 
          style={{ backgroundColor: '#0f172a', padding: '64px' }} 
          className="hidden lg:flex lg:col-span-5 flex-col justify-between text-white relative overflow-hidden"
        >
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
          
          {/* Top Logo */}
          <button
            type="button"
            className="flex items-center space-x-2 relative z-10 cursor-pointer bg-transparent border-none p-0 focus:outline-none"
            onClick={() => setCurrentPage('home')}
            aria-label="Go to home page"
          >
            <img src={logo} alt="Capital Life Logo" className="h-10 w-auto object-contain bg-white p-1.5 rounded-lg" />
          </button>

          {/* Center Content based on View */}
          <div className="space-y-8 relative z-10 my-auto text-left">
            {!isSignUp ? (
              // Login View - Left Content
              <div className="space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#dafd44]">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h2 className="text-4xl font-black text-white leading-tight">
                  Experience <br />
                  <span className="text-[#dafd44]">Financial Excellence</span>
                </h2>
                <p className="text-slate-350 text-sm leading-relaxed max-w-sm">
                  Navigate the markets with institutional-grade algorithms and professional human insight.
                </p>
                
                {/* Mock Avatars */}
                <div className="flex items-center space-x-3 pt-4">
                  <div className="flex -space-x-2">
                    <img className="w-8 h-8 rounded-full border-2 border-[#0f172a] object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="user" />
                    <img className="w-8 h-8 rounded-full border-2 border-[#0f172a] object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="user" />
                    <img className="w-8 h-8 rounded-full border-2 border-[#0f172a] object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="user" />
                  </div>
                  <span className="text-xs font-semibold text-slate-300">Join 50k+ active investors</span>
                </div>
              </div>
            ) : (
              // Signup View - Left Content
              <div className="space-y-8">
                <h2 className="text-4xl font-black text-white leading-tight">
                  Join 1 Million+ <br />
                  <span className="text-[#dafd44]">Investors</span>
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
                  Empower your financial journey with India's leading algorithmic trading advisory.
                </p>

                {/* Features List */}
                <div className="space-y-6 pt-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[#dafd44] flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Expert Insights</h4>
                      <p className="text-xs text-slate-300 mt-0.5">Daily research from SEBI registered analysts.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[#dafd44] flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Real-time Alerts</h4>
                      <p className="text-xs text-slate-300 mt-0.5">Never miss a breakout with instant notifications.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[#dafd44] flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Secure Trading</h4>
                      <p className="text-xs text-slate-300 mt-0.5">Bank-grade security for your data and transactions.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Copyright */}
          <div className="text-xs text-slate-400 relative z-10 text-left">
            © {new Date().getFullYear()} Capital Life Financial Advisory. All rights reserved.
          </div>
        </div>

        {/* Right Side: White Panel (Auth Form) */}
        <div className="lg:col-span-7 flex flex-col justify-center px-6 sm:px-16 lg:px-24 py-12 bg-white relative">
          
          {/* Back button for mobile */}
          <button
            type="button"
            className="absolute top-6 left-6 lg:hidden flex items-center space-x-2 text-slate-700 cursor-pointer bg-transparent border-none p-0 focus:outline-none"
            onClick={() => setCurrentPage('home')}
            aria-label="Go back to home page"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-sm font-semibold">Home</span>
          </button>

          <div className="max-w-md w-full mx-auto space-y-8 text-left">
            
            {successMsg && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-xs font-semibold text-center animate-pulse">
                {successMsg}
              </div>
            )}

            {!isSignUp ? (
              // ==================== LOGIN VIEW ====================
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Welcome Back</h3>
                  <p className="text-xs text-slate-650 mt-1.5">Log in to your Capital Life dashboard.</p>
                </div>

                {/* Google OAuth Option */}
                <button
                  type="button"
                  onClick={handleGoogleAuth}
                  className="w-full flex items-center justify-center space-x-3 px-4 py-3 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-50 transition cursor-pointer"
                >
                  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                    <g transform="matrix(1, 0, 0, 1, 0, 0)">
                      <path d="M21.35,11.1H12v2.7h5.38C17,14.93,15.82,15.9,12,15.9c-3.15,0-5.71-2.43-5.71-5.4s2.56-5.4,5.71-5.4c1.78,0,3,0.76,3.68,1.4L17.8,4.38C16.48,3.15,14.47,2.4,12,2.4,7.14,2.4,3.2,6.17,3.2,10.8s3.94,8.4,8.8,8.4c5.07,0,8.4-3.46,8.4-8.3A7.54,7.54,0,0,0,21.35,11.1Z" fill="#4285F4"/>
                    </g>
                  </svg>
                  <span>Sign in with Google</span>
                </button>

                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-slate-200"></div>
                  <span className="flex-shrink mx-4 text-[10px] text-slate-450 font-extrabold uppercase tracking-widest">or email</span>
                  <div className="flex-grow border-t border-slate-200"></div>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {/* Email Address */}
                  <div>
                    <label htmlFor="loginEmail" className="block text-[10px] font-extrabold text-slate-900 uppercase tracking-wider mb-2">Email Address</label>
                    <div className="relative">
                      <input 
                        id="loginEmail"
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="name@company.com" 
                        className="w-full bg-white border border-slate-300 rounded-xl pl-4 pr-10 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#25a544]"
                        autoComplete="email"
                      />
                      <span className="absolute inset-y-0 right-3 flex items-center text-slate-900 text-xs font-bold">@</span>
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label htmlFor="loginPassword" className="block text-[10px] font-extrabold text-slate-900 uppercase tracking-wider">Password</label>
                      <button 
                        type="button"
                        onClick={() => alert("Password reset link will be sent to your email.")}
                        className="text-[10px] font-black text-[#25a544] hover:underline cursor-pointer bg-transparent border-none p-0"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <input 
                        id="loginPassword"
                        type={showPassword ? 'text' : 'password'} 
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        placeholder="••••••••" 
                        className="w-full bg-white border border-slate-300 rounded-xl pl-4 pr-10 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#25a544]"
                        autoComplete="current-password"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember me */}
                  <div className="flex items-center space-x-2 py-1">
                    <input 
                      type="checkbox" 
                      id="rememberMe"
                      checked={formData.rememberMe}
                      onChange={(e) => setFormData({...formData, rememberMe: e.target.checked})}
                      className="h-4 w-4 rounded border-slate-300 text-[#25a544] focus:ring-[#25a544]"
                    />
                    <label htmlFor="rememberMe" className="text-[11px] font-bold text-slate-800 cursor-pointer select-none">
                      Remember me for 30 days
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    style={{ backgroundColor: '#dafd44', color: '#020617' }}
                    className="w-full py-3.5 hover:opacity-90 font-black rounded-xl text-xs uppercase tracking-wider transition duration-200 cursor-pointer shadow-sm border border-transparent flex items-center justify-center space-x-2"
                  >
                    <span>Login</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </form>

                <div className="text-center text-xs pt-4 border-t border-slate-200">
                  <span className="text-slate-600 font-medium">Don't have an account? </span>
                  <button 
                    type="button"
                    onClick={() => { setIsSignUp(true); setSuccessMsg(''); }}
                    className="font-black text-[#25a544] hover:underline cursor-pointer bg-transparent border-none p-0 focus:outline-none"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            ) : (
              // ==================== SIGNUP VIEW ====================
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Create your account</h3>
                  <p className="text-xs text-slate-650 mt-1.5">Start your 14-day free trial today.</p>
                </div>

                {/* Google OAuth Option */}
                <button
                  type="button"
                  onClick={handleGoogleAuth}
                  className="w-full flex items-center justify-center space-x-3 px-4 py-3 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-50 transition cursor-pointer"
                >
                  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                    <g transform="matrix(1, 0, 0, 1, 0, 0)">
                      <path d="M21.35,11.1H12v2.7h5.38C17,14.93,15.82,15.9,12,15.9c-3.15,0-5.71-2.43-5.71-5.4s2.56-5.4,5.71-5.4c1.78,0,3,0.76,3.68,1.4L17.8,4.38C16.48,3.15,14.47,2.4,12,2.4,7.14,2.4,3.2,6.17,3.2,10.8s3.94,8.4,8.8,8.4c5.07,0,8.4-3.46,8.4-8.3A7.54,7.54,0,0,0,21.35,11.1Z" fill="#4285F4"/>
                    </g>
                  </svg>
                  <span>Sign up with Google</span>
                </button>

                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-slate-200"></div>
                  <span className="flex-shrink mx-4 text-[10px] text-slate-450 font-extrabold uppercase tracking-widest">or details</span>
                  <div className="flex-grow border-t border-slate-200"></div>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="signupFullName" className="block text-[10px] font-extrabold text-slate-900 uppercase tracking-wider mb-1.5">Full Name</label>
                    <input 
                      id="signupFullName"
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="John Doe" 
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#25a544]"
                      autoComplete="name"
                    />
                  </div>

                  {/* Email Address */}
                  <div>
                    <label htmlFor="signupEmail" className="block text-[10px] font-extrabold text-slate-900 uppercase tracking-wider mb-1.5">Email Address</label>
                    <input 
                      id="signupEmail"
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="john@example.com" 
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#25a544]"
                      autoComplete="email"
                    />
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label htmlFor="signupPhone" className="block text-[10px] font-extrabold text-slate-900 uppercase tracking-wider mb-1.5">Mobile Number</label>
                    <div className="flex space-x-2">
                      <div className="w-20 bg-slate-50 border border-slate-300 rounded-xl flex items-center justify-center text-xs font-bold text-slate-700 select-none">
                        +91
                      </div>
                      <input 
                        id="signupPhone"
                        type="tel" 
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="9876543210" 
                        className="flex-grow bg-white border border-slate-300 rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#25a544]"
                        autoComplete="tel"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label htmlFor="signupPassword" className="block text-[10px] font-extrabold text-slate-900 uppercase tracking-wider mb-1.5">Password</label>
                    <input 
                      id="signupPassword"
                      type="password" 
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      placeholder="Min. 8 characters" 
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#25a544]"
                      autoComplete="new-password"
                    />
                  </div>

                  {/* Accept Terms */}
                  <div className="flex items-start space-x-2 py-1">
                    <input 
                      type="checkbox" 
                      id="agreeTerms"
                      required
                      checked={formData.agreeTerms}
                      onChange={(e) => setFormData({...formData, agreeTerms: e.target.checked})}
                      className="h-4 w-4 mt-0.5 rounded border-slate-300 text-[#25a544] focus:ring-[#25a544]"
                    />
                    <label htmlFor="agreeTerms" className="text-[11px] font-bold text-slate-600 leading-normal select-none">
                      I agree to the <button type="button" onClick={() => alert("Terms of Service will be available soon.")} className="text-[#25a544] hover:underline cursor-pointer bg-transparent border-none p-0">Terms of Service</button> and <button type="button" onClick={() => alert("Privacy Policy will be available soon.")} className="text-[#25a544] hover:underline cursor-pointer bg-transparent border-none p-0">Privacy Policy</button>.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    style={{ backgroundColor: '#dafd44', color: '#020617' }}
                    className="w-full py-3.5 hover:opacity-90 font-black rounded-xl text-xs uppercase tracking-wider transition duration-200 cursor-pointer shadow-sm border border-transparent"
                  >
                    Create Account
                  </button>
                </form>

                <div className="text-center text-xs pt-4 border-t border-slate-200">
                  <span className="text-slate-600 font-medium">Already have an account? </span>
                  <button 
                    type="button"
                    onClick={() => { setIsSignUp(false); setSuccessMsg(''); }}
                    className="font-black text-[#25a544] hover:underline cursor-pointer bg-transparent border-none p-0 focus:outline-none"
                  >
                    Login
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
