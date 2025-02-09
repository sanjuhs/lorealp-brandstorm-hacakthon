"use client";

import { useEffect, useState } from "react";
import { BottomNav } from "@/components/bottom-nav";
import { toast } from "sonner";
import Image from "next/image";
import { User, ThumbsUp, ThumbsDown } from "lucide-react";
import {
  ReactCompareSlider,
  // ReactCompareSliderImage,
} from "react-compare-slider";
import type { AnalysisResult } from "@/types";
import { SAMPLE_POSTS } from "@/data/sample-posts";

interface Post {
  id: string;
  type: string;
  images: string[];
  caption: string;
  description: string;
  timestamp: number;
  username?: string;
  votes?: {
    better: number;
    worse: number;
  };
  analysisResults?: AnalysisResult[];
}

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // Check if posts exist in localStorage
      const storedPosts = localStorage.getItem("posts");
      if (!storedPosts) {
        // If no posts exist, use sample data
        localStorage.setItem("posts", JSON.stringify(SAMPLE_POSTS));
        setPosts(SAMPLE_POSTS);
      } else {
        setPosts(JSON.parse(storedPosts));
      }
    } catch (error) {
      toast.error("Failed to load posts");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleVote = (postId: string, voteType: "better" | "worse") => {
    setPosts((currentPosts) => {
      const updatedPosts = currentPosts.map((post) => {
        if (post.id === postId) {
          const votes = post.votes || { better: 0, worse: 0 };
          return {
            ...post,
            votes: {
              ...votes,
              [voteType]: (votes[voteType] || 0) + 1,
            },
          };
        }
        return post;
      });

      // Update localStorage
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
      return updatedPosts;
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FFF5E1]">
      <main className="flex-1 overflow-auto pb-20 p-4">
        <div className="max-w-[470px] mx-auto space-y-6">
          {loading ? (
            <div className="text-center text-[#8B6B3D]">Loading posts...</div>
          ) : posts.length === 0 ? (
            <div className="text-center text-[#8B6B3D]">
              No posts yet. Create your first post!
            </div>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg p-4 shadow-sm">
                <div className="space-y-3">
                  {/* Compact Header */}
                  <div className="flex items-center gap-2 h-6">
                    <div className="flex-shrink-0 w-6 h-6 bg-[#FFB74D]/10 rounded-full flex items-center justify-center">
                      <User className="w-3 h-3 text-[#8B6B3D]" />
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-medium text-[#8B6B3D]">
                        {post.username || "Sanjay"}
                      </span>
                      <span className="text-[#8B6B3D]/50">•</span>
                      <span className="text-[#8B6B3D]/50">
                        {new Date(post.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Thin Divider */}
                  <div className="h-[1px] bg-[#FFB74D]/10" />

                  {/* Image Section */}
                  {post.type === "before-after" ? (
                    <div className="space-y-2">
                      <div className="aspect-square rounded-lg overflow-hidden relative group">
                        {/* Slider Hint Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                          <div className="bg-black/30 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm">
                            Slide to compare
                          </div>
                        </div>

                        <ReactCompareSlider
                          itemOne={
                            <Image
                              src={post.images[0]}
                              alt="Before"
                              className="object-cover"
                              width={400}
                              height={400}
                            />
                          }
                          itemTwo={
                            <Image
                              src={post.images[1]}
                              alt="After"
                              className="object-cover"
                              width={400}
                              height={400}
                            />
                          }
                          position={50}
                          style={{
                            height: "100%",
                          }}
                          className="h-full"
                          handle={
                            <div className="flex flex-col items-center gap-1">
                              <div className="w-1 h-12 bg-white rounded-full shadow-lg" />
                              <div className="w-4 h-4 rounded-full bg-white shadow-lg flex items-center justify-center">
                                <div className="w-2 h-2 bg-[#FFB74D] rounded-full" />
                              </div>
                              <div className="w-1 h-12 bg-white rounded-full shadow-lg" />
                            </div>
                          }
                        />
                      </div>

                      {/* Voting Section */}
                      <div className="flex items-center justify-center gap-6 py-2">
                        <button
                          onClick={() => handleVote(post.id, "better")}
                          className="flex items-center gap-1 text-xs hover:scale-110 transition-transform"
                        >
                          <div className="w-8 h-8 rounded-full bg-[#FFB74D]/10 flex items-center justify-center">
                            <ThumbsUp className="w-4 h-4 text-[#8B6B3D]" />
                          </div>
                          <span className="text-[#8B6B3D]">
                            {post.votes?.better || 0}
                          </span>
                        </button>
                        <div className="text-xs text-[#8B6B3D]/50">
                          Rate the transformation
                        </div>
                        <button
                          onClick={() => handleVote(post.id, "worse")}
                          className="flex items-center gap-1 text-xs hover:scale-110 transition-transform"
                        >
                          <div className="w-8 h-8 rounded-full bg-[#FFB74D]/10 flex items-center justify-center">
                            <ThumbsDown className="w-4 h-4 text-[#8B6B3D]" />
                          </div>
                          <span className="text-[#8B6B3D]">
                            {post.votes?.worse || 0}
                          </span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={post.images[0]}
                      alt="Post"
                      className="w-full aspect-square object-cover rounded-lg"
                      width={400}
                      height={400}
                    />
                  )}

                  {/* Caption and Description */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-[#8B6B3D]">
                      {post.caption}
                    </h3>
                    {post.description && (
                      <p className="text-sm text-[#8B6B3D]/70">
                        {post.description}
                      </p>
                    )}
                  </div>

                  {/* Interaction Buttons */}
                  <div className="flex items-center gap-4">
                    <button className="text-xs text-[#8B6B3D]/70 hover:text-[#8B6B3D]">
                      Like
                    </button>
                    <button className="text-xs text-[#8B6B3D]/70 hover:text-[#8B6B3D]">
                      Comment
                    </button>
                    <button className="text-xs text-[#8B6B3D]/70 hover:text-[#8B6B3D]">
                      Share
                    </button>
                  </div>

                  {post.type === "analysis" && post.analysisResults && (
                    <div className="mt-4 bg-[#FFB74D]/5 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-[#8B6B3D] mb-2">
                        Analysis Results
                      </h4>
                      <div className="space-y-2">
                        {post.analysisResults.map((result) => (
                          <div
                            key={result.ruleId}
                            className="flex items-start gap-2 text-xs"
                          >
                            <div
                              className={`w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center ${
                                result.compliant
                                  ? "bg-green-100 text-green-600"
                                  : "bg-red-100 text-red-600"
                              }`}
                            >
                              {result.compliant ? "✓" : "×"}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-[#8B6B3D]">
                                Score: {result.score}/5
                              </div>
                              <p className="text-[#8B6B3D]/70">
                                {result.explanation}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
