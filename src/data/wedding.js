// ─────────────────────────────────────────────────────────────
//  ALL SITE CONTENT LIVES HERE.
//  Everything below is SAMPLE data (taken from sample.jpg).
//  Replace dates, numbers, links and menus when the client sends finals.
//  Times are India Standard Time (+05:30).
// ─────────────────────────────────────────────────────────────

// The address printed in the room QR codes. Double-check spelling before printing!
export const siteUrl = "https://wedding-itinerary-invite.vercel.app";

export const couple = {
  bride: "Komal",
  groom: "Yash",
  hashtag: "#YashKom",
  monogram: "/img/monogram.webp",
  location: "Ramoji Film City, Hyderabad",
  dateLine: "23 · 24 · 25 November 2026",
  welcome: "We wish you a pleasant & memorable stay",
};

// Sample numbers — replace with real ones.
export const contacts = [
  { label: "Wedding Planner", sub: "RSVP & any help", phone: "+91 98765 43210" },
  { label: "Hospitality Desk", sub: "Rooms, travel, cabs", phone: "+91 98765 43211" },
  { label: "Help Desk", sub: "Dial from your room phone", phone: "9", short: true },
  { label: "Reception · Sitara Hotel", sub: "Ext. 32 / 34", phone: "32", short: true },
  { label: "Reception · Tara Hotel", sub: "Ext. 21 / 22", phone: "21", short: true },
];

