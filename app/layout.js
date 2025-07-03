import { Poppins } from "next/font/google";
import Head from "next/head";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InteractiveBackground from "@/components/InteractiveBackground";
import ClientOnly from "@/components/ClientOnly";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata = {
  title: "Anipreneur - Decode Anime, Master Life",
  description: "Anipreneur decodes characters and concepts from your favorite anime to give you actionable strategies for self-improvement, learning, and psychology.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Head>
      <body className={poppins.className}>
        <ClientOnly>
          <InteractiveBackground />
        </ClientOnly>
        <div id="interactive-grid-container">
          {Array.from({ length: 1000 }).map((_, i) => <div key={i} className="grid-item"></div>)}
        </div>
        
        <Header />
        <main id="main-content">
          {children}
        </main>
        <Footer />
        
        {/* Font Awesome Script */}
        <script src="https://kit.fontawesome.com/a076d05399.js" crossOrigin="anonymous" async></script>
      </body>
    </html>
  );
}