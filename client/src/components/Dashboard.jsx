import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import advisorClient from '../assets/advisor-client.png';
import qr from '../assets/qr.png';
import customerSupport from '../assets/customer-support.png';

export default function Dashboard({ setCurrentPage, user, setUser, initialTab = 'risk', setInitialTab }) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'risk', 'kyc', 'services', 'upload', 'payment', 'history', 'support'
  
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  useEffect(() => {
    if (setInitialTab) {
      setInitialTab(activeTab);
    }
  }, [activeTab, setInitialTab]);
  
  // File Upload states
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadingFileName, setUploadingFileName] = useState('');

  // Copy Clipboard State
  const [copiedField, setCopiedField] = useState('');

  // Support Form states
  const [supportTab, setSupportTab] = useState('new'); // 'new', 'history'
  const [supportData, setSupportData] = useState({
    category: '',
    message: ''
  });
  const [supportSubmitted, setSupportSubmitted] = useState(false);
  const [showSupportCallback, setShowSupportCallback] = useState(false);
  const [supportCallbackPhone, setSupportCallbackPhone] = useState('');
  const [supportCallbackSubmitted, setSupportCallbackSubmitted] = useState(false);

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    if (supportData.category && supportData.message) {
      setSupportSubmitted(true);
      setTimeout(() => {
        setSupportSubmitted(false);
        setSupportData({ category: '', message: '' });
      }, 5000);
    }
  };

  const handleSupportCallbackSubmit = (e) => {
    e.preventDefault();
    if (supportCallbackPhone) {
      setSupportCallbackSubmitted(true);
      setTimeout(() => {
        setShowSupportCallback(false);
        setSupportCallbackSubmitted(false);
        setSupportCallbackPhone('');
      }, 3000);
    }
  };

  // KYC Form states
  const [kycData, setKycData] = useState({
    pan: '',
    mobile: '',
    dob: ''
  });
  const [kycSuccessMsg, setKycSuccessMsg] = useState('');

  // Risk assessment states
  const [formData, setFormData] = useState({
    dob: '',
    occupation: '',
    goals: '',
    income: '',
    expense: '',
    assets: '',
    dependents: '',
    scenario: '',
    experience: '',
    awareness: ''
  });
  const [completedPercent, setCompletedPercent] = useState(0);
  const [isDobValid, setIsDobValid] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [riskProfile, setRiskProfile] = useState('');

  // Payment Details
  const paymentDetails = {
    bankName: 'Indian Overseas Bank',
    accountName: 'CAPITAL LIFE RESEARCH',
    accountNumber: '150502000001245',
    ifscCode: 'IOBA0001505',
    branch: '-',
    upiId: 'rajivylrsharma89-3@oksbi'
  };

  // Clipboard Helper
  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(fieldName);
      setTimeout(() => {
        setCopiedField('');
      }, 1500);
    });
  };

  // Risk profile completion logic
  useEffect(() => {
    let filledFields = 0;
    const totalFields = 10;
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== '') {
        if (key === 'dob') {
          const age = calculateAge(formData.dob);
          if (age >= 18) filledFields++;
        } else {
          filledFields++;
        }
      }
    });
    setCompletedPercent(Math.round((filledFields / totalFields) * 100));
  }, [formData]);

  const calculateAge = (dobString) => {
    if (!dobString) return 0;
    const today = new Date();
    const birthDate = new Date(dobString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleDobChange = (e) => {
    const val = e.target.value;
    setFormData({ ...formData, dob: val });
    if (val) {
      const age = calculateAge(val);
      setIsDobValid(age >= 18);
    } else {
      setIsDobValid(true);
    }
  };

  const calculateRiskScore = () => {
    let score = 0;
    const age = calculateAge(formData.dob);
    if (age < 35) score += 3;
    else if (age < 50) score += 2;
    else score += 1;

    if (formData.dependents === '0') score += 3;
    else if (formData.dependents === '1 or 2') score += 2;
    else score += 1;

    if (formData.scenario === 'Buy more at lower levels') score += 4;
    else if (formData.scenario === 'Will Hold all Shares') score += 3;
    else if (formData.scenario === 'Sell Some Share and Hold Remaining') score += 2;
    else score += 1;

    if (formData.experience === 'More than 5 Years') score += 4;
    else if (formData.experience === '3–5 Years') score += 3;
    else if (formData.experience === '1–3 Years') score += 2;
    else score += 1;

    if (formData.awareness === 'I check business/finance news and updates daily') score += 4;
    else if (formData.awareness === 'I check business/finance news and updates oftenly') score += 3;
    else if (formData.awareness === 'I check business/finance news and updates rarely') score += 2;
    else score += 1;

    if (score >= 15) return 'Aggressive Growth';
    if (score >= 10) return 'Moderate Balancer';
    return 'Conservative Capital';
  };

  const handleRiskSubmit = (e) => {
    e.preventDefault();
    if (completedPercent === 100 && isDobValid) {
      setRiskProfile(calculateRiskScore());
      setShowResult(true);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const resetForm = () => {
    setFormData({
      dob: '',
      occupation: '',
      goals: '',
      income: '',
      expense: '',
      assets: '',
      dependents: '',
      scenario: '',
      experience: '',
      awareness: ''
    });
    setShowResult(false);
    setRiskProfile('');
  };

  // File Upload Logic
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    simulateUpload(files[0]);
  };

  const simulateUpload = (file) => {
    setUploadingFileName(file.name);
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadedFiles((current) => [
            ...current,
            { name: file.name, size: (file.size / (1024 * 1024)).toFixed(2) + ' MB' }
          ]);
          return 100;
        }
        return prev + 10;
      });
    }, 120);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length === 0) return;
    simulateUpload(files[0]);
  };

  const handleFileDelete = (fileName) => {
    setUploadedFiles((current) => current.filter((f) => f.name !== fileName));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      
      {/* 1. LEFT SIDEBAR */}
      <aside 
        style={{ backgroundColor: '#0f172a', height: '100vh', position: 'sticky', top: 0 }} 
        className="w-64 flex flex-col justify-between p-6 text-white border-r border-slate-800 flex-shrink-0"
      >
        <div className="space-y-8">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <img src={logo} alt="Capital Life Logo" className="h-10 w-auto object-contain bg-white p-1.5 rounded-lg" />
          </div>

          <div className="h-px bg-slate-800"></div>

          {/* Navigation Links - Tabbed Navigation */}
          <nav className="space-y-1.5 text-left">
            <button
              onClick={() => setActiveTab('risk')}
              style={{ 
                backgroundColor: activeTab === 'risk' ? '#dafd44' : 'transparent', 
                color: activeTab === 'risk' ? '#020617' : '#cbd5e1' 
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold transition cursor-pointer hover:bg-white/5 border border-transparent ${
                activeTab === 'risk' ? 'shadow-sm font-black' : ''
              }`}
            >
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Risk Assessment</span>
            </button>

            <button
              onClick={() => setActiveTab('kyc')}
              style={{ 
                backgroundColor: activeTab === 'kyc' ? '#dafd44' : 'transparent', 
                color: activeTab === 'kyc' ? '#020617' : '#cbd5e1' 
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold transition cursor-pointer hover:bg-white/5 border border-transparent ${
                activeTab === 'kyc' ? 'shadow-sm font-black' : ''
              }`}
            >
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Complete KYC</span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              style={{ 
                backgroundColor: activeTab === 'services' ? '#dafd44' : 'transparent', 
                color: activeTab === 'services' ? '#020617' : '#cbd5e1' 
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold transition cursor-pointer hover:bg-white/5 border border-transparent ${
                activeTab === 'services' ? 'shadow-sm font-black' : ''
              }`}
            >
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <span>My Services</span>
            </button>

            <button
              onClick={() => setActiveTab('upload')}
              style={{ 
                backgroundColor: activeTab === 'upload' ? '#dafd44' : 'transparent', 
                color: activeTab === 'upload' ? '#020617' : '#cbd5e1' 
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold transition cursor-pointer hover:bg-white/5 border border-transparent ${
                activeTab === 'upload' ? 'shadow-sm font-black' : ''
              }`}
            >
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <span>Upload Documents</span>
            </button>

            <button
              onClick={() => setActiveTab('payment')}
              style={{ 
                backgroundColor: activeTab === 'payment' ? '#dafd44' : 'transparent', 
                color: activeTab === 'payment' ? '#020617' : '#cbd5e1' 
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold transition cursor-pointer hover:bg-white/5 border border-transparent ${
                activeTab === 'payment' ? 'shadow-sm font-black' : ''
              }`}
            >
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span>Make Payment</span>
            </button>

            <button
              onClick={() => setActiveTab('history')}
              style={{ 
                backgroundColor: activeTab === 'history' ? '#dafd44' : 'transparent', 
                color: activeTab === 'history' ? '#020617' : '#cbd5e1' 
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold transition cursor-pointer hover:bg-white/5 border border-transparent ${
                activeTab === 'history' ? 'shadow-sm font-black' : ''
              }`}
            >
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              <span>Payment History</span>
            </button>

            <button
              onClick={() => setActiveTab('support')}
              style={{ 
                backgroundColor: activeTab === 'support' ? '#dafd44' : 'transparent', 
                color: activeTab === 'support' ? '#020617' : '#cbd5e1' 
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold transition cursor-pointer hover:bg-white/5 border border-transparent ${
                activeTab === 'support' ? 'shadow-sm font-black' : ''
              }`}
            >
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span>Support Desk</span>
            </button>
          </nav>
        </div>

        {/* Bottom User Area */}
        <div className="space-y-4">
          <div className="h-px bg-slate-800"></div>

          {/* Home Page Link */}
          <button
            onClick={() => setCurrentPage('home')}
            className="w-full flex items-center justify-center space-x-2.5 py-3 bg-white/5 hover:bg-[#dafd44]/15 hover:text-[#dafd44] text-slate-300 border border-slate-800 hover:border-[#dafd44]/30 rounded-xl text-[10px] font-black uppercase tracking-wider transition cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Home Page</span>
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-[#dafd44] text-[#020617] flex items-center justify-center font-black text-sm">
              {user?.name ? user.name[0].toUpperCase() : 'U'}
            </div>
            <div className="text-left truncate flex-1">
              <p className="text-xs font-bold text-white truncate">{user?.name || 'Active User'}</p>
              <p className="text-[10px] text-slate-400 truncate">{user?.email || 'user@email.com'}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 py-2.5 bg-white/5 hover:bg-red-950/20 text-slate-350 hover:text-red-400 border border-slate-800 hover:border-red-900 rounded-xl text-[10px] font-bold uppercase tracking-wider transition cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-6 0v-1m6-12V5a3 3 0 00-6 0v1" />
            </svg>
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN WORKSPACE */}
      <main className="flex-grow p-8 overflow-y-auto">
        
        {/* ================= TAB 1: RISK ASSESSMENT ================= */}
        {activeTab === 'risk' && (
          <div className="space-y-8 text-left animate-in fade-in duration-200">
            
            {showResult ? (
              // ================= PERSONALIZED RISK PLAN RESULT SCREEN =================
              <div 
                style={{ borderRadius: '24px' }}
                className="bg-white border border-slate-200 p-8 md:p-12 shadow-md max-w-3xl space-y-8"
              >
                <div className="flex justify-between items-center border-b border-slate-100 pb-6">
                  <div>
                    <span className="text-[10px] font-extrabold text-[#25a544] uppercase tracking-widest block">PERSONALIZED PLAN GENERATED</span>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">Your Portfolio Strategy</h2>
                  </div>
                  <span className="text-xs font-semibold text-slate-400">SEBI Compliant Analysis</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">IDENTIFIED RISK PROFILE</span>
                    <div className="inline-flex items-center px-4 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100 font-extrabold text-lg">
                      🎯 {riskProfile}
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Based on your age, direct dependencies, liquid asset volume, and behavioral response to a 25% market drawdown, your risk capacity is aligned for target wealth preservation with optimized growth overlays.
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Suggested Asset Allocation</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-[11px] font-bold text-slate-700 mb-1">
                          <span>Equities (Large & Mid-Cap)</span>
                          <span>{riskProfile === 'Aggressive Growth' ? '70%' : riskProfile === 'Moderate Balancer' ? '50%' : '30%'}</span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            style={{ width: riskProfile === 'Aggressive Growth' ? '70%' : riskProfile === 'Moderate Balancer' ? '50%' : '30%', backgroundColor: '#25a544' }} 
                            className="h-full rounded-full"
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[11px] font-bold text-slate-700 mb-1">
                          <span>Mutual Funds & Debt Instruments</span>
                          <span>{riskProfile === 'Aggressive Growth' ? '15%' : riskProfile === 'Moderate Balancer' ? '30%' : '50%'}</span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            style={{ width: riskProfile === 'Aggressive Growth' ? '15%' : riskProfile === 'Moderate Balancer' ? '30%' : '50%', backgroundColor: '#020617' }} 
                            className="h-full rounded-full"
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[11px] font-bold text-slate-700 mb-1">
                          <span>Gold & Sovereign Bonds</span>
                          <span>{riskProfile === 'Aggressive Growth' ? '10%' : riskProfile === 'Moderate Balancer' ? '15%' : '15%'}</span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            style={{ width: riskProfile === 'Aggressive Growth' ? '10%' : riskProfile === 'Moderate Balancer' ? '15%' : '15%', backgroundColor: '#dafd44' }} 
                            className="h-full rounded-full"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex justify-end gap-4">
                  <button
                    onClick={resetForm}
                    style={{ backgroundColor: '#dafd44', color: '#020617' }}
                    className="px-8 py-3.5 hover:opacity-90 font-black rounded-xl text-xs uppercase tracking-wider transition cursor-pointer shadow-md"
                  >
                    Re-take Assessment
                  </button>
                </div>
              </div>
            ) : (
              // ================= QUESTIONNAIRE SPLIT VIEW =================
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-start">
                
                {/* Left Column: Onboarding Info Panel */}
                <div className="xl:col-span-4 space-y-6 text-left">
                  <span className="inline-flex items-center px-3 py-1 rounded-md text-[9px] font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-100">
                    Onboarding
                  </span>
                  
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                    Let's quickly check if our service is right fit for you
                  </h1>
                  
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    Answer a few questions to generate a personalized investment plan that aligns with your financial goals.
                  </p>

                  <div className="h-px bg-slate-200 my-6"></div>

                  {/* Checklist details */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-slate-700">
                      <svg className="w-5 h-5 text-[#25a544] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-xs font-bold">Takes under 2 minutes</span>
                    </div>
                    <div className="flex items-center space-x-3 text-slate-700">
                      <svg className="w-5 h-5 text-[#25a544] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span className="text-xs font-bold">100% Confidential</span>
                    </div>
                    <div className="flex items-center space-x-3 text-slate-700">
                      <svg className="w-5 h-5 text-[#25a544] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span className="text-xs font-bold">SEBI Registration No. INH000022163</span>
                    </div>
                  </div>

                  {/* Bottom Image Panel */}
                  <div 
                    style={{ borderRadius: '24px', overflow: 'hidden' }}
                    className="border border-slate-200 shadow-sm relative bg-white"
                  >
                    <img 
                      src={advisorClient} 
                      alt="Capital Life Onboarding Consultation" 
                      className="w-full h-48 object-cover" 
                    />
                  </div>

                </div>

                {/* Right Section: Form Card */}
                <div className="xl:col-span-8">
                  <form 
                    onSubmit={handleRiskSubmit}
                    style={{ borderRadius: '24px', padding: '32px' }}
                    className="bg-white border border-slate-200 shadow-md text-left space-y-6"
                  >
                    
                    {/* Risk Profile Title Bar */}
                    <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                      <span className="text-sm font-black text-slate-900">Assessment Questionnaire</span>
                      <span className="text-xs font-mono font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded">
                        {completedPercent}% completed
                      </span>
                    </div>

                    {/* Progress bar indicator */}
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden -mt-4">
                      <div 
                        style={{ width: `${completedPercent}%`, transition: 'width 0.4s ease' }} 
                        className="h-full bg-[#25a544] rounded-full"
                      ></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Q1. Date of Birth */}
                      <div>
                        <label className="block text-[9px] font-extrabold text-slate-900 uppercase tracking-wider mb-1.5">Date of Birth</label>
                        <input 
                          type="date"
                          required
                          value={formData.dob}
                          onChange={handleDobChange}
                          className={`w-full bg-white border ${!isDobValid ? 'border-red-450' : 'border-slate-300'} rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#25a544]`}
                        />
                        {!isDobValid && (
                          <span className="block text-[9px] text-red-500 font-bold mt-1">
                            Minimum age 18 years required
                          </span>
                        )}
                      </div>

                      {/* Q2. Occupation */}
                      <div>
                        <label className="block text-[9px] font-extrabold text-slate-900 uppercase tracking-wider mb-1.5">Occupation</label>
                        <select
                          required
                          value={formData.occupation}
                          onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#25a544]"
                        >
                          <option value="">- Select -</option>
                          <option value="Salaried">Salaried</option>
                          <option value="Self-Employed">Self-Employed</option>
                          <option value="Business Owner">Business Owner</option>
                          <option value="Professional">Professional</option>
                          <option value="Retired">Retired</option>
                          <option value="Student">Student</option>
                        </select>
                      </div>

                      {/* Q3. Investment Goals */}
                      <div>
                        <label className="block text-[9px] font-extrabold text-slate-900 uppercase tracking-wider mb-1.5">Investment Goals</label>
                        <select
                          required
                          value={formData.goals}
                          onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#25a544]"
                        >
                          <option value="">- Select -</option>
                          <option value="Capital Appreciation">Capital Appreciation</option>
                          <option value="Regular Income">Regular Income</option>
                          <option value="Wealth Preservation">Wealth Preservation</option>
                          <option value="Speculative Trading">Speculative Trading</option>
                        </select>
                      </div>

                      {/* Q4. Monthly Income */}
                      <div>
                        <label className="block text-[9px] font-extrabold text-slate-900 uppercase tracking-wider mb-1.5">Monthly Income</label>
                        <input 
                          type="number"
                          required
                          value={formData.income}
                          onChange={(e) => setFormData({ ...formData, income: e.target.value })}
                          placeholder="Enter Amount"
                          className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#25a544]"
                        />
                      </div>
                    </div>

                    {/* Q5. Monthly Expense percentage */}
                    <div className="space-y-2">
                      <label className="block text-[9px] font-extrabold text-slate-900 uppercase tracking-wider">Monthly Expense (% of Income)</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {['0-20%', '20-50%', '50-80%', 'More than 80%'].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setFormData({ ...formData, expense: opt })}
                            className={`py-2 px-1 border text-center text-xs font-bold rounded-lg transition cursor-pointer select-none ${
                              formData.expense === opt 
                                ? 'bg-[#dafd44]/10 border-[#25a544] text-slate-900' 
                                : 'border-slate-300 bg-white text-slate-650 hover:bg-slate-50'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Q6. Liquid Assets */}
                    <div className="space-y-2">
                      <label className="block text-[9px] font-extrabold text-slate-900 uppercase tracking-wider">Liquid Assets (Bank+Stocks+MF+Gold)</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {['2 - 5 Lacs', '5 - 10 Lacs', '10 - 50 Lacs', 'More than 50 Lacs'].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setFormData({ ...formData, assets: opt })}
                            className={`py-2 px-1 border text-center text-xs font-bold rounded-lg transition cursor-pointer select-none ${
                              formData.assets === opt 
                                ? 'bg-[#dafd44]/10 border-[#25a544] text-slate-900' 
                                : 'border-slate-300 bg-white text-slate-650 hover:bg-slate-50'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Q7. Direct Dependents */}
                    <div className="space-y-2">
                      <label className="block text-[9px] font-extrabold text-slate-900 uppercase tracking-wider">Number of direct dependents</label>
                      <div className="grid grid-cols-4 gap-2">
                        {['0', '1 or 2', '3 or 4', '5 or above'].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setFormData({ ...formData, dependents: opt })}
                            className={`py-2 px-1 border text-center text-xs font-bold rounded-lg transition cursor-pointer select-none ${
                              formData.dependents === opt 
                                ? 'bg-[#dafd44]/10 border-[#25a544] text-slate-900' 
                                : 'border-slate-300 bg-white text-slate-650 hover:bg-slate-50'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Q8. Scenario Question */}
                    <div className="space-y-3">
                      <label className="block text-xs font-bold text-slate-800 leading-normal">
                        The Stock Market has fallen by 25% and your share value has dipped by 25% as well, but the market expects it to recover. What would you do?
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          'Book Loss and Exit',
                          'Sell Some Share and Hold Remaining',
                          'Will Hold all Shares',
                          'Buy more at lower levels'
                        ].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setFormData({ ...formData, scenario: opt })}
                            style={{ padding: '12px' }}
                            className={`border text-left text-xs font-bold rounded-xl transition cursor-pointer select-none flex items-center space-x-2 ${
                              formData.scenario === opt 
                                ? 'bg-[#dafd44]/10 border-[#25a544] text-slate-900' 
                                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center flex-shrink-0 ${formData.scenario === opt ? 'border-[#25a544]' : 'border-slate-400'}`}>
                              {formData.scenario === opt && <span className="w-2 h-2 rounded-full bg-[#25a544]"></span>}
                            </span>
                            <span>{opt}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Q9. Experience */}
                    <div className="space-y-2">
                      <label className="block text-[9px] font-extrabold text-slate-900 uppercase tracking-wider">Trading Experience</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {['Less than 1 Year', '1–3 Years', '3–5 Years', 'More than 5 Years'].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setFormData({ ...formData, experience: opt })}
                            className={`py-2 px-1 border text-center text-xs font-bold rounded-lg transition cursor-pointer select-none ${
                              formData.experience === opt 
                                ? 'bg-[#dafd44]/10 border-[#25a544] text-slate-900' 
                                : 'border-slate-300 bg-white text-slate-650 hover:bg-slate-50'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Q10. Awareness */}
                    <div className="space-y-3">
                      <label className="block text-[9px] font-extrabold text-slate-900 uppercase tracking-wider">Awareness about Finance</label>
                      <div className="grid grid-cols-1 gap-2">
                        {[
                          'I check business/finance news and updates daily',
                          'I check business/finance news and updates oftenly',
                          'I check business/finance news and updates rarely',
                          'I never read or watch the business/finance news and updates'
                        ].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setFormData({ ...formData, awareness: opt })}
                            className={`px-4 py-2.5 border text-left text-xs font-semibold rounded-lg transition cursor-pointer select-none flex items-center space-x-2 ${
                              formData.awareness === opt 
                                ? 'bg-[#dafd44]/10 border-[#25a544] text-slate-900' 
                                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center flex-shrink-0 ${formData.awareness === opt ? 'border-[#25a544]' : 'border-slate-400'}`}>
                              {formData.awareness === opt && <span className="w-2.5 h-2.5 rounded-full bg-[#25a544]"></span>}
                            </span>
                            <span>{opt}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Secured Message and Submit Bar */}
                    <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                      <div className="flex items-center space-x-2 text-slate-450">
                        <svg className="w-4.5 h-4.5 text-[#25a544] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span className="text-[11px] font-bold text-slate-500">Your data is secured using 256-bit AES encryption.</span>
                      </div>
                      <button
                        type="submit"
                        disabled={completedPercent < 100 || !isDobValid}
                        style={{ 
                          backgroundColor: completedPercent === 100 && isDobValid ? '#dafd44' : '#f1f5f9', 
                          color: completedPercent === 100 && isDobValid ? '#020617' : '#94a3b8' 
                        }}
                        className={`px-10 py-4 font-black rounded-xl text-xs uppercase tracking-wider transition duration-200 border border-transparent shadow-sm flex items-center justify-center space-x-2 ${
                          completedPercent === 100 && isDobValid ? 'cursor-pointer hover:opacity-90' : 'cursor-not-allowed'
                        }`}
                      >
                        <span>Submit Profile</span>
                      </button>
                    </div>

                  </form>
                </div>

              </div>
            )}

          </div>
        )}

        {/* ================= TAB: MY SERVICES ================= */}
        {activeTab === 'services' && (
          <div className="space-y-8 text-left animate-in fade-in duration-200">
            {/* Header Title */}
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-2xl flex-shrink-0">
                <svg className="w-8 h-8 text-emerald-855" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div className="space-y-1">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">My Services</h1>
                <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed">
                  Access your subscribed advisory plans and explorer tools.
                </p>
              </div>
            </div>

            {/* Clean Centered Card for Empty State */}
            <div 
              style={{ borderRadius: '24px' }} 
              className="bg-white border border-slate-200 p-12 shadow-sm text-center flex flex-col items-center justify-center space-y-6 max-w-2xl mx-auto my-12"
            >
              {/* Empty State Icon */}
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <svg className="w-8 h-8.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <h2 className="text-xl font-black text-slate-900">No Services Yet</h2>
                <p className="text-xs sm:text-sm text-slate-500 font-semibold">
                  You are not currently subscribed to any wealth research or advisory plans.
                </p>
              </div>

              {/* Red KYC Alert Notice */}
              <div 
                style={{ backgroundColor: '#fef2f2', borderColor: '#fecaca', borderRadius: '16px' }}
                className="border p-4 text-center max-w-md"
              >
                <p className="text-xs sm:text-sm font-black text-red-600 tracking-wide uppercase">
                  To take service just complete your KYC FIRST
                </p>
              </div>

              {/* Redirect Button */}
              <button
                onClick={() => setActiveTab('kyc')}
                style={{ backgroundColor: '#0f172a', color: '#dafd44' }}
                className="px-8 py-3.5 hover:opacity-90 font-black text-xs uppercase tracking-wider rounded-xl shadow-sm transition cursor-pointer"
              >
                Complete KYC Now
              </button>
            </div>

          </div>
        )}

        {/* ================= TAB: COMPLETE KYC ================= */}
        {activeTab === 'kyc' && (
          <div className="space-y-8 text-left animate-in fade-in duration-200">
            {/* Header Title */}
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-2xl flex-shrink-0">
                <svg className="w-8 h-8 text-emerald-855" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="space-y-1">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Complete KYC</h1>
                <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed">
                  Provide your identity information to complete the KYC verification process.
                </p>
              </div>
            </div>

            {/* KYC Form Card */}
            <div 
              style={{ borderRadius: '24px' }} 
              className="bg-white border border-slate-200 p-8 md:p-12 shadow-sm text-center max-w-2xl mx-auto my-6 space-y-6"
            >
              <h2 className="text-2xl font-black text-slate-900">Complete Your KYC Now</h2>

              {kycSuccessMsg ? (
                <div style={{ backgroundColor: '#ecfdf5', borderColor: '#a7f3d0', borderRadius: '16px' }} className="border p-6 text-center text-emerald-800 space-y-4">
                  <svg className="w-12 h-12 text-emerald-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="font-bold text-sm">{kycSuccessMsg}</p>
                </div>
              ) : (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (!kycData.pan || !kycData.mobile || !kycData.dob) {
                    alert('Please fill in all required fields');
                    return;
                  }
                  setKycSuccessMsg('KYC submitted successfully! Our verification team will review your details.');
                }} className="space-y-6 text-left max-w-md mx-auto">
                  
                  {/* PAN Input */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-1.5">
                      <label className="block text-xs font-bold text-slate-600">PAN Card Number*</label>
                      <div className="relative group cursor-help">
                        <svg className="w-3.5 h-3.5 text-slate-400 hover:text-slate-650" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 p-2 bg-slate-900 text-white text-[10px] font-semibold rounded shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition duration-200 z-10 text-center">
                          Enter your 10-digit alphanumeric Permanent Account Number (e.g. ABCDE1234F).
                        </div>
                      </div>
                    </div>
                    <input 
                      type="text" 
                      placeholder="" 
                      required
                      value={kycData.pan}
                      onChange={(e) => setKycData({ ...kycData, pan: e.target.value.toUpperCase() })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#25a544] font-medium text-slate-800 transition"
                    />
                  </div>

                  {/* Mobile Input */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-600">Mobile *</label>
                    <input 
                      type="text" 
                      required
                      value={kycData.mobile}
                      onChange={(e) => setKycData({ ...kycData, mobile: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#25a544] font-medium text-slate-800 transition"
                    />
                  </div>

                  {/* DOB Input */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-600">Date Of Birth (dd/mm/yyyy)*</label>
                    <input 
                      type="date" 
                      required
                      value={kycData.dob}
                      onChange={(e) => setKycData({ ...kycData, dob: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#25a544] font-medium text-slate-800 transition"
                    />
                  </div>

                  {/* Risk Profile Link */}
                  <div className="text-center pt-2">
                    <button 
                      type="button"
                      onClick={() => setActiveTab('risk')}
                      className="inline-flex items-center text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer transition"
                    >
                      <span>Please complete your risk profile first.</span>
                      <svg className="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    </button>
                  </div>

                  {/* Submit Button */}
                  <div className="text-center pt-4">
                    <button
                      type="submit"
                      style={{ backgroundColor: '#52525b', color: '#ffffff' }}
                      className="px-8 py-3.5 hover:opacity-95 font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm transition cursor-pointer"
                    >
                      Continue
                    </button>
                  </div>
                </form>
              )}

              {/* Dividers & Options */}
              <div className="max-w-md mx-auto space-y-4 pt-4">
                <div className="flex items-center justify-center space-x-2">
                  <div className="h-px bg-slate-200 flex-grow"></div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">OR</span>
                  <div className="h-px bg-slate-200 flex-grow"></div>
                </div>

                <p className="text-xs sm:text-sm font-semibold text-slate-600">
                  You can send your KYC at <a href="mailto:kyc@equitypandit.com" className="font-bold text-slate-800 hover:underline">kyc@equitypandit.com</a>
                </p>

                <div className="flex items-center justify-center space-x-2">
                  <div className="h-px bg-slate-200 flex-grow"></div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">OR</span>
                  <div className="h-px bg-slate-200 flex-grow"></div>
                </div>

                <p className="text-xs sm:text-sm font-semibold text-slate-600">
                  Upload your kyc from{' '}
                  <button 
                    onClick={() => setActiveTab('upload')} 
                    className="font-bold text-blue-600 hover:underline hover:text-blue-800 cursor-pointer"
                  >
                    upload docs
                  </button>.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: DOCUMENT UPLOAD ================= */}
        {activeTab === 'upload' && (
          <div className="space-y-8 text-left animate-in fade-in duration-200">
            {/* Header Title */}
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-2xl flex-shrink-0">
                <svg className="w-8 h-8 text-emerald-855" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5M5 19v-2a2 2 0 002-2h2a2 2 0 002 2v2m4 0h2a2 2 0 002-2v-2" />
                </svg>
              </div>
              <div className="space-y-1">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Upload Documents</h1>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold max-w-2xl">
                  Securely upload your financial statements, KYC documents, or research notes to your Capital Life advisory account.
                </p>
              </div>
            </div>

            {/* Select Files Card */}
            <div 
              style={{ borderRadius: '24px', padding: '32px' }}
              className="bg-white border border-slate-200 shadow-sm space-y-6"
            >
              <div>
                <h3 className="text-sm font-black text-slate-900">Select Files (PDF, DOCX, Images)</h3>
                <p className="text-[11px] font-bold text-slate-400 mt-1">Max 10 files. Max 2MB each.</p>
              </div>

              {/* Drag and Drop Area */}
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                style={{ borderRadius: '16px' }}
                className="border-2 border-dashed border-slate-300 hover:border-[#25a544] bg-slate-50/50 py-10 flex flex-col items-center justify-center transition group relative cursor-pointer"
              >
                <input 
                  type="file" 
                  id="file-upload" 
                  multiple 
                  className="hidden" 
                  onChange={handleFileSelect}
                />
                
                <div className="w-12 h-12 rounded-full bg-[#dafd44]/20 text-[#020617] flex items-center justify-center mb-4 border border-[#dafd44]/30 group-hover:scale-105 transition">
                  <svg className="w-5 h-5 text-emerald-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </div>

                <p className="text-xs font-black text-slate-800">Drag and drop files here</p>
                <p className="text-[10px] text-slate-400 mt-1 mb-4">or click to browse your computer</p>

                <label
                  htmlFor="file-upload"
                  style={{ backgroundColor: '#dafd44', color: '#020617' }}
                  className="px-6 py-2.5 font-black text-[11px] uppercase tracking-wider rounded-xl shadow-sm transition hover:opacity-90 cursor-pointer select-none"
                >
                  Choose files
                </label>
              </div>

              <div className="flex items-center space-x-2 text-slate-450">
                <svg className="w-4.5 h-4.5 text-[#25a544]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-[11px] font-bold text-slate-500">End-to-end encrypted file transfer</span>
              </div>
            </div>

            {/* Uploading Files (Progress Area) */}
            {isUploading && (
              <div 
                style={{ borderRadius: '24px', padding: '24px' }}
                className="bg-white border border-slate-200 shadow-sm space-y-3"
              >
                <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                  <span className="truncate flex items-center space-x-2">
                    <svg className="w-4 h-4 text-[#25a544] animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    <span>Uploading {uploadingFileName}...</span>
                  </span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    style={{ width: `${uploadProgress}%`, transition: 'width 0.15s ease' }} 
                    className="h-full bg-[#25a544] rounded-full"
                  ></div>
                </div>
              </div>
            )}

            {/* Uploaded Files List Card */}
            <div 
              style={{ borderRadius: '24px', padding: '32px' }}
              className="bg-white border border-slate-200 shadow-sm space-y-6"
            >
              <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
                <svg className="w-4.5 h-4.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Uploaded Files</span>
              </h3>

              {uploadedFiles.length === 0 ? (
                <div className="py-12 flex flex-col items-center justify-center text-slate-455 text-center">
                  <svg className="w-12 h-12 text-slate-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
                  </svg>
                  <p className="text-xs font-bold text-slate-400">No documents uploaded yet.</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {uploadedFiles.map((file, idx) => (
                    <div key={idx} className="flex justify-between items-center py-3.5 first:pt-0 last:pb-0 group">
                      <div className="flex items-center space-x-3 truncate">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-100 flex items-center justify-center flex-shrink-0">
                          <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div className="truncate text-left">
                          <p className="text-xs font-black text-slate-800 truncate">{file.name}</p>
                          <p className="text-[10px] text-slate-450 font-bold">{file.size}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-100">
                          Success
                        </span>
                        <button
                          onClick={() => handleFileDelete(file.name)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-lg transition cursor-pointer"
                          title="Delete File"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 3: MAKE PAYMENT ================= */}
        {activeTab === 'payment' && (
          <div className="space-y-8 text-left animate-in fade-in duration-200">
            {/* Header Title */}
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-2xl flex-shrink-0">
                <svg className="w-8 h-8 text-emerald-850" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="space-y-1">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Secure Payment</h1>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold max-w-2xl">
                  Complete your transaction with confidence. Choose your preferred payment method from the options provided below to start your investment journey.
                </p>
              </div>
            </div>

            {/* Payment Methods Split Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
              
              {/* LEFT CARD: NEFT / RTGS / Bank Transfer */}
              <div 
                style={{ borderRadius: '24px', padding: '40px' }}
                className="bg-white border border-slate-200 shadow-sm space-y-6"
              >
                {/* Title Block */}
                <div className="flex items-center space-x-4 border-b border-slate-100 pb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#dafd44]/20 border border-[#dafd44]/35 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-emerald-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-black text-slate-900">NEFT / RTGS / Bank Transfer</h2>
                </div>

                {/* Fields List */}
                <div className="space-y-4">
                  
                  {/* Field 1: Bank Name */}
                  <div className="relative group bg-slate-50 border border-slate-200 rounded-xl p-4 flex justify-between items-center">
                    <div>
                      <span className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-wider mb-0.5">Bank Name</span>
                      <span className="text-xs font-bold text-slate-800">{paymentDetails.bankName}</span>
                    </div>
                    <button 
                      onClick={() => copyToClipboard(paymentDetails.bankName, 'bankName')}
                      className="p-2 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition relative"
                    >
                      {copiedField === 'bankName' ? (
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] px-2 py-1 rounded font-bold uppercase tracking-wider shadow">Copied!</span>
                      ) : null}
                      <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                    </button>
                  </div>

                  {/* Field 2: Account Name */}
                  <div className="relative group bg-slate-50 border border-slate-200 rounded-xl p-4 flex justify-between items-center">
                    <div>
                      <span className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-wider mb-0.5">Account Name</span>
                      <span className="text-xs font-bold text-slate-800">{paymentDetails.accountName}</span>
                    </div>
                    <button 
                      onClick={() => copyToClipboard(paymentDetails.accountName, 'accountName')}
                      className="p-2 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition relative"
                    >
                      {copiedField === 'accountName' ? (
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] px-2 py-1 rounded font-bold uppercase tracking-wider shadow">Copied!</span>
                      ) : null}
                      <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                    </button>
                  </div>

                  {/* Field 3: Account Number */}
                  <div className="relative group bg-slate-50 border border-slate-200 rounded-xl p-4 flex justify-between items-center">
                    <div>
                      <span className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-wider mb-0.5">Account Number</span>
                      <span className="text-xs font-bold text-slate-800">{paymentDetails.accountNumber}</span>
                    </div>
                    <button 
                      onClick={() => copyToClipboard(paymentDetails.accountNumber, 'accountNumber')}
                      className="p-2 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition relative"
                    >
                      {copiedField === 'accountNumber' ? (
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] px-2 py-1 rounded font-bold uppercase tracking-wider shadow">Copied!</span>
                      ) : null}
                      <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                    </button>
                  </div>

                  {/* Double Column Grid: IFSC Code & Branch */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Field 4: IFSC Code */}
                    <div className="relative group bg-slate-50 border border-slate-200 rounded-xl p-4 flex justify-between items-center">
                      <div>
                        <span className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-wider mb-0.5">IFSC Code</span>
                        <span className="text-xs font-bold text-slate-800">{paymentDetails.ifscCode}</span>
                      </div>
                      <button 
                        onClick={() => copyToClipboard(paymentDetails.ifscCode, 'ifscCode')}
                        className="p-2 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition relative"
                      >
                        {copiedField === 'ifscCode' ? (
                          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] px-2 py-1 rounded font-bold uppercase tracking-wider shadow">Copied!</span>
                        ) : null}
                        <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                      </button>
                    </div>

                    {/* Field 5: Branch */}
                    <div className="relative group bg-slate-50 border border-slate-200 rounded-xl p-4 flex justify-between items-center">
                      <div>
                        <span className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-wider mb-0.5">Branch</span>
                        <span className="text-xs font-bold text-slate-800">{paymentDetails.branch}</span>
                      </div>
                      <button 
                        onClick={() => copyToClipboard(paymentDetails.branch, 'branch')}
                        className="p-2 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition relative"
                      >
                        {copiedField === 'branch' ? (
                          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] px-2 py-1 rounded font-bold uppercase tracking-wider shadow">Copied!</span>
                        ) : null}
                        <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                      </button>
                    </div>

                  </div>

                </div>
              </div>

              {/* RIGHT CARD: UPI Payment */}
              <div 
                style={{ borderRadius: '24px', padding: '40px' }}
                className="bg-white border border-slate-200 shadow-sm space-y-6"
              >
                {/* Title Block */}
                <div className="flex items-center space-x-4 border-b border-slate-100 pb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#dafd44]/20 border border-[#dafd44]/35 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-emerald-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-black text-slate-900">UPI Payment</h2>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                  Scan the QR code below or use the UPI ID to pay instantly via Google Pay, PhonePe, or Paytm.
                </p>

                {/* UPI ID Field */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex justify-between items-center">
                  <div>
                    <span className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-wider mb-0.5">UPI ID</span>
                    <span className="text-xs font-bold text-slate-800 font-mono">{paymentDetails.upiId}</span>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(paymentDetails.upiId, 'upiId')}
                    style={{ backgroundColor: '#25a544', color: '#ffffff' }}
                    className="px-4 py-2 hover:opacity-90 font-black text-[10px] uppercase tracking-wider rounded-lg shadow-sm cursor-pointer select-none transition relative"
                  >
                    {copiedField === 'upiId' ? 'Copied!' : 'Copy'}
                  </button>
                </div>

                {/* QR Code Graphic Frame Container */}
                <div className="flex flex-col items-center justify-center bg-slate-50 border border-slate-200 rounded-[20px] p-6 space-y-4">
                  <div className="bg-white border border-slate-150 p-4 rounded-2xl shadow-sm">
                    
                    {/* QR Code image */}
                    <img src={qr} alt="UPI Payment QR Code" className="w-64 h-64 object-contain mx-auto" />

                  </div>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">SCAN TO PAY SECURELY</span>
                  
                  <div className="flex items-center space-x-3 text-[9px] font-bold text-slate-400">
                    <span className="px-2 py-1 bg-white border border-slate-150 rounded shadow-xs">GPay</span>
                    <span className="px-2 py-1 bg-white border border-slate-150 rounded shadow-xs">Paytm</span>
                    <span className="px-2 py-1 bg-white border border-slate-150 rounded shadow-xs">PhonePe</span>
                  </div>
                </div>

              </div>

            </div>

            {/* BOTTOM NOTICE BANNER */}
            <div 
              style={{ borderRadius: '16px', backgroundColor: '#fcfdeb', borderColor: '#e1e3b5' }}
              className="border p-6 text-left flex items-start space-x-3"
            >
              <div className="p-1 rounded-full bg-amber-50 text-amber-700 mt-0.5 flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold">
                  Once payment is done, please share the screenshot on WhatsApp{' '}
                  <a href="https://wa.me/918109081040" target="_blank" rel="noopener noreferrer" className="text-[#25a544] hover:underline font-black">
                    +91 81090 81040
                  </a>{' '}
                  or email{' '}
                  <a href="mailto:rajivylrsharma89@gmail.com" className="text-[#25a544] hover:underline font-black">
                    rajivylrsharma89@gmail.com
                  </a>
                </p>
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB: PAYMENT HISTORY ================= */}
        {activeTab === 'history' && (
          <div className="space-y-8 text-left animate-in fade-in duration-200">
            {/* Header Title */}
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-2xl flex-shrink-0">
                <svg className="w-8 h-8 text-emerald-855" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <div className="space-y-1">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Payment History</h1>
                <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed">
                  View and track all payments made, verification status, and transaction histories.
                </p>
              </div>
            </div>

            {/* Transactions Card List & Table */}
            <div style={{ borderRadius: '24px' }} className="bg-white border border-slate-200 p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-lg font-black text-slate-900">Your Transactions</h2>
                  <p className="text-[11px] font-semibold text-slate-450 mt-0.5">List of payments submitted for review.</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                      <th className="pb-3">Transaction ID</th>
                      <th className="pb-3">Advisory Plan</th>
                      <th className="pb-3">Amount</th>
                      <th className="pb-3">Payment Method</th>
                      <th className="pb-3">Date</th>
                      <th className="pb-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                    <tr>
                      <td className="py-4 font-mono font-bold text-slate-900">TXN2026072201</td>
                      <td className="py-4">
                        <div className="font-black text-slate-900">Equity Research Pro</div>
                        <div className="text-[9px] text-slate-450 mt-0.5">1-Month Subscribed Plan</div>
                      </td>
                      <td className="py-4 font-mono font-black text-slate-900">₹14,999</td>
                      <td className="py-4">UPI (rajivylrsharma89-3@oksbi)</td>
                      <td className="py-4">22 Jul 2026, 11:30 AM</td>
                      <td className="py-4 text-right">
                        <span className="px-2 py-0.5 bg-amber-50 border border-amber-100 text-amber-800 text-[9px] font-black rounded-md">PENDING VERIFICATION</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 font-mono font-bold text-slate-900">TXN2026061503</td>
                      <td className="py-4">
                        <div className="font-black text-slate-900">Portfolio Advisory Starter</div>
                        <div className="text-[9px] text-slate-450 mt-0.5">Quarterly Consultation</div>
                      </td>
                      <td className="py-4 font-mono font-black text-slate-900">₹9,999</td>
                      <td className="py-4">Bank NEFT / Transfer</td>
                      <td className="py-4">15 Jun 2026, 02:45 PM</td>
                      <td className="py-4 text-right">
                        <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-100 text-emerald-800 text-[9px] font-black rounded-md">COMPLETED</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB: SUPPORT DESK ================= */}
        {activeTab === 'support' && (
          <div className="space-y-8 text-left animate-in fade-in duration-200">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-2xl flex-shrink-0">
                <svg className="w-8 h-8 text-emerald-855" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className="space-y-1">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Support Desk</h1>
                <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed">
                  Our team of financial experts is ready to assist you. Reach out directly or send us a message.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 space-y-6">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-[#e3ff54] text-slate-900 text-[10px] font-black rounded-full uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 bg-[#25a544] rounded-full animate-pulse"></span>
                  <span>24/7 Priority Support</span>
                </span>
                <div style={{ borderRadius: '24px' }} className="overflow-hidden border border-slate-200 shadow-sm bg-white p-2.5">
                  <img src={customerSupport} alt="Support Desk Visualization Graphic" className="w-full h-auto object-cover rounded-2xl" />
                </div>
              </div>

              <div className="lg:col-span-7 bg-[#f8fafc] border border-slate-200 rounded-[28px] overflow-hidden shadow-sm flex flex-col justify-between">
                <div className="flex border-b border-slate-200 bg-white">
                  <button onClick={() => setSupportTab('new')} className={`flex-1 py-4 text-xs font-black uppercase tracking-wider border-b-2 transition ${supportTab === 'new' ? 'border-[#dafd44] text-slate-900 bg-slate-50/30' : 'border-transparent text-slate-400 hover:text-slate-655'}`}>New Request</button>
                  <button onClick={() => setSupportTab('history')} className={`flex-1 py-4 text-xs font-black uppercase tracking-wider border-b-2 transition ${supportTab === 'history' ? 'border-[#dafd44] text-slate-900 bg-slate-50/30' : 'border-transparent text-slate-400 hover:text-slate-655'}`}>History</button>
                </div>

                <div className="p-8 space-y-6 text-left min-h-[380px] bg-white">
                  {supportTab === 'new' ? (
                    supportSubmitted ? (
                      <div style={{ borderRadius: '20px' }} className="bg-emerald-50 border border-emerald-250 text-emerald-900 p-8 text-center space-y-4 my-auto">
                        <h3 className="text-xl font-black">Message Sent Successfully!</h3>
                      </div>
                    ) : (
                      <form onSubmit={handleSupportSubmit} className="space-y-6">
                        <textarea required rows={4} placeholder="Enter Your Message*" value={supportData.message} onChange={(e) => setSupportData({ ...supportData, message: e.target.value })} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#dafd44] font-medium text-xs sm:text-sm text-slate-800 bg-slate-50/50 transition" />
                        <button type="submit" style={{ backgroundColor: '#e3ff54', color: '#000000' }} className="w-full py-4 hover:opacity-90 font-black text-xs uppercase tracking-widest rounded-xl shadow-sm">Send Message</button>
                      </form>
                    )
                  ) : (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-black text-slate-900 tracking-tight">Request History</h2>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
