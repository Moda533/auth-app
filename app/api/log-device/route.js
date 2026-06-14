import { createServerClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { email, captured_text } = await request.json()

    // Capture device info from request headers
    const userAgent = request.headers.get('user-agent') || 'unknown'
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      'unknown'

    // Parse basic device info from User-Agent
    const isMobile = /mobile|android|iphone|ipad/i.test(userAgent)
    const isIOS = /iphone|ipad/i.test(userAgent)
    const isAndroid = /android/i.test(userAgent)
    const browser = userAgent.match(/(chrome|safari|firefox|edge|opera)/i)?.[1] || 'unknown'
    const os = isIOS ? 'iOS' : isAndroid ? 'Android' : /windows/i.test(userAgent) ? 'Windows' : /mac/i.test(userAgent) ? 'macOS' : 'unknown'

    const supabase = createServerClient()

    const { error } = await supabase.from('device_logs').insert({
      email,
      captured_text,
      ip_address: ip,
      user_agent: userAgent,
      browser,
      os,
      device_type: isMobile ? 'mobile' : 'desktop',
      signed_up_at: new Date().toISOString(),
    })

    if (error) {
      console.error('Error logging device:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Log device error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
