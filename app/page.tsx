import Navbar from "./Navbar";
import Founder from "./Founder";
import Work from "./work";
import Contact from "./Contact";
import FadeIn from "./FadeIn";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="flex flex-col items-center justify-center text-center px-6 min-h-[calc(100vh-89px)]">
        <h1 className="text-5xl font-bold mb-4">
          Alpha Narrative
        </h1>
        <p className="text-lg text-gray-400 max-w-xl">
          Strategy and product engineering, built from Port Harcourt.
        </p>
      </div>
<FadeIn><Founder /></FadeIn>
<FadeIn><Work /></FadeIn>
<FadeIn><Contact /></FadeIn>
    </main>
  );
}