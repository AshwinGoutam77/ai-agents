import "./globals.css";
import { UserProvider } from "@/context/UserContext";
export const metadata = {
  title: "AI Agents - Future of Work",
  description: "Discover and Hire AI Agents for every Task, Anytime, Anywhere",
  generator: "v0.dev",
};
// const { user } = useUser();
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* <Header user={user} /> */}
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
