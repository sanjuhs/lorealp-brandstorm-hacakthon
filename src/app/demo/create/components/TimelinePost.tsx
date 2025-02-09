"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ReactCompareSlider } from "react-compare-slider";
// import { SkinAnalysisResult } from "@/app/api/analysis-skincare/route";
import Image from "next/image";
import { PostData } from "@/app/types";

interface TimelinePostProps {
  onPost: (post: PostData) => void;
}

export function TimelinePost({ onPost }: TimelinePostProps) {
  const [beforeImage, setBeforeImage] = useState<string>("");
  const [afterImage, setAfterImage] = useState<string>("");
  const [caption, setCaption] = useState("");
  const [description, setDescription] = useState("");
  const beforeImageRef = useRef<HTMLInputElement>(null);
  const afterImageRef = useRef<HTMLInputElement>(null);

  const handlePost = () => {
    onPost({
      type: "timeline",
      images: [beforeImage, afterImage],
      caption,
      description,
      analysisResults: [],
    });

    // Reset form
    setBeforeImage("");
    setAfterImage("");
    setCaption("");
    setDescription("");
  };

  return (
    <div className="space-y-4">
      <div className="aspect-square bg-white rounded-lg overflow-hidden">
        {beforeImage && afterImage ? (
          <ReactCompareSlider
            itemOne={
              <Image
                src={beforeImage}
                alt="Before"
                className="object-cover w-full h-full"
                width={500}
                height={500}
              />
            }
            itemTwo={
              <Image
                src={afterImage}
                alt="After"
                className="object-cover w-full h-full"
                width={500}
                height={500}
              />
            }
          />
        ) : (
          <div className="grid grid-cols-2 h-full">
            <div
              className="border-r border-[#FFB74D]/40 flex items-center justify-center cursor-pointer hover:bg-[#FFB74D]/5"
              onClick={() => beforeImageRef.current?.click()}
            >
              <Button variant="ghost" className="text-[#C4944C]">
                Upload Before
              </Button>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setBeforeImage(reader.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                ref={beforeImageRef}
              />
            </div>
            <div
              className="flex items-center justify-center cursor-pointer hover:bg-[#FFB74D]/5"
              onClick={() => afterImageRef.current?.click()}
            >
              <Button variant="ghost" className="text-[#C4944C]">
                Upload After
              </Button>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setAfterImage(reader.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                ref={afterImageRef}
              />
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <Input
          placeholder="Add a caption... *"
          className="bg-white border-[#FFB74D]/20"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          required
        />
        <Textarea
          placeholder="Add a description..."
          className="bg-white border-[#FFB74D]/20"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button
          className="w-full bg-[#C4944C] hover:bg-[#8B6B3D]"
          onClick={handlePost}
          disabled={!beforeImage || !afterImage || !caption.trim()}
        >
          Post
        </Button>
      </div>
    </div>
  );
}
