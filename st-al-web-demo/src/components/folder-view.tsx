import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Heart } from "lucide-react";
import type { GalleryFolder, GalleryImage } from "@/data/gallery-data";

interface FolderViewProps {
  folder: GalleryFolder;
  onBack: () => void;
  onImageClick: (image: GalleryImage) => void;
  onLike: (imageId: string) => void;
}

export function FolderView({ folder, onBack, onImageClick, onLike }: FolderViewProps) {
  // State to track when the folder was opened
  const [openTime, setOpenTime] = useState<number | null>(null);
  const [closeTime, setCloseTime] = useState<number | null>(null);

  // Set open time when the component mounts
  useEffect(() => {
    setOpenTime(Date.now()); // Time when the folder is opened

    // Clean up when the component unmounts or when the user navigates away
    return () => {
      setCloseTime(Date.now()); // Time when the folder is closed or the user leaves
      
    };
  }, []);

  // Calculate the time difference (duration) in seconds
  const calculateOpenDuration = () => {
    if (openTime && closeTime) {
      return Math.round((closeTime - openTime) / 1000); // Convert from milliseconds to seconds
    }
    return 0; // If times are not set, return 0
  };

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Gallery
        </Button>
        <h1 className="text-3xl font-bold">{folder.name}</h1>
        <span className="text-muted-foreground">({folder.images.length} images)</span>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
        {folder.images.map((image) => (
          <Card key={image.id} className="group cursor-pointer overflow-hidden">
            <CardContent className="p-0 relative">
              <div className="relative aspect-square overflow-hidden" onClick={() => onImageClick(image)}>
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </div>

              <div className="p-3">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium truncate">{image.title}</h3>
                    <p className="text-sm text-muted-foreground">{image.likes} likes</p>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      onLike(image.id);
                    }}
                    className="shrink-0 hover:bg-red-50"
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        image.isLiked ? "fill-red-500 text-red-500" : "text-muted-foreground hover:text-red-500"
                      }`}
                    />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}