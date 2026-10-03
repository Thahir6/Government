import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JANSAHAY AI — Government Scheme & Scholarship Assistant",
  description: "Futuristic, trustworthy, multilingual AI platform to discover Indian government schemes & scholarships, check deterministic eligibility, understand documents, follow official steps, and detect fraud.",
  keywords: ["government schemes", "scholarships", "India", "JanSahay AI", "eligibility check", "scam checker", "NSP", "PM-Kisan", "Ayushman Bharat", "Telugu", "Hindi"],
  authors: [{ name: "JanSahay National Team" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#060F1E] text-slate-100 antialiased selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
