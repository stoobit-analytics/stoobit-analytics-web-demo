"use client"

import { useState } from "react"
import { GalleryView } from "@/components/gallery-view"
import { FolderView } from "@/components/folder-view"
import { ImageDialog } from "@/components/image-dialog"
import { galleryData, type GalleryFolder, type GalleryImage } from "./data/gallery-data"

export default function Gallery() {
  const [folders, setFolders] = useState(galleryData)
  const [currentFolder, setCurrentFolder] = useState<GalleryFolder | null>(null)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleFolderClick = (folder: GalleryFolder) => {
    setCurrentFolder(folder)
  }

  const handleBackToGallery = () => {
    setCurrentFolder(null)
  }

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setSelectedImage(null)
  }

  const handleLike = (imageId: string) => {
    setFolders((prevFolders) =>
      prevFolders.map((folder) => ({
        ...folder,
        images: folder.images.map((image) =>
          image.id === imageId
            ? {
                ...image,
                isLiked: !image.isLiked,
                likes: image.isLiked ? image.likes - 1 : image.likes + 1,
              }
            : image,
        ),
      })),
    )

    // Update current folder if we're viewing one
    if (currentFolder) {
      setCurrentFolder((prevFolder) => ({
        ...prevFolder!,
        images: prevFolder!.images.map((image) =>
          image.id === imageId
            ? {
                ...image,
                isLiked: !image.isLiked,
                likes: image.isLiked ? image.likes - 1 : image.likes + 1,
              }
            : image,
        ),
      }))
    }

    // Update selected image if it's the one being liked
    if (selectedImage && selectedImage.id === imageId) {
      setSelectedImage((prevImage) => ({
        ...prevImage!,
        isLiked: !prevImage!.isLiked,
        likes: prevImage!.isLiked ? prevImage!.likes - 1 : prevImage!.likes + 1,
      }))
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 align-center">
        {currentFolder ? (
          <FolderView
            folder={currentFolder}
            onBack={handleBackToGallery}
            onImageClick={handleImageClick}
            onLike={handleLike}
          />
        ) : (
          <GalleryView folders={folders} onFolderClick={handleFolderClick} />
        )}

        <ImageDialog image={selectedImage} isOpen={isDialogOpen} onClose={handleCloseDialog} onLike={handleLike} />
      </div>
    </div>
  )
}
