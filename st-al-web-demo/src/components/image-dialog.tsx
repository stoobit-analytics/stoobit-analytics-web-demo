
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import type { GalleryImage } from "@/data/gallery-data"

interface ImageDialogProps {
  image: GalleryImage | null
  isOpen: boolean
  onClose: () => void
}

export function ImageDialog({ image, isOpen, onClose }: ImageDialogProps) {
  if (!image || !isOpen) return null

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black z-50 flex items-center justify-center">
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
        <h3 className="text-xl font-semibold text-white">{image.title}</h3>
        <Button
          variant="ghost"
          size="icon"
          className="bg-black/50 hover:bg-black/70 text-white"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <img
        src={image.src || "/placeholder.svg"}
        alt={image.title}
        className="max-w-full max-h-full object-contain"
      />
    </div>
  )
}
