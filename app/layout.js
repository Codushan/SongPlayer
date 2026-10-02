import './globals.css';
import { AudioProvider } from '@/components/AudioContext';
import Header from '@/components/Header';
import SidebarDock from '@/components/SidebarDock';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Bhojpuri Sur — 1,500+ Bhojpuri Songs | Genre-Wise Music Hub',
  description:
    'Explore the ultimate Bhojpuri music catalog categorized by genres: DJ Dance, Romance, Chhath Mahaparv, Bhakti, Holi, Sad Biraha, Folk & Classics from 1962 to 2026.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link rel="preload" as="image" href="/bgimage.png" fetchPriority="high" />
      </head>
      <body>
        {/* Fixed backdrop stack */}
        <div className="app-backdrop" aria-hidden="true" />
        <div className="app-backdrop-scrim" aria-hidden="true" />
        <div className="app-backdrop-aura" aria-hidden="true" />
        <div className="app-backdrop-vignette" aria-hidden="true" />
        <div className="app-backdrop-grain" aria-hidden="true" />

        <AudioProvider>
          <div className="app-layout vision-os-layout">
            <Header />
            <SidebarDock />
            <div className="main-content-wrapper">
              <main className="main-container">
                {children}
                <Footer />
              </main>
            </div>
          </div>
        </AudioProvider>
      </body>
    </html>
  );
}
