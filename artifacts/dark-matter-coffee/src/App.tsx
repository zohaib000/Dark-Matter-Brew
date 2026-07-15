import { useState, useEffect } from "react";
import { ThemeToggle } from "./components/theme-toggle";
import { PricingCalculator } from "./components/pricing-calculator";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Separator } from "./components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";

const NAV_LINKS = [
  { label: "Roasts", href: "#roasts" },
  { label: "Brew Guides", href: "#brew" },
  { label: "Subscription", href: "#subscription" },
  { label: "About", href: "#about" },
];

const ROASTS = [
  {
    id: 1,
    name: "Event Horizon Espresso",
    origin: "Ethiopia · Yirgacheffe",
    roast: "Dark",
    notes: ["Dark Chocolate", "Smoked Caramel", "Black Cherry"],
    price: 22,
    img: "/roast-1.jpg",
  },
  {
    id: 2,
    name: "Nebula Natural",
    origin: "Colombia · Huila",
    roast: "Medium",
    notes: ["Blueberry", "Honey", "Brown Sugar"],
    price: 20,
    img: "/roast-2.jpg",
  },
  {
    id: 3,
    name: "Singularity Light",
    origin: "Kenya · Nyeri",
    roast: "Light",
    notes: ["Bergamot", "Red Currant", "Jasmine"],
    price: 24,
    img: "/roast-3.jpg",
  },
];

const BREW_GUIDES = [
  {
    id: "pourover",
    label: "Pour Over",
    img: "/brew-pourover.jpg",
    ratio: "1 : 16",
    grind: "Medium-Fine",
    temp: "93 °C",
    time: "3 – 4 min",
    steps: [
      "Pre-wet filter and discard rinse water.",
      "Add 20 g coffee. Start timer, pour 40 g water for 30 s bloom.",
      "Continue pouring in slow spirals to 320 g total by 2:30.",
      "Allow drawdown to complete. Total time ≈ 3:30.",
    ],
  },
  {
    id: "espresso",
    label: "Espresso",
    img: "/brew-espresso.jpg",
    ratio: "1 : 2",
    grind: "Fine",
    temp: "92 °C",
    time: "25 – 30 s",
    steps: [
      "Dose 18 g into a clean, dry basket.",
      "Distribute and tamp level at ~15 kg pressure.",
      "Lock portafilter, start shot targeting 36 g yield.",
      "Adjust grind finer if under-extracted, coarser if bitter.",
    ],
  },
  {
    id: "frenchpress",
    label: "French Press",
    img: "/brew-frenchpress.jpg",
    ratio: "1 : 15",
    grind: "Coarse",
    temp: "96 °C",
    time: "4 min",
    steps: [
      "Add 30 g coarse-ground coffee to press.",
      "Pour 450 g water, stir gently, place lid on (don't plunge).",
      "Wait 4 minutes. Skim foam from surface.",
      "Press slowly and pour immediately to stop extraction.",
    ],
  },
];

