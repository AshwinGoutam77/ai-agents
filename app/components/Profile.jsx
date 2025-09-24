import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { LogOut } from "lucide-react";

const Profile = () => {
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  if (!user) {
    return (
      <div className="w-12 h-12 rounded-full bg-gray-300 animate-pulse"></div>
    );
  }
 const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });

      // Remove client-side js-cookie copies (if set)
      document.cookie =
        "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "user_email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // Redirect to login
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  return (
    <div className="relative">
      {/* Avatar */}
      <div
        className="flex justify-center cursor-pointer items-center text-white w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"
        onClick={() => setOpen(!open)}
      >
        {user?.charAt(0).toUpperCase()}
      </div>

      {/* Dropdown Button */}
      {open && (
        <div className="absolute -right-10 mt-2 bg-white shadow-lg rounded-[8px] border border-gray-200 z-50 ">
          <button
            onClick={() => {
               handleLogout();
              setOpen(false);
            }}
            className="w-full gap-3 flex justify-center items-center text-left px-4 py-2 hover:bg-gray-100 transition-colors"
          >
            Logout <span><LogOut  size={18}/></span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
