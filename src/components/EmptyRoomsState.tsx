
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyRoomsStateProps {
  onCreateRoom: () => void;
}

const EmptyRoomsState = ({ onCreateRoom }: EmptyRoomsStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-fade-in">
      <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
        <Users size={40} className="text-secondary" />
      </div>
      <h3 className="text-lg font-semibold text-primary mb-2">No rooms found</h3>
      <p className="text-secondary mb-6 max-w-md leading-relaxed">
        Create or join a room to get started! Connect with other students and instructors in collaborative study spaces.
      </p>
      <Button 
        onClick={onCreateRoom}
        className="bg-accent hover:bg-accent/90 text-white px-6 py-2 font-medium shadow-sm"
      >
        Create Room
      </Button>
    </div>
  );
};

export default EmptyRoomsState;
