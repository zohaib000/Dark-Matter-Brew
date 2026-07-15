import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { PricingCalculator } from "@/components/pricing-calculator";

// ─── Data ────────────────────────────────────────────────────────────────────

const ROASTS = [
  {
    id: 1,
    name: "Eclipse Blend",
    origin: "Ethiopia · Colombia",
    notes: "Dark Chocolate · Smoked Caramel · Cedar",
    roast: "Dark",
    img: "/roast-1.jpg",
  },
  {
    id: 2,
    name: "Nebula Light",
    origin: "Kenya · Guatemala",
    notes: "Bergamot · Lychee · Honeysuckle",
    roast: "Light",
    img: "/roast-2.jpg",
  },
  {
    id: 3,
    name: "Singularity",
    origin: "Brazil · Sumatra",
    notes: "Walnut · Brown Sugar · Tobacco Leaf",
    roast: "Medium",
    img: "/roast-3.jpg",
  },
];

const BREWS = [
  {
    id: 1,
    method: "Pour Over",
    time: "4 min",
    desc: "Clarity in every drop. Recommended for our light roasts.",
    img: "/brew-pourover.jpg",
  },
  {
    id: 2,
    method: "French Press",
    time: "8 min",
    desc: "Full-bodied and immersive. Pairs perfectly with dark roasts.",
    img: "/brew-frenchpress.jpg",
  },
  {
    id: 3,
    method: "Espresso",
    time: "25 sec",
    desc: "Concentrated intensity. The core of our Singularity blend.",
    img: "/brew-espresso.jpg",
  },
];

const FAQS = [
  {
    q: "How fresh are the beans?",
    a: "Every bag is roasted within 48 hours of dispatch. We never ship stale coffee.",
  },
  {
    q: "Can I pause my subscription?",
    a: "Yes — pause, skip or cancel any time from your dashboard with zero penalties.",
  },
  {
    q: "Do you ship internationally?",
    a: "Currently we ship across the US and Canada. International shipping is coming soon.",
  },
  {
    q: "What grind options are available?",
    a: "Whole bean, coarse (French press), medium (drip), fine (espresso) — your choice at checkout.",
  },
];

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      {/* ── Nav ── */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/90 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="#" className="text-xl font-black tracking-tighter">
            DARK<span className="text-amber-500">MATTER</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#roasts" className="hover:text-amber-500 transition-colors">
              Roasts
            </a>
            <a href="#brew" className="hover:text-amber-500 transition-colors">
              Brew
            </a>
            <a href="#pricing-calculator" className="hover:text-amber-500 transition-colors">
              Pricing
            </a>
            <a href="#subscription" className="hover:text-amber-500 transition-colors">
              Subscribe
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">
              Shop Now
            </Button>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img
          src="/hero-roastery.jpg"
          alt="Roastery"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto">
          <Badge
            variant="outline"
            className="mb-6 border-amber-400/60 text-amber-300 text-xs tracking-widest uppercase"
          >
            Small-batch · Direct trade
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6">
            Coffee at the
            <br />
            <span className="text-amber-400">Edge of Flavor</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-xl mx-auto">
            We roast in micro-batches and ship within 48 hours — because your morning deserves
            something extraordinary.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-black font-bold"
              onClick={() =>
                document.getElementById("roasts")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore Roasts
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10"
              onClick={() =>
                document.getElementById("pricing-calculator")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              See Pricing
            </Button>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center pt-2">
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </div>
        </div>
      </section>

      {/* ── Roasts ── */}
      <section id="roasts" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <Badge
              variant="outline"
              className="mb-4 text-xs tracking-widest uppercase border-amber-600/50 text-amber-600"
            >
              The Collection
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Signature Roasts
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {ROASTS.map((r) => (
              <Card
                key={r.id}
                className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={r.img}
                    alt={r.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <Badge className="absolute top-4 right-4 bg-amber-600 text-white border-0">
                    {r.roast}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <p className="text-xs text-muted-foreground tracking-widest uppercase mb-2">
                    {r.origin}
                  </p>
                  <h3 className="text-xl font-bold mb-2">{r.name}</h3>
                  <p className="text-sm text-muted-foreground">{r.notes}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-5 w-full border-amber-600/40 hover:border-amber-600 hover:bg-amber-600/10 text-amber-700 dark:text-amber-400"
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brew Methods ── */}
      <section id="brew" className="py-20 px-4 bg-muted/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <Badge
              variant="outline"
              className="mb-4 text-xs tracking-widest uppercase border-amber-600/50 text-amber-600"
            >
              The Ritual
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Brew Methods</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {BREWS.map((b) => (
              <div key={b.id} className="group text-center">
                <div className="relative h-56 rounded-2xl overflow-hidden mb-5 shadow-md">
                  <img
                    src={b.img}
                    alt={b.method}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-xs font-semibold tracking-widest uppercase">
                    {b.time}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2">{b.method}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing Calculator ── */}
      <PricingCalculator />

      {/* ── Subscription Banner ── */}
      <section id="subscription" className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden">
            <img
              src="/subscription.jpg"
              alt="Subscription"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/65" />
            <div className="relative z-10 p-10 md:p-16 text-white text-center">
              <Badge
                variant="outline"
                className="mb-6 border-amber-400/60 text-amber-300 text-xs tracking-widest uppercase"
              >
                Never run out
              </Badge>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
                Join the Inner Circle
              </h2>
              <p className="text-white/80 max-w-xl mx-auto mb-8 text-lg">
                Subscribers get freshly roasted beans before they hit the public shelf — plus up to
                15% off every order.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-amber-500 hover:bg-amber-600 text-black font-bold"
                  onClick={() =>
                    document
                      .getElementById("pricing-calculator")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Calculate My Price
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/40 text-white hover:bg-white/10"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-14">
            <Badge
              variant="outline"
              className="mb-4 text-xs tracking-widest uppercase border-amber-600/50 text-amber-600"
            >
              Got questions?
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">FAQ</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="border border-border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left font-semibold hover:bg-muted/50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <span
                    className={`ml-4 text-amber-500 text-xl transition-transform duration-200 ${
                      openFaq === i ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-muted-foreground text-sm">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-xl font-black tracking-tighter">
            DARK<span className="text-amber-500">MATTER</span>
          </span>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Dark Matter Brew. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
