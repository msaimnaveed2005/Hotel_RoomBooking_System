export interface RoomReview {
  name: string;
  location: string;
  rating: number;
  text: string;
}

export interface Room {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  pricePerNight: number;
  maxGuests: number;
  amenities: string[];
  images: string[];
  rating: number;
  isFeatured?: boolean;
  reviews: RoomReview[];
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
    fullDescription: "The Serene Garden Suite is a botanical sanctuary where handcrafted stone pathways lead to your private terrace framed by jasmine and wild lavender. Interior spaces are dressed in raw linen and warm oak, with a soaking tub positioned beneath a skylight that frames the canopy above. Every morning, a curated breakfast of seasonal fruits and artisan pastries is delivered to your door.",
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
    reviews: [
      {
        name: "Adrienne Astley",
        location: "London, UK",
        rating: 5,
        text: "The architecture of the garden suite is stunning. Waking up to private courtyard trees and having a personal therapist arrange volcanic mud treatments at the spa was unforgettable.",
      },
      {
        name: "Carlos Mendez",
        location: "Buenos Aires, Argentina",
        rating: 4,
        text: "Peaceful and beautifully designed. The rain shower is heavenly, and the terrace is perfect for morning yoga. The botanical garden just outside your door creates an extraordinary sense of calm.",
      },
    ],
  },
  {
    id: "2",
    name: "Aero Ocean Loft",
    description: "Perched high above the coastal cliffs, this duplex loft offers panoramic views of the turquoise waters. An open-concept floor plan designed for effortless flow, complete with custom walnut cabinetry and linen-draped furniture.",
    fullDescription: "The Aero Ocean Loft is an architectural feat suspended between sky and sea, with double-height windows that dissolve the boundary between interior luxury and the vast Pacific horizon. The upper mezzanine houses a cloud-like king bed while the lower level features a sunken living area with hand-poured concrete floors and bespoke Italian furnishings. Dawn here is an event — watch the sun rise from your cliffside balcony while sipping espresso from the in-suite Marzocco machine.",
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
    reviews: [
      {
        name: "Helena Fournier",
        location: "Marseille, France",
        rating: 5,
        text: "The duplex layout gives you a sense of grandeur that most hotels simply cannot replicate. The ocean views from the mezzanine bedroom at sunrise were worth the trip alone. Truly world-class.",
      },
      {
        name: "James Whitfield",
        location: "Sydney, Australia",
        rating: 5,
        text: "I've stayed at luxury resorts across Southeast Asia and the Pacific, but this loft is something else. The espresso machine, the walnut cabinetry, the balcony — every detail is impeccable.",
      },
    ],
  },
  {
    id: "3",
    name: "The Sanctuary Villa",
    description: "Our crowning jewel. The Sanctuary Villa is a standalone architectural masterpiece featuring an infinity plunge pool, full chef's kitchen, personal butler service, and direct, private access to a secluded sandy beach.",
    fullDescription: "The Sanctuary Villa is Aetheria's definitive expression of unbounded luxury — a freestanding estate encompassing over 3,000 square feet of living space set among native coastal palms. Your private infinity pool appears to merge with the horizon, while a dedicated butler and personal chef cater to every whim. Interiors feature museum-quality art, Italian marble throughout, and a temperature-controlled wine cellar stocked with rare vintages curated by our sommelier.",
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
    reviews: [
      {
        name: "Marcus Kaelen",
        location: "Zurich, Switzerland",
        rating: 5,
        text: "This sanctuary is in a class of its own. Complete privacy, an infinity pool that takes your breath away, and a pristine private beach. The butler dining experience under the stars was the highlight of our anniversary.",
      },
      {
        name: "Priya Nair",
        location: "Mumbai, India",
        rating: 5,
        text: "We celebrated our family reunion here and the villa accommodated all six of us luxuriously. The chef prepared an extraordinary seafood feast, and the children loved having direct beach access. Absolutely flawless.",
      },
    ],
  },
  {
    id: "4",
    name: "Deluxe Forest Haven",
    description: "A cozy, premium hideout surrounded by ancient redwoods. Experience rustic charm meets high-end minimalism with a wood-burning soapstone fireplace, plush organic sheets, and a hand-carved cedar soaking tub.",
    fullDescription: "The Deluxe Forest Haven channels the quiet majesty of old-growth forest into an intimate retreat wrapped in reclaimed timber and artisan plaster. A wood-burning soapstone fireplace anchors the living space, radiating warmth that pairs perfectly with the hand-carved cedar soaking tub positioned on your private deck. At night, the absence of light pollution reveals a canopy of stars, while a curated vinyl collection and premium sound system set the mood for complete disconnection.",
    pricePerNight: 420,
    maxGuests: 2,
    amenities: ["Wifi", "Fireplace", "Cedar Tub", "Balcony", "Sound System"],
    images: [
      "https://picsum.photos/seed/room-4-a/800/600",
      "https://picsum.photos/seed/room-4-b/800/600",
    ],
    rating: 4.7,
    reviews: [
      {
        name: "Ingrid Solberg",
        location: "Oslo, Norway",
        rating: 5,
        text: "As a Scandinavian, I know cabin culture — and this surpasses anything I've experienced. The cedar tub under the redwoods with the fireplace crackling inside was pure Nordic-Californian magic.",
      },
      {
        name: "David Chen",
        location: "Vancouver, Canada",
        rating: 4,
        text: "Perfect for a digital detox. The vinyl record collection was a wonderful touch, and falling asleep to the sound of wind through the redwoods is something I'll never forget. Cozy, refined, and deeply peaceful.",
      },
    ],
  },
  {
    id: "5",
    name: "Minimalist Atelier Studio",
    description: "Tailored for the modern wanderer. A thoughtfully curated studio space emphasizing natural light, clean geometric lines, original artworks, and an integrated workspaces for creative reflection.",
    fullDescription: "The Minimalist Atelier Studio is a masterclass in restrained elegance, designed for creative minds seeking clarity. Floor-to-ceiling north-facing windows flood the space with soft, even light, while a dedicated workspace features a solid walnut desk and ergonomic seating. Rotating original artworks from local galleries adorn the walls, and the espresso station ensures late-night inspiration is always fueled. It is the perfect blend of productivity and indulgence.",
    pricePerNight: 280,
    maxGuests: 2,
    amenities: ["Wifi", "Workplace", "Espresso Machine", "Spa Access"],
    images: [
      "https://picsum.photos/seed/room-5-a/800/600",
      "https://picsum.photos/seed/room-5-b/800/600",
    ],
    rating: 4.6,
    reviews: [
      {
        name: "Lena Krüger",
        location: "Berlin, Germany",
        rating: 5,
        text: "As a designer, I was blown away by the curation of this space. The natural light is perfect for sketching, the artwork rotates monthly, and the espresso machine kept me fueled through a very productive writing retreat.",
      },
      {
        name: "Omar Farouk",
        location: "Cairo, Egypt",
        rating: 4,
        text: "Clean, functional, and beautiful. The workspace is genuinely usable — not just decorative — and the spa access means you can unwind after a day of focused work. Great value for the quality offered.",
      },
    ],
  },
  {
    id: "6",
    name: "Panorama Cliff Vista",
    description: "Enjoy sunset views from this dramatic glass pavilion suspended over the shoreline. Features include a floating bed design, premium automated lighting, and a massive walk-in marble bathroom with steam features.",
    fullDescription: "The Panorama Cliff Vista is a gravity-defying glass pavilion cantilevered over the rugged shoreline, offering uninterrupted 180-degree views of the Pacific. The signature floating bed appears to hover above the polished concrete floor, while automated ambient lighting shifts from warm sunrise tones to cool twilight hues throughout the day. The walk-in marble bathroom features both a rainfall shower and a eucalyptus-infused steam room, transforming your daily routine into a restorative ritual.",
    pricePerNight: 720,
    maxGuests: 2,
    amenities: ["Wifi", "Ocean View", "Balcony", "Steam Shower", "Mini Bar"],
    images: [
      "https://picsum.photos/seed/room-6-a/800/600",
      "https://picsum.photos/seed/room-6-b/800/600",
    ],
    rating: 4.9,
    reviews: [
      {
        name: "Nikolai Volkov",
        location: "Moscow, Russia",
        rating: 5,
        text: "Watching storms roll in across the Pacific from that glass pavilion is an experience I will carry forever. The floating bed design is genius — you feel suspended between earth and sky. The steam shower is pure indulgence.",
      },
      {
        name: "Sophie Laurent",
        location: "Geneva, Switzerland",
        rating: 5,
        text: "The automated lighting that transitions through the day creates an atmosphere I've never encountered anywhere else. Sunset from the cliff edge is extraordinary. This room is worth every penny.",
      },
    ],
  },
  {
    id: "7",
    name: "Terracotta Oasis Hideaway",
    description: "Rich earth tones and plaster walls evoke a sense of deep grounding. Inspired by Mediterranean architecture, this unit features a private sun-drenched courtyard, terracotta tile work, and an outdoor shower.",
    fullDescription: "The Terracotta Oasis Hideaway transports you to the sun-baked villages of the Amalfi Coast, reimagined through a contemporary lens. Hand-applied lime plaster walls glow amber in the afternoon light, while a private courtyard with a century-old olive tree creates a sheltered outdoor living room. The outdoor rain shower is surrounded by fragrant rosemary hedges, and each evening, complimentary aperitivo is served on your terrace as the golden hour paints the landscape.",
    pricePerNight: 390,
    maxGuests: 2,
    amenities: ["Wifi", "Courtyard", "Outdoor Shower", "Breakfast Included"],
    images: [
      "https://picsum.photos/seed/room-7-a/800/600",
      "https://picsum.photos/seed/room-7-b/800/600",
    ],
    rating: 4.8,
    reviews: [
      {
        name: "Elena Rostova",
        location: "Rome, Italy",
        rating: 5,
        text: "As an Italian, I'm very particular about Mediterranean aesthetics — and this hideaway is authentic in the best possible way. The courtyard olive tree, the lime plaster, the evening aperitivo tradition. It felt like a love letter to the coast.",
      },
      {
        name: "Aisha Kamara",
        location: "Marrakech, Morocco",
        rating: 4,
        text: "The outdoor shower surrounded by rosemary was one of the most sensory experiences I've had at a hotel. Breakfast included is a generous touch, and the terracotta tiling is stunning. A warm, grounding stay.",
      },
    ],
  },
  {
    id: "8",
    name: "Legacy Grand Penthouse",
    description: "Spanning the entire top floor of our main residence building. A monumental living space designed for luxury entertaining, showcasing custom European lighting, double-height ceilings, and two expansive terraces.",
    fullDescription: "The Legacy Grand Penthouse crowns Aetheria's main residence as its most commanding accommodation — a palatial top-floor suite with double-height ceilings and floor-to-ceiling glass on all four sides. Two expansive terraces offer sunrise and sunset vantage points respectively, while the interior showcases bespoke European chandeliers, a curated art collection, and a fully stocked private bar with rare spirits. An on-call chef can prepare multi-course tasting menus in the penthouse's professional kitchen, making it the ultimate venue for celebrations and distinguished gatherings.",
    pricePerNight: 1600,
    maxGuests: 4,
    amenities: ["Wifi", "Ocean View", "Double Terraces", "Private Bar", "Chef Available", "Spa Access"],
    images: [
      "https://picsum.photos/seed/room-8-a/800/600",
      "https://picsum.photos/seed/room-8-b/800/600",
      "https://picsum.photos/seed/room-8-c/800/600",
    ],
    rating: 4.9,
    reviews: [
      {
        name: "Evelyn Ross",
        location: "Manhattan, New York",
        rating: 5,
        text: "We hosted an intimate birthday dinner for twelve in the penthouse and the on-call chef created a seven-course tasting menu that rivaled any Michelin-starred restaurant. The double terraces at sunset with champagne — absolutely unmatched.",
      },
      {
        name: "Takeshi Nakamura",
        location: "Kyoto, Japan",
        rating: 5,
        text: "The double-height ceilings and panoramic glass walls create a sense of openness that is rare even in the finest hotels. The private bar's whisky selection alone was extraordinary. A truly grand experience befitting the name.",
      },
    ],
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
