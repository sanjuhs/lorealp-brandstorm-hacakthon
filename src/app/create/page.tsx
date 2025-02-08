import { BottomNav } from "@/components/bottom-nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function CreatePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FFF5E1]">
      <main className="flex-1 overflow-auto pb-20 p-4 w-full mx-auto">
        <div className="max-w-[470px] mx-auto space-y-6">
          <h1 className="text-2xl font-bold text-[#8B6B3D]">Create New Post</h1>

          {/* Upload Area */}
          <div className="aspect-square bg-white rounded-lg border-2 border-dashed border-[#FFB74D]/40 flex items-center justify-center">
            <Button variant="ghost" className="text-[#C4944C]">
              Click to upload image
            </Button>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <Input
              placeholder="Add a caption..."
              className="bg-white border-[#FFB74D]/20"
            />
            <Textarea
              placeholder="Add a description..."
              className="bg-white border-[#FFB74D]/20"
            />
            <Button className="w-full bg-[#C4944C] hover:bg-[#8B6B3D]">
              Post
            </Button>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