// Sample Google Maps links (search links work everywhere; swap for exact pins later).
const maps = (q) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q + ", Ramoji Film City, Hyderabad")}`;

export const venues = {
  samarkhand: { name: "Samarkhand Banquet", area: "Sitara Hotel", map: maps("Sitara Luxury Hotel") },
  terrace: { name: "Terrace Hallway", area: "Sitara Hotel", map: maps("Sitara Luxury Hotel") },
  pool: { name: "Pool Side", area: "Sitara Hotel", map: maps("Sitara Luxury Hotel") },
  banyan: { name: "Banyan Tree Garden", area: "Ramoji Film City", map: maps("Banyan Tree") },
  sitaraLobby: { name: "Sitara Lobby", area: "Sitara Hotel", map: maps("Sitara Luxury Hotel") },
  princess: { name: "Princess Street", area: "Ramoji Film City", map: maps("Princess Street") },
  convention: { name: "Convention Centre", area: "Halls 1 & 2", map: maps("Ramoji Convention Centre") },
  limelight: { name: "Lime Light Garden", area: "Ramoji Film City", map: maps("Lime Light Garden") },
  tajmahal: { name: "Taj Mahal Banquet", area: "Ramoji Film City", map: maps("Taj Mahal Banquet") },
  mughal: { name: "Mughal Garden", area: "Ramoji Film City", map: maps("Mughal Garden") },
  lobby: { name: "Hotel Lobby", area: "Sitara & Tara Hotels", map: maps("Tara Comfort Hotel") },
};

// Each event: t = start (local IST "HH:MM"), onwards = shows "ONWARDS" under time.
export const days = [
  {
    id: "d1",
    date: "2026-11-23",
    day: "23",
    sup: "rd",
    month: "Nov 2026",
    weekday: "Monday",
    title: "Welcome & Blessings",
    theme: "Pastels & florals by day · carnival glam by night",
    events: [
      { t: "07:00", onwards: true, title: "Vinayak Puja & Ghrit Paan", note: "Kasat Family", venue: "samarkhand", icon: "diya", dress: "Traditional pastels" },
      { t: "07:00", onwards: true, title: "Vinayak Puja & Ghrit Paan", note: "Chandak Family", venue: "terrace", icon: "diya", dress: "Traditional pastels" },
      { t: "07:30", title: "Breakfast", venue: "pool", icon: "breakfast", meal: "breakfast" },
      { t: "11:15", title: "Dakshin Swagatam", note: "A South-Indian welcome", venue: "banyan", icon: "palm", dress: "Kanjeevaram & veshti vibes" },
      { t: "15:30", title: "Ramoji Tour", note: "Buses leave on time", venue: "sitaraLobby", icon: "film", dress: "Comfortable casuals" },
      { t: "17:15", onwards: true, title: "Hi-Tea", venue: "pool", icon: "tea", meal: "hitea" },
      { t: "19:15", title: "Carnival de Rio", note: "Dinner & dance under the lights", venue: "princess", icon: "mask", dress: "Carnival glam — sequins & masks", meal: "dinner" },
    ],
  },
  {
    id: "d2",
    date: "2026-11-24",
    day: "24",
    sup: "th",
    month: "Nov 2026",
    weekday: "Tuesday",
    title: "Mamera & Sangeet",
    theme: "Rajasthani colours by day · starry glamour by night",
    events: [
      { t: "07:15", onwards: true, title: "Coffee Rave Party", note: "Followed by breakfast", venue: "pool", icon: "breakfast", dress: "Bright casuals", meal: "breakfast" },
      { t: "10:30", onwards: true, title: "Mamera Ri Mithas", note: "Groom side", venue: "convention", icon: "gift", dress: "Rajasthani traditional — bandhej & leheriya" },
      { t: "10:30", onwards: true, title: "Mamera Ri Mithas", note: "Bride side · Sitara Pool Side", venue: "pool", icon: "gift", dress: "Rajasthani traditional — bandhej & leheriya" },
      { t: "12:30", title: "Lunch", note: "Convention Centre & Pool Side", venue: "convention", icon: "lunch", meal: "lunch" },
      { t: "17:00", title: "Hi-Tea", venue: "pool", icon: "tea", meal: "hitea" },
      { t: "18:15", title: "Tilak", venue: "limelight", icon: "tilak", dress: "Indian festive" },
      { t: "19:15", onwards: true, title: "Starry Night Sangeet", note: "Performances, dinner & dance", venue: "limelight", icon: "sparkle", dress: "Indo-western sparkle — black, silver & gold", meal: "dinner" },
    ],
  },
  {
    id: "d3",
    date: "2026-11-25",
    day: "25",
    sup: "th",
    month: "Nov 2026",
    weekday: "Wednesday",
    title: "The Wedding Day",
    theme: "Florals by morning · royal regalia by evening",
    events: [
      { t: "07:30", title: "Breakfast", venue: "pool", icon: "breakfast", meal: "breakfast" },
      { t: "08:15", title: "Barna & Bari", venue: "tajmahal", icon: "lotus", dress: "Traditional Indian" },
      { t: "10:15", onwards: true, title: "Kesariya Vrindavan", note: "Phoolon ki Holi", venue: "convention", icon: "flower", dress: "Whites & yellows" },
      { t: "12:30", onwards: true, title: "Sahaji ki Manwaar & Lunch", note: "Convention Centre – 2", venue: "convention", icon: "lunch", meal: "lunch" },
      { t: "16:00", title: "Safabandhi with Hi-Tea", venue: "pool", icon: "crown", dress: "Men: kurta & safa (provided)", meal: "hitea" },
      { t: "17:15", title: "The Royal Procession", note: "Baraat", venue: "sitaraLobby", icon: "procession", dress: "Royal Indian — sherwanis & lehengas" },
      { t: "18:30", title: "Baraat Swagat & Toran", venue: "mughal", icon: "door" },
      { t: "19:15", title: "Grand Varmala", venue: "mughal", icon: "garland" },
      { t: "20:00", title: "The Grand Affair", note: "Reception & dinner", venue: "mughal", icon: "cheers", dress: "Black-tie Indian", meal: "dinner" },
      { t: "22:30", title: "Mangal Phera", venue: "mughal", icon: "fire" },
    ],
  },
  {
    id: "d4",
    date: "2026-11-26",
    day: "26",
    sup: "th",
    month: "Nov 2026",
    weekday: "Thursday",
    title: "Farewell",
    theme: "Comfortable travel wear",
    events: [
      { t: "07:30", onwards: true, title: "Breakfast", venue: "pool", icon: "breakfast", meal: "breakfast" },
      { t: "08:00", title: "Bidaai", venue: "samarkhand", icon: "heart", dress: "Light traditional" },
      { t: "10:00", title: "Check Out", note: "Please hand over room keys", venue: "lobby", icon: "luggage" },
    ],
  },
];

// Sample menus — "buy your own" style placeholders.
// tags: "jain" = Jain option available, "live" = live counter
export const menus = {
  d1: [
    {
      meal: "Breakfast", time: "07:30 – 10:30", venue: "pool",
      sections: [
        { name: "Indian", items: ["Poha with sev & pomegranate", "Aloo paratha with white butter", "Idli, medu vada & chutneys", "Masala dosa (live)"] },
        { name: "Continental", items: ["Pancakes with maple syrup", "Croissants & Danish pastries", "Cut fruits & yogurt parfait"] },
        { name: "Beverages", items: ["Masala chai", "Filter coffee", "Fresh juices"] },
      ],
      tags: ["jain", "live"],
    },
    {
      meal: "Lunch", time: "12:30 – 15:00", venue: "banyan",
      sections: [
        { name: "South Indian Sadhya", items: ["Bisi bele bath", "Avial & thoran", "Sambar, rasam & curd rice", "Banana chips & papad"] },
        { name: "Dessert", items: ["Payasam", "Mysore pak"] },
      ],
      tags: ["jain"],
    },
    {
      meal: "Hi-Tea", time: "17:15 onwards", venue: "pool",
      sections: [
        { name: "Chaat Corner", items: ["Pani puri", "Dahi bhalla", "Raj kachori"] },
        { name: "Bites", items: ["Paneer tikka sliders", "Mini samosas", "Tea cakes & cookies"] },
      ],
      tags: ["live"],
    },
    {
      meal: "Dinner · Carnival de Rio", time: "19:15 onwards", venue: "princess",
      sections: [
        { name: "Brazilian Street", items: ["Pão de queijo", "Grilled corn with lime butter", "Veg feijoada with rice"] },
        { name: "Mexican Cart", items: ["Tacos & nachos (live)", "Quesadillas", "Burrito bowls"] },
        { name: "Indian", items: ["Dal makhani", "Paneer lababdar", "Assorted breads", "Jeera rice"] },
        { name: "Dessert", items: ["Churros with chocolate", "Kulfi falooda", "Mini cheesecakes"] },
      ],
      tags: ["jain", "live"],
    },
  ],
  d2: [
    {
      meal: "Breakfast · Coffee Rave", time: "07:15 – 10:30", venue: "pool",
      sections: [
        { name: "Coffee Bar", items: ["Espresso, cappuccino & cold brew", "Hazelnut & caramel lattes"] },
        { name: "Breakfast", items: ["Kachori with aloo sabzi", "Upma & sheera", "Eggless waffles", "Avocado toast"] },
      ],
      tags: ["jain", "live"],
    },
    {
      meal: "Lunch · Rajasthani Thaal", time: "12:30 – 15:00", venue: "convention",
      sections: [
        { name: "Thaal", items: ["Dal baati churma", "Gatte ki sabzi", "Ker sangri", "Bajre ki roti with gud & ghee", "Kadhi & rice"] },
        { name: "Dessert", items: ["Ghevar", "Moong dal halwa"] },
      ],
      tags: ["jain"],
    },
    {
      meal: "Hi-Tea", time: "17:00 onwards", venue: "pool",
      sections: [
        { name: "Snacks", items: ["Mirchi vada", "Pyaaz kachori", "Dhokla & khandvi", "Masala chai"] },
      ],
      tags: [],
    },
    {
      meal: "Dinner · Starry Night", time: "19:15 onwards", venue: "limelight",
      sections: [
        { name: "Pan-Asian", items: ["Dim sums (live)", "Hakka noodles", "Thai green curry with rice"] },
        { name: "Italian", items: ["Wood-fired pizzas (live)", "Pasta arrabbiata & alfredo"] },
        { name: "Indian", items: ["Paneer makhani", "Dal tadka", "Biryani", "Naan & kulcha"] },
        { name: "Dessert", items: ["Chocolate fountain", "Rasmalai", "Gelato station"] },
      ],
      tags: ["jain", "live"],
    },
  ],
  d3: [
    {
      meal: "Breakfast", time: "07:30 – 10:00", venue: "pool",
      sections: [
        { name: "Indian", items: ["Methi thepla & chunda", "Mini idli in podi", "Puri bhaji"] },
        { name: "Continental", items: ["French toast", "Granola bar", "Fresh fruit platter"] },
      ],
      tags: ["jain"],
    },
    {
      meal: "Lunch · Sahaji ki Manwaar", time: "12:30 – 15:00", venue: "convention",
      sections: [
        { name: "Marwari Feast", items: ["Panchmel dal", "Papad mangodi ki sabzi", "Missi roti", "Bajra khichdi"] },
        { name: "Dessert", items: ["Malpua with rabdi", "Mohanthal"] },
      ],
      tags: ["jain"],
    },
    {
      meal: "Hi-Tea · Safabandhi", time: "16:00 onwards", venue: "pool",
      sections: [
        { name: "Snacks", items: ["Samosa chaat", "Veg cutlets", "Kesar chai & cold coffee"] },
      ],
      tags: [],
    },
    {
      meal: "Dinner · The Grand Affair", time: "20:00 onwards", venue: "mughal",
      sections: [
        { name: "Royal Indian", items: ["Shahi paneer", "Dal Bukhara", "Subz dum biryani", "Assorted tandoori breads"] },
        { name: "Global", items: ["Mezze platter", "Risotto (live)", "Asian stir-fry"] },
        { name: "Dessert", items: ["Jalebi with rabdi (live)", "Wedding cake", "Paan station"] },
      ],
      tags: ["jain", "live"],
    },
  ],
  d4: [
    {
      meal: "Farewell Breakfast", time: "07:30 – 10:00", venue: "pool",
      sections: [
        { name: "Breakfast", items: ["Aloo puri", "Poha & jalebi", "Eggless omelette station", "Fresh fruit"] },
        { name: "For the road", items: ["Packed snack box at the lobby"] },
      ],
      tags: ["jain"],
    },
  ],
};

export const mealLabels = { jain: "Jain option", live: "Live counter" };
