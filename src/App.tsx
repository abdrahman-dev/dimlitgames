import { useState, useCallback } from "react";
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

export default function App() {
  const [ready, setReady] = useState(false);
  const { theme, toggle } = useTheme();

  const handleReady = useCallback(() => setReady(true), []);

  if (!ready) return <LoadingScreen onFinish={handleReady} />;

  return (
    <>
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
