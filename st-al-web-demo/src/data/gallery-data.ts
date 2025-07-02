export interface GalleryImage {
  id: string
  title: string
  src: string
  likes: number
  isLiked: boolean
}

export interface GalleryFolder {
  id: string
  name: string
  thumbnail: string
  images: GalleryImage[]
}

export const galleryData: GalleryFolder[] = [
  {
    id: "nature",
    name: "Nature",
    thumbnail: "https://cdn.pixabay.com/photo/2020/06/21/09/48/hill-5324149_1280.jpg",
    images: [
      {
        id: "nature-1",
        title: "Kingfisher",
        src: "https://cdn.pixabay.com/photo/2023/05/03/11/20/bird-7967356_1280.jpg",
        likes: 24,
        isLiked: false,
      },
      {
        id: "nature-2",
        title: "Waterfall",
        src: "https://cdn.pixabay.com/photo/2020/05/28/04/42/waterfall-5229807_1280.jpg",
        likes: 18,
        isLiked: true,
      }
    ],
  },
  {
    id: "architecture",
    name: "Architecture",
    thumbnail: "https://cdn.pixabay.com/photo/2020/01/23/20/57/berlin-4788732_1280.jpg",
    images: [
      {
        id: "arch-1",
        title: "Milan Cathedrale",
        src: "https://cdn.pixabay.com/photo/2021/11/19/11/13/duomo-6808817_1280.jpg",
        likes: 41,
        isLiked: false,
      },
      {
        id: "arch-2",
        title: "Nyhavn",
        src: "https://cdn.pixabay.com/photo/2024/01/16/21/25/copenhagen-8513129_1280.jpg",
        likes: 28,
        isLiked: true,
      }
    ],
  }
]
