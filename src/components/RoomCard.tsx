
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
  math: 'bg-blue-600',
  science: 'bg-green-600', 
  language: 'bg-purple-600',
  history: 'bg-orange-600',
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
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm h-60 flex flex-col card-hover animate-fade-in overflow-hidden">
      {/* Category stripe */}
      <div className={`h-2 ${categoryColors[category]}`} />
      
      {/* Card content */}
      <div className="flex-1 p-5 flex flex-col">
        {/* Title and instructor */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-primary mb-1 line-clamp-2 leading-tight">{name}</h3>
          <p className="text-sm text-secondary font-medium">by {instructor}</p>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.slice(0, 3).map((tag, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="text-xs bg-gray-100 text-secondary hover:bg-gray-200 border-0 px-2 py-1 rounded-md font-medium"
            >
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge 
              variant="secondary" 
              className="text-xs bg-gray-100 text-secondary border-0 px-2 py-1 rounded-md font-medium"
            >
              +{tags.length - 3}
            </Badge>
          )}
        </div>
        
        {/* Bottom section */}
        <div className="flex items-end justify-between mt-auto">
          {/* Member avatars */}
          <div className="flex -space-x-2">
            {displayedMembers.map((member, index) => (
              <Avatar key={member.id} className="w-8 h-8 border-2 border-white ring-1 ring-gray-200">
                <AvatarImage src={member.avatar} />
                <AvatarFallback className="text-xs bg-gray-100 text-secondary font-medium">
                  {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            ))}
            {extraMembersCount > 0 && (
              <div className="w-8 h-8 bg-gray-100 border-2 border-white ring-1 ring-gray-200 rounded-full flex items-center justify-center">
                <span className="text-xs text-secondary font-medium">+{extraMembersCount}</span>
              </div>
            )}
            {members.length === 0 && (
              <div className="w-8 h-8 bg-gray-50 border-2 border-gray-200 rounded-full flex items-center justify-center">
                <span className="text-xs text-gray-400">0</span>
              </div>
            )}
          </div>
          
          {/* Action buttons */}
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              onClick={() => onEnter(id)}
              className="bg-primary hover:bg-primary/90 text-white text-sm px-4 py-2 h-8 font-medium rounded-md shadow-sm"
            >
              Enter
            </Button>
            {isJoined && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onLeave(id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 text-sm px-3 py-2 h-8 font-medium rounded-md"
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
