import './globals.css'

export const metadata = {
  title: 'Auth App',
  description: 'Sign in or create an account',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
