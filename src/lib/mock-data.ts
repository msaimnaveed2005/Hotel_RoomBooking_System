export interface Room {
  id: string;
  name: string;
  description: string;
  pricePerNight: number;
  maxGuests: number;
  amenities: string[];
  images: string[];
  rating: number;
  isFeatured?: boolean;
}

export interface Booking {
  id: string;
  roomId: string;
  roomName: string;
  guestName: string;
  checkIn: string;
  checkOut: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  totalAmount: number;
}

export const rooms: Room[] = [
  {
    id: "1",
    name: "Serene Garden Suite",
    description: "Immerse yourself in nature within our spacious garden suite. Featuring private terrace access, local stone finishes, and floor-to-ceiling glass windows that open up to our manicured botanical yards.",
    pricePerNight: 350,
    maxGuests: 2,
    amenities: ["Wifi", "Spa Access", "Mini Bar", "Private Terrace", "Rain Shower"],
    images: [
      "https://picsum.photos/seed/room-1-a/800/600",
      "https://picsum.photos/seed/room-1-b/800/600",
      "https://picsum.photos/seed/room-1-c/800/600",
    ],
    rating: 4.8,
    isFeatured: true,
  },
  {
    id: "2",
    name: "Aero Ocean Loft",
    description: "Perched high above the coastal cliffs, this duplex loft offers panoramic views of the turquoise waters. An open-concept floor plan designed for effortless flow, complete with custom walnut cabinetry and linen-draped furniture.",
    pricePerNight: 580,
    maxGuests: 3,
    amenities: ["Wifi", "Ocean View", "Balcony", "Spa Access", "Espresso Machine"],
    images: [
      "https://picsum.photos/seed/room-2-a/800/600",
      "https://picsum.photos/seed/room-2-b/800/600",
      "https://picsum.photos/seed/room-2-c/800/600",
    ],
    rating: 4.9,
    isFeatured: true,
  },
  {
    id: "3",
    name: "The Sanctuary Villa",
    description: "Our crowning jewel. The Sanctuary Villa is a standalone architectural masterpiece featuring an infinity plunge pool, full chef's kitchen, personal butler service, and direct, private access to a secluded sandy beach.",
    pricePerNight: 1250,
    maxGuests: 6,
    amenities: ["Wifi", "Private Pool", "Beach Access", "Butler Service", "Spa Access", "Kitchenette"],
    images: [
      "https://picsum.photos/seed/room-3-a/800/600",
      "https://picsum.photos/seed/room-3-b/800/600",
      "https://picsum.photos/seed/room-3-c/800/600",
    ],
    rating: 5.0,
    isFeatured: true,
  },
  {
    id: "4",
    name: "Deluxe Forest Haven",
    description: "A cozy, premium hideout surrounded by ancient redwoods. Experience rustic charm meets high-end minimalism with a wood-burning soapstone fireplace, plush organic sheets, and a hand-carved cedar soaking tub.",
    pricePerNight: 420,
    maxGuests: 2,
    amenities: ["Wifi", "Fireplace", "Cedar Tub", "Balcony", "Sound System"],
    images: [
      "https://picsum.photos/seed/room-4-a/800/600",
      "https://picsum.photos/seed/room-4-b/800/600",
    ],
    rating: 4.7,
  },
  {
    id: "5",
    name: "Minimalist Atelier Studio",
    description: "Tailored for the modern wanderer. A thoughtfully curated studio space emphasizing natural light, clean geometric lines, original artworks, and an integrated workspaces for creative reflection.",
    pricePerNight: 280,
    maxGuests: 2,
    amenities: ["Wifi", "Workplace", "Espresso Machine", "Spa Access"],
    images: [
      "https://picsum.photos/seed/room-5-a/800/600",
      "https://picsum.photos/seed/room-5-b/800/600",
    ],
    rating: 4.6,
  },
  {
    id: "6",
    name: "Panorama Cliff Vista",
    description: "Enjoy sunset views from this dramatic glass pavilion suspended over the shoreline. Features include a floating bed design, premium automated lighting, and a massive walk-in marble bathroom with steam features.",
    pricePerNight: 720,
    maxGuests: 2,
    amenities: ["Wifi", "Ocean View", "Balcony", "Steam Shower", "Mini Bar"],
    images: [
      "https://picsum.photos/seed/room-6-a/800/600",
      "https://picsum.photos/seed/room-6-b/800/600",
    ],
    rating: 4.9,
  },
  {
    id: "7",
    name: "Terracotta Oasis Hideaway",
    description: "Rich earth tones and plaster walls evoke a sense of deep grounding. Inspired by Mediterranean architecture, this unit features a private sun-drenched courtyard, terracotta tile work, and an outdoor shower.",
    pricePerNight: 390,
    maxGuests: 2,
    amenities: ["Wifi", "Courtyard", "Outdoor Shower", "Breakfast Included"],
    images: [
      "https://picsum.photos/seed/room-7-a/800/600",
      "https://picsum.photos/seed/room-7-b/800/600",
    ],
    rating: 4.8,
  },
  {
    id: "8",
    name: "Legacy Grand Penthouse",
    description: "Spanning the entire top floor of our main residence building. A monumental living space designed for luxury entertaining, showcasing custom European lighting, double-height ceilings, and two expansive terraces.",
    pricePerNight: 1600,
    maxGuests: 4,
    amenities: ["Wifi", "Ocean View", "Double Terraces", "Private Bar", "Chef Available", "Spa Access"],
    images: [
      "https://picsum.photos/seed/room-8-a/800/600",
      "https://picsum.photos/seed/room-8-b/800/600",
      "https://picsum.photos/seed/room-8-c/800/600",
    ],
    rating: 4.9,
  },
];

