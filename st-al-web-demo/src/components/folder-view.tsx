import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import type { GalleryFolder, GalleryImage } from "@/data/gallery-data";

interface FolderViewProps {
  folder: GalleryFolder;
  onBack: () => void;
  onImageClick: (image: GalleryImage) => void;
}

export function FolderView({ folder, onBack, onImageClick }: FolderViewProps) {
  return (
    <div className="space-y-4 w-full">
      <div className="text-center">
        <h1 className="text-4xl font-bold">{folder.name}</h1>
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
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Gallery
        </Button>
      </div>
    </div>
  );
}