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
import type { Post } from "@/app/types";
import { SAMPLE_POSTS } from "@/data/sample-posts";

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
                  {(post.type === "timeline" || post.type === "ai-edit") &&
                  post.images.length > 1 ? (
                    <div className="space-y-2">
                      <div className="relative w-full h-full">
                        <Image
                          src={post.images[0]}
                          alt={post.type === "timeline" ? "Before" : "Original"}
                          className="object-cover"
                          fill
                          sizes="(max-width: 500px) 100vw, 500px"
                          priority
                          style={{ objectPosition: "center" }}
                        />
                      </div>
                      <div className="relative w-full h-full">
                        <Image
                          src={post.images[1]}
                          alt={post.type === "timeline" ? "After" : "AI Edit"}
                          className="object-cover"
                          fill
                          sizes="(max-width: 500px) 100vw, 500px"
                          priority
                          style={{ objectPosition: "center" }}
                        />
                      </div>
                      <ReactCompareSlider
                        itemOne={
                          <div className="relative w-full h-full">
                            <Image
                              src={post.images[0]}
                              alt={
                                post.type === "timeline" ? "Before" : "Original"
                              }
                              className="object-cover"
                              fill
                              sizes="(max-width: 500px) 100vw, 500px"
                              priority
                              style={{ objectPosition: "center" }}
                            />
                          </div>
                        }
                        itemTwo={
                          <div className="relative w-full h-full">
                            <Image
                              src={post.images[1]}
                              alt={
                                post.type === "timeline" ? "After" : "AI Edit"
                              }
                              className="object-cover"
                              fill
                              sizes="(max-width: 500px) 100vw, 500px"
                              priority
                              style={{ objectPosition: "center" }}
                            />
                          </div>
                        }
                        position={50}
                        style={{
                          height: "500px",
                          width: "100%",
                        }}
                        className="rounded-lg"
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
                          {post.type === "timeline"
                            ? "Rate the transformation"
                            : "Rate the edit"}
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
                    <div className="mt-4 space-y-4">
                      {/* Regular Analysis Display */}
                      <div className="bg-[#FFB74D]/5 rounded-lg p-4">
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

                      {/* In-Depth Analysis Display */}
                      {post.analysisResults.some(
                        (result) => result.details
                      ) && (
                        <div className="bg-[#FFB74D]/5 rounded-lg p-4 space-y-6">
                          <h4 className="text-sm font-medium text-[#8B6B3D]">
                            Detailed Analysis
                          </h4>

                          {/* Fitzpatrick Scale Analysis */}
                          {post.analysisResults.find(
                            (r) => r.ruleId === "fitzpatrick"
                          ) && (
                            <div className="space-y-2">
                              <h5 className="text-xs font-medium text-[#8B6B3D] uppercase tracking-wide">
                                Fitzpatrick Scale Analysis
                              </h5>
                              <div className="rounded-md bg-white/50 p-3 space-y-3 text-sm">
                                {/* Get Fitzpatrick details */}
                                {(() => {
                                  const fitzResult = post.analysisResults.find(
                                    (r) => r.ruleId === "fitzpatrick"
                                  );
                                  return (
                                    <div className="space-y-4">
                                      <div>
                                        <h6 className="text-xs font-medium text-[#C4944C] mb-2">
                                          Characteristics
                                        </h6>
                                        <ul className="text-xs space-y-1">
                                          {fitzResult?.details?.characteristics?.map(
                                            (char, i) => (
                                              <li
                                                key={i}
                                                className="flex items-start gap-1"
                                              >
                                                <span className="text-[#C4944C]">
                                                  •
                                                </span>
                                                <span className="text-[#8B6B3D]">
                                                  {char}
                                                </span>
                                              </li>
                                            )
                                          )}
                                        </ul>
                                      </div>

                                      <div>
                                        <h6 className="text-xs font-medium text-[#C4944C] mb-2">
                                          Recommendations
                                        </h6>
                                        <ul className="text-xs space-y-1">
                                          {fitzResult?.details?.recommendations?.map(
                                            (rec, i) => (
                                              <li
                                                key={i}
                                                className="flex items-start gap-1"
                                              >
                                                <span className="text-[#C4944C]">
                                                  •
                                                </span>
                                                <span className="text-[#8B6B3D]">
                                                  {rec}
                                                </span>
                                              </li>
                                            )
                                          )}
                                        </ul>
                                      </div>

                                      <div>
                                        <h6 className="text-xs font-medium text-[#C4944C] mb-2">
                                          Risk Factors
                                        </h6>
                                        <ul className="text-xs space-y-1">
                                          {fitzResult?.details?.risks?.map(
                                            (risk, i) => (
                                              <li
                                                key={i}
                                                className="flex items-start gap-1"
                                              >
                                                <span className="text-[#C4944C]">
                                                  •
                                                </span>
                                                <span className="text-[#8B6B3D]">
                                                  {risk}
                                                </span>
                                              </li>
                                            )
                                          )}
                                        </ul>
                                      </div>
                                    </div>
                                  );
                                })()}
                              </div>
                            </div>
                          )}

                          {/* Andre Walker Hair Analysis */}
                          {post.analysisResults.find(
                            (r) => r.ruleId === "andre-walker"
                          ) && (
                            <div className="space-y-2">
                              <h5 className="text-xs font-medium text-[#8B6B3D] uppercase tracking-wide">
                                Andre Walker Hair Analysis
                              </h5>
                              <div className="rounded-md bg-white/50 p-3 space-y-3 text-sm">
                                {(() => {
                                  const hairResult = post.analysisResults.find(
                                    (r) => r.ruleId === "andre-walker"
                                  );
                                  return (
                                    <div className="space-y-4">
                                      <div>
                                        <h6 className="text-xs font-medium text-[#C4944C] mb-2">
                                          Hair Characteristics
                                        </h6>
                                        <div className="grid grid-cols-2 gap-2 text-xs">
                                          {Object.entries(
                                            hairResult?.details
                                              ?.hairCharacteristics || {}
                                          ).map(([key, value]) => (
                                            <div
                                              key={key}
                                              className="flex items-start gap-1"
                                            >
                                              <span className="text-[#C4944C] font-medium capitalize">
                                                {key}:
                                              </span>
                                              <span className="text-[#8B6B3D]">
                                                {value}
                                              </span>
                                            </div>
                                          ))}
                                        </div>
                                      </div>

                                      <div>
                                        <h6 className="text-xs font-medium text-[#C4944C] mb-2">
                                          Wave Pattern
                                        </h6>
                                        <p className="text-xs text-[#8B6B3D] mb-2">
                                          {
                                            hairResult?.details?.wavePattern
                                              ?.description
                                          }
                                        </p>
                                        <ul className="text-xs space-y-1">
                                          {hairResult?.details?.wavePattern?.features?.map(
                                            (feature, i) => (
                                              <li
                                                key={i}
                                                className="flex items-start gap-1"
                                              >
                                                <span className="text-[#C4944C]">
                                                  •
                                                </span>
                                                <span className="text-[#8B6B3D]">
                                                  {feature}
                                                </span>
                                              </li>
                                            )
                                          )}
                                        </ul>
                                      </div>

                                      <div>
                                        <h6 className="text-xs font-medium text-[#C4944C] mb-2">
                                          Care Needs
                                        </h6>
                                        <ul className="text-xs space-y-1">
                                          {hairResult?.details?.careNeeds?.map(
                                            (need, i) => (
                                              <li
                                                key={i}
                                                className="flex items-start gap-1"
                                              >
                                                <span className="text-[#C4944C]">
                                                  •
                                                </span>
                                                <span className="text-[#8B6B3D]">
                                                  {need}
                                                </span>
                                              </li>
                                            )
                                          )}
                                        </ul>
                                      </div>
                                    </div>
                                  );
                                })()}
                              </div>
                            </div>
                          )}

                          {/* Actionable Insights - Update the grid to show all sections */}
                          {post.actionableInsights && (
                            <div className="space-y-2">
                              <h5 className="text-xs font-medium text-[#8B6B3D] uppercase tracking-wide">
                                Actionable Insights
                              </h5>
                              <div className="grid grid-cols-3 gap-3">
                                <div className="bg-white/50 rounded-md p-3">
                                  <h6 className="text-xs font-medium text-[#C4944C] mb-2">
                                    Immediate Actions
                                  </h6>
                                  <ul className="text-xs space-y-1">
                                    {post.actionableInsights.immediate.map(
                                      (action, i) => (
                                        <li
                                          key={i}
                                          className="flex items-start gap-1"
                                        >
                                          <span className="text-[#C4944C]">
                                            •
                                          </span>
                                          <span className="text-[#8B6B3D]">
                                            {action}
                                          </span>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>

                                <div className="bg-white/50 rounded-md p-3">
                                  <h6 className="text-xs font-medium text-[#C4944C] mb-2">
                                    Short-term Goals
                                  </h6>
                                  <ul className="text-xs space-y-1">
                                    {post.actionableInsights.shortTerm.map(
                                      (action, i) => (
                                        <li
                                          key={i}
                                          className="flex items-start gap-1"
                                        >
                                          <span className="text-[#C4944C]">
                                            •
                                          </span>
                                          <span className="text-[#8B6B3D]">
                                            {action}
                                          </span>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>

                                <div className="bg-white/50 rounded-md p-3">
                                  <h6 className="text-xs font-medium text-[#C4944C] mb-2">
                                    Long-term Goals
                                  </h6>
                                  <ul className="text-xs space-y-1">
                                    {post.actionableInsights.longTerm.map(
                                      (action, i) => (
                                        <li
                                          key={i}
                                          className="flex items-start gap-1"
                                        >
                                          <span className="text-[#C4944C]">
                                            •
                                          </span>
                                          <span className="text-[#8B6B3D]">
                                            {action}
                                          </span>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
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
