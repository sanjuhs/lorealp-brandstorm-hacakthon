"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { PostData } from "@/app/types"; // Import the shared PostData type

// interface AnalysisResult {
//   ruleId: string;
//   compliant: boolean;
//   explanation: string;
//   score: number;
//   recommendedProducts: string[];
// }

interface AIEditPostProps {
  onPost: (post: PostData) => void; // Use the shared PostData type
}

export function AIEdit({ onPost }: AIEditPostProps) {
  const [image, setImage] = useState<string>("");
  const [caption, setCaption] = useState("");
  const [description, setDescription] = useState("");
  const [editPrompt, setEditPrompt] = useState("");
  const [processing, setProcessing] = useState(false);
  const [editedImage, setEditedImage] = useState<string>("");
  const imageRef = useRef<HTMLInputElement>(null);

  const handleEdit = async () => {
    if (!image || !editPrompt) return;

    setProcessing(true);
    try {
      const response = await fetch("/api/edit-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: image.split(",")[1],
          prompt: editPrompt,
        }),
      });

      if (!response.ok) throw new Error("Image editing failed");

      const result = await response.json();
      setEditedImage(result.editedImage);
      setDescription(`Original prompt: ${editPrompt}\n\nEdited using AI`);
    } catch (error) {
      console.error("Edit error:", error);
    } finally {
      setProcessing(false);
    }
  };

  const handlePost = () => {
    onPost({
      type: "ai-edit",
      images: [image, editedImage],
      caption,
      description,
      analysisResults: [],
      editPrompt,
    });

    // Reset form
    setImage("");
    setEditedImage("");
    setCaption("");
    setDescription("");
    setEditPrompt("");
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Original Image Upload */}
        <div
          className="aspect-square bg-white rounded-lg border-2 border-dashed border-[#FFB74D]/40 flex items-center justify-center relative overflow-hidden"
          onClick={() => imageRef.current?.click()}
        >
          {image ? (
            <Image
              src={image}
              alt="Original"
              className="object-cover w-full h-full"
              width={500}
              height={500}
            />
          ) : (
            <Button variant="ghost" className="text-[#C4944C]">
              Upload original image
            </Button>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setImage(reader.result as string);
                };
                reader.readAsDataURL(file);
              }
            }}
            ref={imageRef}
          />
        </div>

        {/* Edited Image Display */}
        <div className="aspect-square bg-white rounded-lg border-2 border-[#FFB74D]/40 flex items-center justify-center relative overflow-hidden">
          {editedImage ? (
            <Image
              src={editedImage}
              alt="Edited"
              className="object-cover w-full h-full"
              width={500}
              height={500}
            />
          ) : (
            <div className="text-[#8B6B3D]/50 text-sm text-center p-4">
              Edited image will appear here
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex gap-4">
          <Input
            placeholder="Enter edit instructions..."
            className="bg-white border-[#FFB74D]/20 flex-1"
            value={editPrompt}
            onChange={(e) => setEditPrompt(e.target.value)}
          />
          <Button
            onClick={handleEdit}
            className="bg-[#C4944C] hover:bg-[#8B6B3D] whitespace-nowrap"
            disabled={!image || !editPrompt.trim() || processing}
          >
            {processing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              "Apply Edit"
            )}
          </Button>
        </div>

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
          disabled={!image || !caption.trim()}
        >
          Post
        </Button>
      </div>
    </div>
  );
}
