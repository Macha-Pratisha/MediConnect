import { Heart, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [hasUnread, setHasUnread] = useState(false); // 👈 For badge

  const navLinks = [
    { name: "Book Doctor", path: "/book-doctor" },
    { name: "Book Counselor", path: "/patient-translate" },
    { name: "Doctor Console", path: "/doctor-console" },
  ];

  // ✅ Fetch notifications
  const fetchNotifications = async () => {
    try {
      const response = await fetch("http://localhost:5003/api/notifications");
      const data = await response.json();
      setNotifications(data);
      if (data.length > 0) setHasUnread(true); // Show badge if any exist
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // ✅ Handle notifications popup
  const handleNotificationsClick = () => {
    // When user opens the popup, mark as read (remove red badge)
    if (!showNotif) {
      setHasUnread(false);
    }
    setShowNotif(!showNotif);
  };

  return (
    <nav className="bg-white/95 dark:bg-slate-900/95 border-b border-border sticky top-0 z-50 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Heart className="w-6 h-6 text-primary" fill="currentColor" />
            </div>
            <span className="text-xl font-bold text-foreground">MediConnect</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-foreground/70 hover:text-foreground transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}

            {/* 🔔 Notifications */}
            <div className="relative">
              <Button onClick={handleNotificationsClick} className="relative">
                Notifications
                {hasUnread && notifications.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </Button>

              {/* Notification Popup */}
              {showNotif && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 shadow-lg rounded-xl p-4 max-h-96 overflow-y-auto z-50">
                  <h3 className="font-semibold mb-3">Notifications</h3>
                  {notifications.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No notifications yet.
                    </p>
                  ) : (
                    notifications.map((n: any) => (
                      <div
                        key={n._id}
                        className="border-b border-border py-2 last:border-0"
                      >
                        <p className="text-sm font-medium">{n.patientName}</p>
                        <p className="text-xs text-muted-foreground">{n.message}</p>
                        <p className="text-xs text-right text-gray-400">
                          {new Date(n.createdAt).toLocaleString()}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block text-foreground/70 hover:text-foreground transition-colors font-medium py-2"
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Notifications */}
            <Button className="w-full" onClick={handleNotificationsClick}>
              Notifications
            </Button>
            {showNotif && (
              <div className="bg-white dark:bg-slate-800 shadow-md rounded-xl p-3 mt-2 max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No notifications yet.
                  </p>
                ) : (
                  notifications.map((n: any) => (
                    <div key={n._id} className="border-b py-2 last:border-0">
                      <p className="text-sm font-medium">{n.patientName}</p>
                      <p className="text-xs text-muted-foreground">{n.message}</p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
