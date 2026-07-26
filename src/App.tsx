import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { NoiseOverlay } from "./components/NoiseOverlay";
import { LoadingScreen } from "./components/LoadingScreen";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Games } from "./sections/Games";
import { Philosophy } from "./sections/Philosophy";
import { FindUs } from "./sections/FindUs";
import { useTheme } from "./hooks/useTheme";
import { site } from "./config/site";
import bannerSrc from "./assets/logos/banner.webp";

export default function App() {
  const [ready, setReady] = useState(false);
  const { theme, toggle } = useTheme();

  const handleReady = useCallback(() => setReady(true), []);

  if (!ready) return <LoadingScreen onFinish={handleReady} />;

  return (
    <>
      <Helmet>
        <title>{site.name} — {site.tagline}</title>
        <link rel="canonical" href="https://dimlitgames.vercel.app" />
        <meta name="description" content={site.description} />
        <meta property="og:title" content={`${site.name} — ${site.tagline}`} />
        <meta property="og:description" content={site.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dimlitgames.vercel.app" />
        <meta property="og:image" content={`https://dimlitgames.vercel.app${bannerSrc}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${site.name} — ${site.tagline}`} />
        <meta name="twitter:description" content={site.description} />
        <meta name="twitter:image" content={`https://dimlitgames.vercel.app${bannerSrc}`} />
      </Helmet>

      <NoiseOverlay />
      <WhatsAppButton />

      <Navbar theme={theme} onToggleTheme={toggle} />

      <main>
        <Hero />
        <Games />
        <About />
        <Philosophy />
        <FindUs />
      </main>

      <Footer />
    </>
  );
}
