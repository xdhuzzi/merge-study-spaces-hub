
import { Plus } from "lucide-react";

interface CreateRoomFABProps {
  onClick: () => void;
}

const CreateRoomFAB = ({ onClick }: CreateRoomFABProps) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 bg-accent hover:bg-accent/90 text-white rounded-full shadow-lg hover-lift flex items-center justify-center transition-all duration-200 hover:shadow-xl z-50"
      aria-label="Create new room"
    >
      <Plus size={24} />
    </button>
  );
};

export default CreateRoomFAB;
