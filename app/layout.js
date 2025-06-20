import "./globals.css"

export const metadata = {
  title: "AI Agents - Future of Work",
  description: "Discover and Hire AI Agents for every Task, Anytime, Anywhere",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
