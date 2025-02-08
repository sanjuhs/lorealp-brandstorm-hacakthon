import { BottomNav } from "@/components/bottom-nav";

export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FFF5E1]">
      <main className="flex-1 overflow-auto pb-20 p-4 w-full mx-auto">
        <div className="max-w-[470px] mx-auto">
          {/* Profile Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-20 h-20 rounded-full bg-[#FFB74D]/20"></div>
            <div>
              <h1 className="text-xl font-bold text-[#8B6B3D]">Username</h1>
              <p className="text-sm text-[#C4944C]">Bio goes here</p>
            </div>
          </div>

          {/* Profile Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8 text-center">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="font-bold text-[#8B6B3D]">150</div>
              <div className="text-sm text-[#C4944C]">Posts</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="font-bold text-[#8B6B3D]">2.5k</div>
              <div className="text-sm text-[#C4944C]">Followers</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="font-bold text-[#8B6B3D]">500</div>
              <div className="text-sm text-[#C4944C]">Following</div>
            </div>
          </div>

          {/* Profile Grid */}
          <div className="grid grid-cols-3 gap-1">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="aspect-square bg-[#FFB74D]/10 rounded-md"
              ></div>
            ))}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