const FAQ = [
  {
    q: "How fresh are the beans?",
    a: "Every batch is roasted to order and ships within 48 hours of roasting, ensuring peak flavour in your cup.",
  },
  {
    q: "Can I pause or cancel my subscription?",
    a: "Yes — pause, skip, or cancel anytime from your account dashboard with no fees or minimums.",
  },
  {
    q: "Do you offer whole bean and ground?",
    a: "Both! Select your preference at checkout. We grind to your chosen brew method for optimal freshness.",
  },
  {
    q: "What's your return policy?",
    a: "If your coffee arrives damaged or you're unsatisfied, contact us within 14 days for a full replacement or refund.",
  },
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── NAV ── */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/90 backdrop-blur border-b border-border shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-bold text-lg tracking-widest uppercase">
            Dark Matter
          </span>
          <nav className="hidden md:flex gap-8">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCartCount((c) => c + 1)}
            >
              Cart {cartCount > 0 && `(${cartCount})`}
            </Button>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        <img
          src="/hero-roastery.jpg"
          alt="Roastery interior"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.35]"
        />
        <div className="relative z-10 max-w-3xl px-6 space-y-6">
          <Badge variant="outline" className="border-white/40 text-white/80">
            Specialty · Single Origin · Small Batch
          </Badge>
          <h1
            className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Coffee Roasted at the
            <span
              className="italic block"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Edge of the Universe
            </span>
          </h1>
          <p className="text-lg text-white/70 max-w-xl mx-auto">
            We source rare, high-altitude beans and roast them in micro-batches
            to coax out flavours that defy gravity.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" asChild>
              <a href="#roasts">Shop Roasts</a>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white/40 hover:bg-white/10" asChild>
              <a href="#subscription">Subscribe & Save</a>
            </Button>
          </div>
        </div>
      </section>

      {/* ── ROASTS ── */}
      <section id="roasts" className="py-24 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-2">Current Roasts</h2>
        <p className="text-muted-foreground mb-10">
          Three carefully chosen lots, roasted fresh every week.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {ROASTS.map((r) => (
            <Card key={r.id} className="overflow-hidden group">
              <div className="overflow-hidden h-52">
                <img
                  src={r.img}
                  alt={r.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{r.roast}</Badge>
                  <span className="text-sm text-muted-foreground">{r.origin}</span>
                </div>
                <CardTitle className="mt-2">{r.name}</CardTitle>
                <CardDescription className="flex flex-wrap gap-1 mt-1">
                  {r.notes.map((n) => (
                    <span
                      key={n}
                      className="text-xs bg-muted rounded-full px-2 py-0.5"
                    >
                      {n}
                    </span>
                  ))}
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex items-center justify-between">
                <span className="font-semibold">${r.price} / 250 g</span>
                <Button size="sm" onClick={() => setCartCount((c) => c + 1)}>
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* ── BREW GUIDES ── */}
      <section id="brew" className="py-24 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-2">Brew Guides</h2>
        <p className="text-muted-foreground mb-10">
          Master your method with our step-by-step recipes.
        </p>
        <Tabs defaultValue="pourover">
          <TabsList className="mb-8">
            {BREW_GUIDES.map((g) => (
              <TabsTrigger key={g.id} value={g.id}>
                {g.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {BREW_GUIDES.map((g) => (
            <TabsContent key={g.id} value={g.id}>
              <div className="grid md:grid-cols-2 gap-10 items-start">
                <img
                  src={g.img}
                  alt={g.label}
                  className="rounded-xl w-full h-72 object-cover"
                />
                <div>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {[
                      { label: "Ratio", value: g.ratio },
                      { label: "Grind", value: g.grind },
                      { label: "Temp", value: g.temp },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="bg-muted rounded-lg p-3 text-center"
                      >
                        <p className="text-xs text-muted-foreground">{s.label}</p>
                        <p className="font-semibold mt-0.5">{s.value}</p>
                      </div>
                    ))}
                  </div>
                  <ol className="space-y-3">
                    {g.steps.map((step, i) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                  <p className="text-xs text-muted-foreground mt-4">
                    Total brew time: <strong>{g.time}</strong>
                  </p>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      <Separator />

      {/* ── SUBSCRIPTION ── */}
      <section id="subscription" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Never Run Out Again</h2>
              <p className="text-muted-foreground mb-6">
                Customise your cadence, choose your roast, and receive freshly
                roasted coffee at your door on a schedule that fits your life.
                Subscribers save 15% on every order.
              </p>
              <ul className="space-y-2 text-sm mb-8">
                {[
                  "Roasted to order within 48 hours of shipping",
                  "Skip, pause or cancel any time",
                  "Free delivery on all subscriptions",
                  "Exclusive access to limited single-origin releases",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="text-primary">✓</span> {item}
                  </li>
                ))}
              </ul>
              <PricingCalculator />
            </div>
            <img
              src="/subscription.jpg"
              alt="Subscription coffee bag"
              className="rounded-2xl w-full h-96 object-cover"
            />
          </div>
        </div>
      </section>

      <Separator />

      {/* ── FAQ ── */}
      <section id="about" className="py-24 max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-2">Common Questions</h2>
        <p className="text-muted-foreground mb-10">
          Everything you need to know before your first bag.
        </p>
        <Accordion type="single" collapsible className="w-full">
          {FAQ.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-border py-10 text-center text-sm text-muted-foreground">
        <p className="font-bold tracking-widest uppercase mb-2">Dark Matter Coffee</p>
        <p>© {new Date().getFullYear()} Dark Matter Coffee Co. All rights reserved.</p>
        <p className="mt-2 text-xs">
          Roasted with care somewhere between here and the void.
        </p>
      </footer>
    </div>
  );
}
