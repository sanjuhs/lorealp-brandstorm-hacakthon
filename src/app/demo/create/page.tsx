"use client";

import { useState } from "react";
import { BottomNav } from "@/components/bottom-nav";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { AnalysisPost } from "./components/AnalysisPost";
import { AIEdit } from "./components/AIEdit";
import { TimelinePost } from "./components/TimelinePost";
import { PostData, Post } from "@/app/types";

type PostType = "analysis" | "ai-edit" | "timeline";

const postTypeInfo = {
  analysis: {
    title: "Analyze & Post",
    description:
      "Get AI analysis of your skin or hair condition and share the results",
    icon: "✨",
  },
  "ai-edit": {
    title: "AI Edit & Post",
    description: "Use AI to enhance or edit your image before posting",
    icon: "🎨",
  },
  timeline: {
    title: "Timeline Post",
    description: "Share your progress with before & after images",
    icon: "📅",
  },
};

export default function CreatePage() {
  const [selectedType, setSelectedType] = useState<PostType | null>(null);

  const handlePost = (postData: PostData) => {
    try {
      const existingPosts = JSON.parse(localStorage.getItem("posts") || "[]");
      if (existingPosts.length >= 10) {
        toast.error("Maximum post limit reached (10 posts)");
        return;
      }

      const newPost: Post = {
        id: uuidv4(),
        timestamp: Date.now(),
        username: "Sanjay",
        votes: { better: 0, worse: 0 },
        ...postData,
      } as Post;

      localStorage.setItem(
        "posts",
        JSON.stringify([newPost, ...existingPosts])
      );
      toast.success("Posted successfully!");
      setSelectedType(null);
    } catch (error) {
      console.error("Error saving post:", error);
      toast.error("Failed to save post");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FFF5E1]">
      <main className="flex-1 overflow-auto pb-20 p-4">
        <div className="max-w-[470px] mx-auto">
          {!selectedType ? (
            <div className="space-y-4">
              <h1 className="text-2xl font-semibold text-[#8B6B3D] mb-6">
                Create New Post
              </h1>
              {(Object.keys(postTypeInfo) as PostType[]).map((type) => (
                <div
                  key={type}
                  className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedType(type)}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{postTypeInfo[type].icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#8B6B3D]">
                        {postTypeInfo[type].title}
                      </h3>
                      <p className="text-sm text-[#8B6B3D]/70">
                        {postTypeInfo[type].description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">
                    {postTypeInfo[selectedType].icon}
                  </div>
                  <div>
                    <h2 className="font-semibold text-[#8B6B3D]">
                      {postTypeInfo[selectedType].title}
                    </h2>
                    <p className="text-sm text-[#8B6B3D]/70">
                      {postTypeInfo[selectedType].description}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  className="text-[#8B6B3D]"
                  onClick={() => setSelectedType(null)}
                >
                  Cancel
                </Button>
              </div>

              {selectedType === "analysis" && (
                <AnalysisPost onPost={handlePost} />
              )}
              {selectedType === "ai-edit" && <AIEdit onPost={handlePost} />}
              {selectedType === "timeline" && (
                <TimelinePost onPost={handlePost} />
              )}
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
