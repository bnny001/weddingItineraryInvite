import { Cormorant_Garamond, Montserrat, Great_Vibes } from "next/font/google";
import "./globals.css";

const serif = Cormorant_Garamond({
  variable: "--nf-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const sans = Montserrat({
  variable: "--nf-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const script = Great_Vibes({
  variable: "--nf-script",
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "Yash weds Komal",
  description: "Itinerary, venues & dining for the wedding celebrations of Yash & Komal.",
  appleWebApp: { capable: true, title: "Yash & Komal", statusBarStyle: "default" },
};

export const viewport = {
  themeColor: "#dcebfa",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} ${script.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
