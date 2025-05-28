
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";

const Index = () => {
  return (
    <div className="min-h-screen flex bg-[#F5F5F5]">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        
        <main className="flex-1 p-6">
          <div className="text-center py-16">
            <h1 className="text-4xl font-bold text-primary mb-4">Welcome to Merge</h1>
            <p className="text-xl text-secondary">Your collaborative learning platform</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
