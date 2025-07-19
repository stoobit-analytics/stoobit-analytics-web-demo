
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Heart, X } from "lucide-react"
import type { GalleryImage } from "@/data/gallery-data"

interface ImageDialogProps {
  image: GalleryImage | null
  isOpen: boolean
  onClose: () => void
  onLike: (imageId: string) => void
}

export function ImageDialog({ image, isOpen, onClose, onLike }: ImageDialogProps) {
  if (!image) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full p-0">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>

          <div className="relative aspect-video">
            <img
              src={image.src || "/placeholder.svg"}
              alt={image.title}
              className="w-full h-full object-cover rounded-t-lg"
            />
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">{image.title}</h3>
                <p className="text-muted-foreground">{image.likes} likes</p>
              </div>

              <Button variant="ghost" size="icon" onClick={() => onLike(image.id)} className="hover:bg-red-50">
                <Heart
                  className={`h-5 w-5 ${image.isLiked ? "fill-red-500 text-red-500" : "text-muted-foreground hover:text-red-500"
                    }`}
                />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
