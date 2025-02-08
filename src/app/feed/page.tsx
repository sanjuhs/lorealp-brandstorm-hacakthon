// import { Button } from "@/components/ui/button";
// import { PlusCircle, Home as HomeIcon, User } from "lucide-react";
import { BottomNav } from "@/components/bottom-nav";

export default function FeedPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FFF5E1]">
      {/* Main Feed Area */}
      <main className="flex-1 overflow-auto pb-20 p-4 w-full mx-auto">
        <div className="max-w-[470px] mx-auto space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="rounded-lg bg-white shadow-md p-4 border border-[#FFB74D]/20"
            >
              <div className="h-[470px] bg-[#FFB74D]/10 rounded-md mb-4"></div>
              <div className="h-4 bg-[#FFB74D]/10 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-[#FFB74D]/10 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
