
import { User, Calendar, Brain, BookOpen, Home, Plus } from "lucide-react";
import { useLocation } from "react-router-dom";

const DashboardSidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { name: "Dashboard", icon: Home, path: "/", active: location.pathname === "/" },
    { name: "Rooms", icon: User, path: "/rooms", active: location.pathname === "/rooms" },
    { name: "Create Room", icon: Plus, path: "/create-room", active: location.pathname === "/create-room" },
    { name: "Notes Maker", icon: BookOpen, path: "/notes", active: location.pathname === "/notes" },
    { name: "Calendar", icon: Calendar, path: "/calendar", active: location.pathname === "/calendar" },
    { name: "AI Assistant", icon: Brain, path: "/ai-assistant", active: location.pathname === "/ai-assistant" },
  ];

  return (
    <div className="w-64 bg-primary min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-primary/20">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-primary font-bold text-lg">M</span>
          </div>
          <span className="text-white text-xl font-bold">Merge</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6">
        <ul className="space-y-2 px-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  item.active
                    ? "bg-accent/20 border-l-4 border-accent text-white"
                    : "text-white/80 hover:bg-primary/90 hover:text-white"
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default DashboardSidebar;
