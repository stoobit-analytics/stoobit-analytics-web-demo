"use client"

import { useState, useEffect } from "react"
import { GalleryView } from "@/components/gallery-view"
import { FolderView } from "@/components/folder-view"
import { ImageDialog } from "@/components/image-dialog"
import { galleryData, type GalleryFolder, type GalleryImage } from "./data/gallery-data"
import { categoryOpened, categoryTime, imageLiked, imageOpened } from "./AnalyticsCalls"

export default function Gallery() {
  const [folders, setFolders] = useState(galleryData)
  const [currentFolder, setCurrentFolder] = useState<GalleryFolder | null>(null)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [openTimeFolder, setOpenTimeFolder] = useState<Date | null>(null)

  // URL-Navigation unterstützen
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      // Wenn ein Bild geöffnet ist, nur das Bild schließen
      if (isDialogOpen) {
        event.preventDefault()
        handleCloseDialog()
        return
      }
      
      // Wenn wir in einem Ordner sind (aber kein Bild offen), zur Galerie zurück
      if (currentFolder) {
        event.preventDefault()
        handleBackToGallery()
        return
      }
      
      const urlParams = new URLSearchParams(window.location.search)
      const folderId = urlParams.get('folder')
      const imageId = urlParams.get('image')
      
      if (imageId && currentFolder) {
        // Bild-Dialog öffnen
        const image = currentFolder.images.find((img: any) => img.id === imageId)
        if (image && !isDialogOpen) {
          setSelectedImage(image)
          setIsDialogOpen(true)
          imageOpened(image.title, currentFolder.name)
        }
      } else if (folderId && !imageId) {
        // Nur Ordner öffnen
        const folder = galleryData.find(f => f.id === folderId)
        if (folder && !currentFolder) {
          setCurrentFolder(folder)
          setOpenTimeFolder(new Date())
        }
        // Dialog schließen falls geöffnet
        if (isDialogOpen) {
          setIsDialogOpen(false)
          setSelectedImage(null)
        }
      } else {
        // Zurück zur Hauptgalerie
        if (currentFolder) {
          handleBackToGallery()
        }
        if (isDialogOpen) {
          setIsDialogOpen(false)
          setSelectedImage(null)
        }
      }
    }

    // Initial URL check
    const urlParams = new URLSearchParams(window.location.search)
    const folderId = urlParams.get('folder')
    const imageId = urlParams.get('image')
    
    if (folderId) {
      const folder = galleryData.find(f => f.id === folderId)
      if (folder) {
        setCurrentFolder(folder)
        setOpenTimeFolder(new Date())
        
        if (imageId) {
          const image = folder.images.find(img => img.id === imageId)
          if (image) {
            setSelectedImage(image)
            setIsDialogOpen(true)
            imageOpened(image.title, folder.name)
          }
        }
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [currentFolder, isDialogOpen])

  // Scroll-Position zurücksetzen wenn sich die View ändert
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentFolder])

  const handleFolderClick = (folder: GalleryFolder) => {
    setOpenTimeFolder(new Date())
    categoryOpened(folder.name)
    setCurrentFolder(folder)
    
    // URL aktualisieren
    const url = new URL(window.location.href)
    url.searchParams.set('folder', folder.id)
    window.history.pushState({}, '', url)
  }

  const handleBackToGallery = () => {
    if (openTimeFolder) {
      const diff = (new Date().getTime() - openTimeFolder.getTime())
      categoryTime((diff / 1000).toString(), currentFolder?.name)
    }
    
    // Dialog schließen und zurücksetzen
    setIsDialogOpen(false)
    setSelectedImage(null)
    
    setCurrentFolder(null)
    setOpenTimeFolder(null)
    
    // URL zurücksetzen
    const url = new URL(window.location.href)
    url.searchParams.delete('folder')
    url.searchParams.delete('image')
    window.history.pushState({}, '', url.pathname + (url.search ? url.search : ''))
  }

  const handleImageClick = (image: GalleryImage) => {
    console.log(image.title)
    imageOpened(image.title, currentFolder!.name)
    setSelectedImage(image)
    setIsDialogOpen(true)
    
    // URL aktualisieren mit Bild-Parameter
    const url = new URL(window.location.href)
    url.searchParams.set('folder', currentFolder!.id)
    url.searchParams.set('image', image.id)
    window.history.pushState({}, '', url)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setSelectedImage(null)
    
    // Bild-Parameter aus URL entfernen, Ordner behalten
    const url = new URL(window.location.href)
    url.searchParams.delete('image')
    window.history.pushState({}, '', url)
  }

  const handleLike = (imageId: string, title: string | undefined, folder: string | undefined,) => {
    imageLiked(title, folder)
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
          />
        ) : (
          <GalleryView folders={folders} onFolderClick={handleFolderClick} />
        )}

        <ImageDialog image={selectedImage} isOpen={isDialogOpen} onClose={handleCloseDialog} />
      </div>
    </div>
  )
}
