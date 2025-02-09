import { Button } from "@/components/ui/button";
import { PlusCircle, Home as HomeIcon, User } from "lucide-react";
import Link from "next/link";

export function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#FFB74D]/20">
      <div className="flex justify-around items-center h-16 max-w-screen-sm mx-auto px-4">
        <Button
          asChild
          variant="ghost"
          className="flex flex-col items-center text-[#C4944C] hover:text-[#8B6B3D] hover:bg-[#FFF5E1]"
        >
          <Link href="/demo/feed">
            <HomeIcon size={24} />
            <span className="text-xs mt-1">Feed</span>
          </Link>
        </Button>

        <Button
          asChild
          variant="ghost"
          className="flex flex-col items-center text-[#C4944C] hover:text-[#8B6B3D] hover:bg-[#FFF5E1]"
        >
          <Link href="/demo/create">
            <PlusCircle size={24} />
            <span className="text-xs mt-1">Create</span>
          </Link>
        </Button>

        <Button
          asChild
          variant="ghost"
          className="flex flex-col items-center text-[#C4944C] hover:text-[#8B6B3D] hover:bg-[#FFF5E1]"
        >
          <Link href="/demo/profile">
            <User size={24} />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
