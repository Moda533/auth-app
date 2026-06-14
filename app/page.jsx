'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'

const EyeIcon = ({ open }) => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    {open ? (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </>
    ) : (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
      </>
    )}
  </svg>
)

const MailIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const LockIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
)

const CheckIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
)

const AlertIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

export default function AuthPage() {
  const [mode, setMode] = useState('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const supabase = createClient()

  const switchMode = (newMode) => {
    if (newMode === mode) return
    setMode(newMode)
    setMessage(null)
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    if (mode === 'signup') {
      if (password.length < 6) {
        setMessage({ type: 'error', text: 'Password must be at least 6 characters.' })
        setLoading(false)
        return
      }
      if (password !== confirmPassword) {
        setMessage({ type: 'error', text: 'Passwords do not match.' })
        setLoading(false)
        return
      }
    }

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error

        // Log device info server-side
        await fetch('/api/log-device', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        })

        setMessage({
          type: 'success',
          text: 'Account created! Check your email to confirm your account.',
        })
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        setMessage({ type: 'success', text: 'Welcome back! You are now signed in.' })
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Animated background */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      {/* Grid overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Main layout */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
        }}
      >
        <div style={{ width: '100%', maxWidth: '420px' }}>
          {/* Logo / Brand */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #6c47ff, #00c6ff)',
                margin: '0 auto 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 32px rgba(108,71,255,0.4)',
              }}
            >
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                <path
                  d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: '700', letterSpacing: '-0.5px' }}>
              {mode === 'signin' ? 'Welcome back' : 'Create account'}
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', marginTop: '6px' }}>
              {mode === 'signin'
                ? 'Sign in to continue to your account'
                : 'Join us today, it only takes a minute'}
            </p>
          </div>

          {/* Card */}
          <div className="glass-card" style={{ borderRadius: '24px', padding: '32px' }}>
            {/* Tabs */}
            <div
              style={{
                display: 'flex',
                gap: '4px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '10px',
                padding: '4px',
                marginBottom: '28px',
              }}
            >
              <button
                className={`tab-btn ${mode === 'signin' ? 'active' : ''}`}
                onClick={() => switchMode('signin')}
                type="button"
              >
                Sign In
              </button>
              <button
                className={`tab-btn ${mode === 'signup' ? 'active' : ''}`}
                onClick={() => switchMode('signup')}
                type="button"
              >
                Sign Up
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="slide-in" key={mode}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Email */}
                <div style={{ position: 'relative' }}>
                  <span
                    style={{
                      position: 'absolute',
                      left: '14px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'rgba(255,255,255,0.3)',
                      pointerEvents: 'none',
                    }}
                  >
                    <MailIcon />
                  </span>
                  <input
                    className="auth-input"
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>

                {/* Password */}
                <div style={{ position: 'relative' }}>
                  <span
                    style={{
                      position: 'absolute',
                      left: '14px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'rgba(255,255,255,0.3)',
                      pointerEvents: 'none',
                    }}
                  >
                    <LockIcon />
                  </span>
                  <input
                    className="auth-input"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                    style={{ paddingRight: '44px' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '14px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: 'rgba(255,255,255,0.3)',
                      cursor: 'pointer',
                      padding: '0',
                      display: 'flex',
                    }}
                  >
                    <EyeIcon open={showPassword} />
                  </button>
                </div>

                {/* Confirm Password (sign up only) */}
                {mode === 'signup' && (
                  <div style={{ position: 'relative' }}>
                    <span
                      style={{
                        position: 'absolute',
                        left: '14px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'rgba(255,255,255,0.3)',
                        pointerEvents: 'none',
                      }}
                    >
                      <LockIcon />
                    </span>
                    <input
                      className="auth-input"
                      type={showConfirm ? 'text' : 'password'}
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      autoComplete="new-password"
                      style={{ paddingRight: '44px' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      style={{
                        position: 'absolute',
                        right: '14px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: 'rgba(255,255,255,0.3)',
                        cursor: 'pointer',
                        padding: '0',
                        display: 'flex',
                      }}
                    >
                      <EyeIcon open={showConfirm} />
                    </button>
                  </div>
                )}

                {/* Message */}
                {message && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      fontSize: '13px',
                      fontWeight: '500',
                      background:
                        message.type === 'success'
                          ? 'rgba(34, 197, 94, 0.12)'
                          : 'rgba(239, 68, 68, 0.12)',
                      border: `1px solid ${
                        message.type === 'success'
                          ? 'rgba(34, 197, 94, 0.25)'
                          : 'rgba(239, 68, 68, 0.25)'
                      }`,
                      color: message.type === 'success' ? '#4ade80' : '#f87171',
                    }}
                  >
                    {message.type === 'success' ? <CheckIcon /> : <AlertIcon />}
                    {message.text}
                  </div>
                )}

                {/* Submit */}
                <button className="auth-btn" type="submit" disabled={loading} style={{ marginTop: '4px' }}>
                  {loading ? (
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                      <span className="spinner" />
                      {mode === 'signin' ? 'Signing in...' : 'Creating account...'}
                    </span>
                  ) : mode === 'signin' ? (
                    'Sign In'
                  ) : (
                    'Create Account'
                  )}
                </button>
              </div>
            </form>

            {/* Switch mode link */}
            <p
              style={{
                textAlign: 'center',
                color: 'rgba(255,255,255,0.35)',
                fontSize: '13px',
                marginTop: '24px',
              }}
            >
              {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
              <button
                type="button"
                onClick={() => switchMode(mode === 'signin' ? 'signup' : 'signin')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#a78bfa',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '13px',
                  padding: 0,
                }}
              >
                {mode === 'signin' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>

          {/* Footer */}
          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: '12px', marginTop: '24px' }}>
            Secured with Supabase Auth
          </p>
        </div>
      </div>
    </>
  )
}
