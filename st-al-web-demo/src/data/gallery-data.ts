export interface GalleryImage {
  id: string;
  title: string;
  src: string;
  likes: number;
  isLiked: boolean;
}

export interface GalleryFolder {
  id: string;
  name: string;
  thumbnail: string;
  images: GalleryImage[];
}

export const galleryData: GalleryFolder[] = [
  {
    id: "nature",
    name: "Natur",
    thumbnail: "https://cdn.pixabay.com/photo/2020/06/21/09/48/hill-5324149_1280.jpg",
    images: [
      {
        id: "nature-1",
        title: "Eisvogel",
        src: "https://cdn.pixabay.com/photo/2023/05/03/11/20/bird-7967356_1280.jpg",
        likes: 24,
        isLiked: false,
      },
      {
        id: "nature-2",
        title: "Wasserfall",
        src: "https://cdn.pixabay.com/photo/2020/05/28/04/42/waterfall-5229807_1280.jpg",
        likes: 32,
        isLiked: false,
      },
      {
        id: "nature-3",
        title: "Singvogel",
        src: "https://cdn.pixabay.com/photo/2024/04/15/14/25/vogel-8697931_1280.jpg",
        likes: 19,
        isLiked: false,
      },
      {
        id: "nature-4",
        title: "Eichelhäher",
        src: "https://cdn.pixabay.com/photo/2024/05/28/17/15/eichelhaher-8794372_1280.jpg",
        likes: 21,
        isLiked: false,
      },
      {
        id: "nature-5",
        title: "Schrecksee",
        src: "https://cdn.pixabay.com/photo/2022/10/08/09/51/schrecksee-7506653_1280.jpg",
        likes: 44,
        isLiked: false,
      },
      {
        id: "nature-6",
        title: "Möwe am Strand",
        src: "https://cdn.pixabay.com/photo/2015/10/06/16/50/seagull-974789_1280.jpg",
        likes: 13,
        isLiked: false,
      },
      {
        id: "nature-7",
        title: "Niagarafälle",
        src: "https://cdn.pixabay.com/photo/2017/10/05/18/35/niagara-2820445_1280.jpg",
        likes: 37,
        isLiked: false,
      },
    ],
  },
  {
    id: "architecture",
    name: "Architektur",
    thumbnail: "https://cdn.pixabay.com/photo/2020/01/23/20/57/berlin-4788732_1280.jpg",
    images: [
      {
        id: "arch-1",
        title: "Mailänder Dom",
        src: "https://cdn.pixabay.com/photo/2021/11/19/11/13/duomo-6808817_1280.jpg",
        likes: 41,
        isLiked: false,
      },
      {
        id: "arch-2",
        title: "Nyhavn, Kopenhagen",
        src: "https://cdn.pixabay.com/photo/2024/01/16/21/25/copenhagen-8513129_1280.jpg",
        likes: 52,
        isLiked: false,
      },
      {
        id: "arch-3",
        title: "The Shard, London",
        src: "https://cdn.pixabay.com/photo/2018/08/11/16/50/london-3598951_1280.jpg",
        likes: 36,
        isLiked: false,
      },
      {
        id: "arch-4",
        title: "Sydney Opernhaus",
        src: "https://cdn.pixabay.com/photo/2014/05/26/09/58/sydney-opera-house-354375_1280.jpg", // URL sollte ggf. ersetzt werden
        likes: 25,
        isLiked: false,
      },
      {
        id: "arch-5",
        title: "Florenz",
        src: "https://cdn.pixabay.com/photo/2017/09/05/15/48/florence-2718182_1280.jpg",
        likes: 31,
        isLiked: false,
      },
      {
        id: "arch-6",
        title: "Petersdom, Rom",
        src: "https://cdn.pixabay.com/photo/2017/02/05/17/40/saint-peters-basilica-2040718_1280.jpg",
        likes: 47,
        isLiked: false,
      },
      {
        id: "arch-7",
        title: "Venedig",
        src: "https://cdn.pixabay.com/photo/2020/01/22/18/24/venice-4785972_1280.jpg", // URL doppelt, ggf. anpassen
        likes: 34,
        isLiked: false,
      },
    ],
  },
  {
    id: "berge",
    name: "Berge",
    thumbnail: "https://cdn.pixabay.com/photo/2015/07/09/16/36/landschaft-838053_1280.jpg",
    images: [
      {
        id: "berge-1",
        title: "Großglockner",
        src: "https://cdn.pixabay.com/photo/2019/10/23/05/27/kals-4570418_1280.jpg",
        likes: 41,
        isLiked: false,
      },
      {
        id: "berge-2",
        title: "Kilimandscharo",
        src: "https://cdn.pixabay.com/photo/2022/07/10/06/08/mount-kilimanjaro-7312238_1280.jpg",
        likes: 55,
        isLiked: false,
      },
      {
        id: "berge-3",
        title: "Zugspitze",
        src: "https://cdn.pixabay.com/photo/2022/07/30/03/13/eibsee-7352987_1280.jpg",
        likes: 30,
        isLiked: false,
      },
      {
        id: "berge-4",
        title: "Himalaya",
        src: "https://cdn.pixabay.com/photo/2017/02/14/03/03/ama-dablam-2064522_1280.jpg",
        likes: 49,
        isLiked: false,
      },
      {
        id: "berge-5",
        title: "Mount Everest",
        src: "https://cdn.pixabay.com/photo/2010/11/29/mount-everest-413_1280.jpg",
        likes: 66,
        isLiked: false,
      },
      {
        id: "berge-6",
        title: "Fuji",
        src: "https://cdn.pixabay.com/photo/2022/03/20/15/40/nature-7081138_1280.jpg",
        likes: 42,
        isLiked: false,
      },
      {
        id: "berge-7",
        title: "Mont Blanc",
        src: "https://cdn.pixabay.com/photo/2018/03/02/18/29/snow-3193865_1280.jpg", // gleiches Bild wie Fuji
        likes: 31,
        isLiked: false,
      },
    ],
  },
];