"use client"

import { useState, useEffect } from "react"
import { GalleryView } from "@/components/gallery-view"
import { FolderView } from "@/components/folder-view"
import { ImageDialog } from "@/components/image-dialog"
import { galleryData, type GalleryFolder, type GalleryImage } from "./data/gallery-data"
import { categoryOpened, imageOpened } from "./AnalyticsCalls"

export default function Gallery() {
  const [folders] = useState(galleryData)
  const [currentFolder, setCurrentFolder] = useState<GalleryFolder | null>(null)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

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
        const folder = currentFolder as GalleryFolder
        const image = folder.images.find((img: GalleryImage) => img.id === imageId)
        if (image && !isDialogOpen) {
          setSelectedImage(image)
          setIsDialogOpen(true)
          // Kein Analytics Call bei Browser-Navigation
        }
      } else if (folderId && !imageId) {
        // Nur Ordner öffnen
        const folder = galleryData.find(f => f.id === folderId)
        if (folder && !currentFolder) {
          setCurrentFolder(folder)
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
        
        if (imageId) {
          const image = folder.images.find(img => img.id === imageId)
          if (image) {
            setSelectedImage(image)
            setIsDialogOpen(true)
            // Kein Analytics Call hier - nur bei direkten Klicks
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
    categoryOpened(folder.name)
    setCurrentFolder(folder)
    
    // URL aktualisieren
    const url = new URL(window.location.href)
    url.searchParams.set('folder', folder.id)
    window.history.pushState({}, '', url)
  }

  const handleBackToGallery = () => {
    // Dialog schließen und zurücksetzen
    setIsDialogOpen(false)
    setSelectedImage(null)
    
    setCurrentFolder(null)
    
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
