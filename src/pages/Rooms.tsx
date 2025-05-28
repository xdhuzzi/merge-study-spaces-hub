
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import RoomCard from "@/components/RoomCard";
import CreateRoomFAB from "@/components/CreateRoomFAB";
import EmptyRoomsState from "@/components/EmptyRoomsState";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Mock data for demonstration
const mockRooms = [
  {
    id: "1",
    name: "Advanced Calculus Study Group",
    instructor: "Prof. Sarah Johnson",
    tags: ["Mathematics", "Calculus", "Advanced"],
    members: [
      { id: "1", name: "Alice Smith", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face" },
      { id: "2", name: "Bob Wilson", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=32&h=32&fit=crop&crop=face" },
      { id: "3", name: "Carol Davis", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face" },
      { id: "4", name: "David Brown", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" },
      { id: "5", name: "Emma Johnson" },
      { id: "6", name: "Frank Miller" }
    ],
    category: "math" as const,
    isJoined: true
  },
  {
    id: "2",
    name: "Physics Lab Discussion",
    instructor: "Dr. Michael Chen",
    tags: ["Physics", "Laboratory", "Discussion"],
    members: [
      { id: "7", name: "Grace Lee", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop&crop=face" },
      { id: "8", name: "Henry Garcia", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face" },
      { id: "9", name: "Isabella Martinez" }
    ],
    category: "science" as const,
    isJoined: false
  },
  {
    id: "3",
    name: "Spanish Conversation Practice",
    instructor: "Prof. Maria Rodriguez",
    tags: ["Spanish", "Conversation", "Practice"],
    members: [
      { id: "10", name: "Jack Thompson", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face" },
      { id: "11", name: "Kate Williams", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=32&h=32&fit=crop&crop=face" },
      { id: "12", name: "Liam Anderson", avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=32&h=32&fit=crop&crop=face" },
      { id: "13", name: "Mia Taylor" }
    ],
    category: "language" as const,
    isJoined: true
  },
  {
    id: "4",
    name: "World War II History Seminar",
    instructor: "Prof. Robert Clark",
    tags: ["History", "WWII", "Seminar"],
    members: [
      { id: "14", name: "Noah Davis", avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=32&h=32&fit=crop&crop=face" },
      { id: "15", name: "Olivia Wilson" }
    ],
    category: "history" as const,
    isJoined: false
  },
  {
    id: "5",
    name: "Computer Science Study Hall",
    instructor: "Dr. Jennifer Zhang",
    tags: ["Computer Science", "Programming", "Study"],
    members: [
      { id: "16", name: "Peter Miller", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=32&h=32&fit=crop&crop=face" },
      { id: "17", name: "Quinn Brown", avatar: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=32&h=32&fit=crop&crop=face" },
      { id: "18", name: "Rachel Green", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=32&h=32&fit=crop&crop=face" }
    ],
    category: "other" as const,
    isJoined: true
  },
  {
    id: "6",
    name: "Organic Chemistry Lab",
    instructor: "Prof. Lisa Wang",
    tags: ["Chemistry", "Organic", "Laboratory"],
    members: [
      { id: "19", name: "Sam Johnson", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=32&h=32&fit=crop&crop=face" },
      { id: "20", name: "Tina Smith" }
    ],
    category: "science" as const,
    isJoined: false
  }
];

const Rooms = () => {
  const [activeTab, setActiveTab] = useState<"my" | "joined">("my");
  const [searchQuery, setSearchQuery] = useState("");
  const [rooms, setRooms] = useState(mockRooms);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         room.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (activeTab === "joined") {
      return matchesSearch && room.isJoined;
    }
    return matchesSearch;
  });

  const handleEnterRoom = (roomId: string) => {
    const room = rooms.find(r => r.id === roomId);
    toast({
      title: "Entering room",
      description: `Welcome to ${room?.name}!`,
    });
    console.log("Entering room:", roomId);
  };

  const handleLeaveRoom = (roomId: string) => {
    setRooms(prev => prev.map(room => 
      room.id === roomId ? { ...room, isJoined: false } : room
    ));
    
    const room = rooms.find(r => r.id === roomId);
    toast({
      title: "Left room",
      description: `You have left ${room?.name}`,
      variant: "destructive"
    });
  };

  const handleCreateRoom = () => {
    toast({
      title: "Create Room",
      description: "Opening room creation form...",
    });
    console.log("Creating new room");
  };

  const handleLoadMore = () => {
    setLoading(true);
    // Simulate loading more rooms
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Loaded more rooms",
        description: "Additional rooms have been loaded",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex bg-[#F5F5F5]">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader title="Rooms" />
        
        <main className="flex-1 p-6">
          {/* Title */}
          <h1 className="text-2xl font-bold text-primary mb-6">Rooms</h1>
          
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary" size={20} />
            <Input
              placeholder="Search rooms by name or tag"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 border-secondary focus:border-accent"
            />
          </div>
          
          {/* Tabs */}
          <div className="flex space-x-8 mb-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("my")}
              className={`pb-3 text-base font-medium transition-colors relative ${
                activeTab === "my" 
                  ? "text-accent border-b-2 border-accent" 
                  : "text-secondary hover:text-primary"
              }`}
            >
              My Rooms
            </button>
            <button
              onClick={() => setActiveTab("joined")}
              className={`pb-3 text-base font-medium transition-colors relative ${
                activeTab === "joined" 
                  ? "text-accent border-b-2 border-accent" 
                  : "text-secondary hover:text-primary"
              }`}
            >
              Joined Rooms
            </button>
          </div>
          
          {/* Room Grid */}
          {filteredRooms.length === 0 ? (
            <EmptyRoomsState onCreateRoom={handleCreateRoom} />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {filteredRooms.map((room) => (
                  <RoomCard
                    key={room.id}
                    {...room}
                    onEnter={handleEnterRoom}
                    onLeave={handleLeaveRoom}
                  />
                ))}
              </div>
              
              {/* Load More Button */}
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                >
                  {loading ? "Loading..." : "Load More"}
                </Button>
              </div>
            </>
          )}
        </main>
      </div>
      
      {/* Floating Action Button */}
      <CreateRoomFAB onClick={handleCreateRoom} />
    </div>
  );
};

export default Rooms;
