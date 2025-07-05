import { Card, CardContent } from "@/components/ui/card"
import { Folder, Images } from "lucide-react"
import type { GalleryFolder } from "@/data/gallery-data"

interface GalleryViewProps {
  folders: GalleryFolder[]
  onFolderClick: (folder: GalleryFolder) => void
}

export function GalleryView({ folders, onFolderClick }: GalleryViewProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">Photo Gallery</h1>
        <p className="text-muted-foreground">Explore our collection of beautiful images</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {folders.map((folder) => (
          <Card
            key={folder.id}
            className="group cursor-pointer overflow-hidden hover:shadow-lg transition-shadow"
            onClick={() => {
              onFolderClick(folder)}}
          >
            <CardContent className="p-0">
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={folder.thumbnail || "/placeholder.svg"}
                  alt={folder.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                <div className="absolute top-4 left-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                    <Folder className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{folder.name}</h3>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Images className="h-4 w-4" />
                    <span className="text-sm">{folder.images.length}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
