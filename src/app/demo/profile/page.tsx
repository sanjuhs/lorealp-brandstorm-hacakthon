"use client";

import { BottomNav } from "@/components/bottom-nav";
import { useEffect, useState } from "react";
import Image from "next/image";
import { User } from "lucide-react";
import { Post } from "@/app/types"; // Update the import to use the shared types

export default function ProfilePage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    // Filter posts for current user (Sanjay for now)
    const userPosts = storedPosts.filter(
      (post: Post) => post.username === "Sanjay"
    );
    setPosts(userPosts);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#FFF5E1]">
      <main className="flex-1 overflow-auto pb-20 p-4 w-full mx-auto">
        <div className="max-w-[470px] mx-auto">
          {/* Profile Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-20 h-20 rounded-full bg-[#FFB74D]/20 flex items-center justify-center">
              <User className="w-10 h-10 text-[#8B6B3D]" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#8B6B3D]">Sanjay</h1>
              <p className="text-sm text-[#C4944C]">Skincare Enthusiast</p>
            </div>
          </div>

          {/* Profile Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8 text-center">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="font-bold text-[#8B6B3D]">{posts.length}</div>
              <div className="text-sm text-[#C4944C]">Posts</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="font-bold text-[#8B6B3D]">
                {posts.reduce(
                  (acc, post) => acc + (post.votes?.better || 0),
                  0
                )}
              </div>
              <div className="text-sm text-[#C4944C]">Upvotes</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="font-bold text-[#8B6B3D]">
                {posts.filter((post) => post.type === "before-after").length}
              </div>
              <div className="text-sm text-[#C4944C]">Transformations</div>
            </div>
          </div>

          {/* Profile Grid */}
          <div className="grid grid-cols-3 gap-1">
            {posts.map((post) => (
              <div
                key={post.id}
                className="aspect-square relative rounded-md overflow-hidden"
              >
                <Image
                  src={
                    post.type === "before-after"
                      ? post.images[1]
                      : post.images[0]
                  }
                  alt={post.caption}
                  className="object-cover"
                  fill
                />
                {post.type === "before-after" && (
                  <div className="absolute bottom-1 right-1 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">
                    B/A
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
