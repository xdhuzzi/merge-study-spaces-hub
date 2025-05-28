
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

const categoryColors = {
  math: 'bg-blue-500',
  science: 'bg-green-500', 
  language: 'bg-purple-500',
  history: 'bg-orange-500',
  other: 'bg-accent'
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
  const displayedMembers = members.slice(0, 4);
  const extraMembersCount = members.length - 4;

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm h-56 flex flex-col card-hover animate-fade-in">
      {/* Category stripe */}
      <div className={`h-2 ${categoryColors[category]} rounded-t-xl`} />
      
      {/* Card content */}
      <div className="flex-1 p-4 flex flex-col">
        {/* Title and instructor */}
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-primary mb-1 line-clamp-1">{name}</h3>
          <p className="text-sm text-secondary">by {instructor}</p>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {tags.slice(0, 3).map((tag, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="text-xs bg-[#F5F5F5] text-secondary hover:bg-gray-200"
            >
              {tag}
            </Badge>
          ))}
        </div>
        
        {/* Bottom section */}
        <div className="flex items-end justify-between mt-auto">
          {/* Member avatars */}
          <div className="flex -space-x-2">
            {displayedMembers.map((member, index) => (
              <Avatar key={member.id} className="w-8 h-8 border-2 border-white">
                <AvatarImage src={member.avatar} />
                <AvatarFallback className="text-xs">
                  {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            ))}
            {extraMembersCount > 0 && (
              <div className="w-8 h-8 bg-gray-100 border-2 border-white rounded-full flex items-center justify-center">
                <span className="text-xs text-secondary">+{extraMembersCount}</span>
              </div>
            )}
          </div>
          
          {/* Action buttons */}
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              onClick={() => onEnter(id)}
              className="bg-primary hover:bg-primary/90 text-white text-sm px-3 py-1 h-8"
            >
              Enter
            </Button>
            {isJoined && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onLeave(id)}
                className="text-red-500 hover:text-red-600 hover:bg-red-50 text-sm px-3 py-1 h-8"
              >
                Leave
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
