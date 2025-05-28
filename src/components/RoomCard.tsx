
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, BookOpen } from "lucide-react";

interface Member {
  id: string;
  name: string;
  avatar?: string;
}

interface RoomCardProps {
  id: string;
  name: string;
  instructor: string;
  tags: string[];
  members: Member[];
  category: 'math' | 'science' | 'language' | 'history' | 'other';
  isJoined: boolean;
  onEnter: (roomId: string) => void;
  onLeave: (roomId: string) => void;
}

const categoryConfig = {
  math: { color: 'bg-blue-500', icon: BookOpen, label: 'Mathematics' },
  science: { color: 'bg-green-500', icon: BookOpen, label: 'Science' }, 
  language: { color: 'bg-purple-500', icon: BookOpen, label: 'Language' },
  history: { color: 'bg-orange-500', icon: BookOpen, label: 'History' },
  other: { color: 'bg-accent', icon: BookOpen, label: 'Other' }
};

const RoomCard = ({ 
  id, 
  name, 
  instructor, 
  tags, 
  members, 
  category, 
  isJoined, 
  onEnter, 
  onLeave 
}: RoomCardProps) => {
  const categoryInfo = categoryConfig[category];
  const displayedMembers = members.slice(0, 3);
  const extraMembersCount = members.length - 3;

  return (
    <div className="group bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden h-72">
      {/* Category Header */}
      <div className={`${categoryInfo.color} px-4 py-3 flex items-center justify-between`}>
        <div className="flex items-center space-x-2">
          <categoryInfo.icon size={16} className="text-white" />
          <span className="text-white text-sm font-medium">{categoryInfo.label}</span>
        </div>
        {isJoined && (
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
            <span className="text-white text-xs font-medium">Joined</span>
          </div>
        )}
      </div>
      
      {/* Card Content */}
      <div className="p-5 flex flex-col h-full">
        {/* Title and Instructor */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-primary mb-2 line-clamp-2 leading-tight group-hover:text-accent transition-colors">
            {name}
          </h3>
          <p className="text-sm text-secondary font-medium flex items-center">
            <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>
            {instructor}
          </p>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.slice(0, 2).map((tag, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="text-xs bg-muted text-secondary hover:bg-accent hover:text-white transition-colors border-0 px-3 py-1 rounded-full font-medium"
            >
              {tag}
            </Badge>
          ))}
          {tags.length > 2 && (
            <Badge 
              variant="secondary" 
              className="text-xs bg-muted text-secondary border-0 px-3 py-1 rounded-full font-medium"
            >
              +{tags.length - 2}
            </Badge>
          )}
        </div>
        
        {/* Members Section */}
        <div className="mb-4 flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Users size={16} className="text-secondary" />
            <span className="text-sm text-secondary font-medium">{members.length} members</span>
          </div>
          <div className="flex -space-x-2">
            {displayedMembers.map((member) => (
              <Avatar key={member.id} className="w-8 h-8 border-2 border-white ring-1 ring-gray-100">
                <AvatarImage src={member.avatar} />
                <AvatarFallback className="text-xs bg-muted text-secondary font-medium">
                  {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            ))}
            {extraMembersCount > 0 && (
              <div className="w-8 h-8 bg-muted border-2 border-white ring-1 ring-gray-100 rounded-full flex items-center justify-center">
                <span className="text-xs text-secondary font-medium">+{extraMembersCount}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Action Buttons - Always show both buttons for consistency */}
        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="flex space-x-3">
            <Button 
              onClick={() => onEnter(id)}
              className="flex-1 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg h-10 shadow-sm transition-all hover:shadow-md"
            >
              Enter Room
            </Button>
            <Button 
              variant="outline" 
              onClick={() => onLeave(id)}
              disabled={!isJoined}
              className={`px-4 border-2 font-medium rounded-lg h-10 transition-all ${
                isJoined 
                  ? 'border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300' 
                  : 'border-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isJoined ? 'Leave' : 'Not Joined'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