export const bookings: Booking[] = [
  {
    id: "HTL-94021",
    roomId: "3",
    roomName: "The Sanctuary Villa",
    guestName: "Alexander Wright",
    checkIn: "2026-07-12",
    checkOut: "2026-07-18",
    status: "Confirmed",
    totalAmount: 7500,
  },
  {
    id: "HTL-38102",
    roomId: "2",
    roomName: "Aero Ocean Loft",
    guestName: "Sophia Martinez",
    checkIn: "2026-07-14",
    checkOut: "2026-07-17",
    status: "Confirmed",
    totalAmount: 1740,
  },
  {
    id: "HTL-18492",
    roomId: "1",
    roomName: "Serene Garden Suite",
    guestName: "Marcus Sterling",
    checkIn: "2026-07-20",
    checkOut: "2026-07-22",
    status: "Pending",
    totalAmount: 700,
  },
  {
    id: "HTL-84910",
    roomId: "8",
    roomName: "Legacy Grand Penthouse",
    guestName: "Evelyn Ross",
    checkIn: "2026-08-01",
    checkOut: "2026-08-05",
    status: "Confirmed",
    totalAmount: 6400,
  },
  {
    id: "HTL-47201",
    roomId: "4",
    roomName: "Deluxe Forest Haven",
    guestName: "Julian Vance",
    checkIn: "2026-07-10",
    checkOut: "2026-07-14",
    status: "Cancelled",
    totalAmount: 1680,
  },
  {
    id: "HTL-28491",
    roomId: "5",
    roomName: "Minimalist Atelier Studio",
    guestName: "Clara Dupont",
    checkIn: "2026-07-19",
    checkOut: "2026-07-21",
    status: "Confirmed",
    totalAmount: 560,
  },
  {
    id: "HTL-64018",
    roomId: "6",
    roomName: "Panorama Cliff Vista",
    guestName: "Nikolai Volkov",
    checkIn: "2026-07-15",
    checkOut: "2026-07-19",
    status: "Pending",
    totalAmount: 2880,
  },
  {
    id: "HTL-93021",
    roomId: "7",
    roomName: "Terracotta Oasis Hideaway",
    guestName: "Elena Rostova",
    checkIn: "2026-07-24",
    checkOut: "2026-07-27",
    status: "Confirmed",
    totalAmount: 1170,
  },
  {
    id: "HTL-74829",
    roomId: "1",
    roomName: "Serene Garden Suite",
    guestName: "Charles Mercer",
    checkIn: "2026-07-08",
    checkOut: "2026-07-11",
    status: "Confirmed",
    totalAmount: 1050,
  },
  {
    id: "HTL-59102",
    roomId: "3",
    roomName: "The Sanctuary Villa",
    guestName: "Isabella Zhao",
    checkIn: "2026-08-10",
    checkOut: "2026-08-15",
    status: "Cancelled",
    totalAmount: 6250,
  },
  {
    id: "HTL-38291",
    roomId: "6",
    roomName: "Panorama Cliff Vista",
    guestName: "Arthur Pendelton",
    checkIn: "2026-07-30",
    checkOut: "2026-08-02",
    status: "Confirmed",
    totalAmount: 2160,
  },
  {
    id: "HTL-10294",
    roomId: "2",
    roomName: "Aero Ocean Loft",
    guestName: "Liam O'Connor",
    checkIn: "2026-07-28",
    checkOut: "2026-07-31",
    status: "Pending",
    totalAmount: 1740,
  },
];
