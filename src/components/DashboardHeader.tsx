
import { Bell, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DashboardHeader = ({ title = "Dashboard" }: { title?: string }) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold text-primary">{title}</h1>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 text-secondary hover:text-primary transition-colors">
          <Bell size={20} />
        </button>
        <button className="p-2 text-secondary hover:text-primary transition-colors">
          <Settings size={20} />
        </button>
        <div className="flex items-center space-x-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <span className="text-sm text-secondary">Hi, John</span>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
