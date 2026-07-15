import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const coffeeTypes = [
  {
    id: "espresso",
    name: "Espresso",
    tagline: "The Heart of Coffee",
    description:
      "Our signature espresso is a concentrated shot of pure intensity — pulled from a precise 9-bar pressure extraction for a rich, velvety crema. Sourced from high-altitude farms in Ethiopia and Brazil, each shot delivers a complex interplay of dark chocolate and caramel notes.",
    image: "/brew-espresso.jpg",
    flavors: ["Dark Chocolate", "Caramel", "Smoky", "Bold"],
    brewTime: "25–30 sec",
    caffeine: "~63 mg",
    origin: "Ethiopia & Brazil",
    badge: "House Favorite",
    badgeVariant: "default" as const,
  },
  {
    id: "pourover",
    name: "Pour Over",
    tagline: "Clarity in Every Cup",
    description:
      "Our pour over is a meditation in precision. Using a V60 dripper and freshly ground single-origin beans from the highlands of Colombia, each pour reveals nuanced floral and citrus notes that you simply can't achieve with other methods. Brewed to order, every time.",
    image: "/brew-pourover.jpg",
    flavors: ["Jasmine", "Citrus", "Honey", "Bright"],
    brewTime: "3–4 min",
    caffeine: "~145 mg",
    origin: "Colombia",
    badge: "Barista's Pick",
    badgeVariant: "secondary" as const,
  },
  {
    id: "frenchpress",
    name: "French Press",
    tagline: "Full-Bodied & Rustic",
    description:
      "The French Press is for those who want their coffee bold and unfiltered — literally. A full immersion brew that keeps the natural oils in the cup, creating a rich, velvety texture with robust earthiness. We use a coarse grind from our Sumatran single-origin for maximum body.",
    image: "/brew-frenchpress.jpg",
    flavors: ["Earthy", "Nutty", "Rich", "Velvety"],
    brewTime: "4 min",
    caffeine: "~107 mg",
    origin: "Sumatra",
    badge: "Bold Choice",
    badgeVariant: "outline" as const,
  },
  {
    id: "coldbrew",
    name: "Cold Brew",
    tagline: "Slow-Steeped Smoothness",
    description:
      "Our cold brew steeps for 18 hours in filtered water, producing a concentrate that's remarkably smooth and naturally sweet — no sugar needed. The low-temperature extraction eliminates bitterness and acidity, making it the most approachable cup we offer. Served over ice with optional oat milk.",
    image: "/brew-espresso.jpg",
    flavors: ["Smooth", "Sweet", "Chocolate", "Low Acid"],
    brewTime: "18 hrs steep",
    caffeine: "~200 mg",
    origin: "Guatemala & Honduras",
    badge: "Summer Special",
    badgeVariant: "secondary" as const,
  },
  {
    id: "nitro",
    name: "Nitro Cold Brew",
    tagline: "Nitrogen-Infused Luxury",
    description:
      "Take cold brew to the next level. Our Nitro Cold Brew is infused with nitrogen gas and served straight from a tap, creating a cascading, stout-like pour with a thick, creamy head. No milk, no sweetener — just pure, velvet coffee magic in a glass. A crowd-pleaser that needs to be seen to be believed.",
    image: "/brew-frenchpress.jpg",
    flavors: ["Creamy", "Velvety", "Sweet", "Lush"],
    brewTime: "18 hrs + N₂",
    caffeine: "~215 mg",
    origin: "Guatemala & Honduras",
    badge: "Fan Favorite",
    badgeVariant: "default" as const,
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    tagline: "Espresso Meets Microfoam",
    description:
      "The classic Italian cappuccino — one part espresso, one part steamed milk, one part silky microfoam. Our baristas are trained in traditional Italian milk technique to create a dense, velvety foam that floats on top and slowly folds into the espresso below. A perfect harmony of strength and creaminess.",
    image: "/brew-pourover.jpg",
    flavors: ["Milky", "Espresso", "Creamy", "Classic"],
    brewTime: "3–5 min",
    caffeine: "~75 mg",
    origin: "Ethiopia & Brazil",
    badge: "Italian Classic",
    badgeVariant: "outline" as const,
  },
];

const roasts = [
  {
    name: "Dark Matter Blend",
    roast: "Dark Roast",
    description: "Our signature house blend — deep, bold, and unapologetically intense. Notes of bittersweet chocolate, molasses, and a whisper of oak smoke.",
    image: "/roast-1.jpg",
    price: "$18",
    weight: "250g",
    flavors: ["Dark Chocolate", "Molasses", "Oak Smoke"],
  },
  {
    name: "Event Horizon",
    roast: "Medium Roast",
    description: "A balanced medium roast with a velvety body. Red apple, caramel sweetness, and a clean finish. Perfect for all brew methods.",
    image: "/roast-2.jpg",
    price: "$20",
    weight: "250g",
    flavors: ["Red Apple", "Caramel", "Smooth"],
  },
  {
    name: "Singularity Light",
    roast: "Light Roast",
    description: "A bright, vibrant light roast from the Ethiopian highlands. Jasmine florals, stone fruit acidity, and a lingering honey sweetness.",
    image: "/roast-3.jpg",
    price: "$22",
    weight: "250g",
    flavors: ["Jasmine", "Peach", "Honey"],
  },
];

const brewingGuide = [
  {
    step: "01",
    title: "Grind Fresh",
    description: "Grind your beans immediately before brewing. Use a burr grinder for consistent particle size — the foundation of great coffee.",
  },
  {
    step: "02",
    title: "Water Quality",
    description: "Use filtered water heated to 93–96°C (200–205°F). Water quality and temperature are the most underrated variables in brewing.",
  },
  {
    step: "03",
    title: "Measure Precisely",
    description: "Use a 1:15 coffee-to-water ratio as your baseline. A kitchen scale is your best tool for repeatability and consistency.",
  },
  {
    step: "04",
    title: "Brew & Enjoy",
    description: "Follow your chosen method's timing. Taste, adjust, and iterate. The perfect cup is a personal journey — trust your palate.",
  },
];

export default function App() {
  const [selectedCoffee, setSelectedCoffee] = useState(coffeeTypes[0]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* ── Navigation ── */}
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">☕</span>
            <span className="text-xl font-bold tracking-tight">Dark Matter Brew</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#coffee-types" className="text-muted-foreground hover:text-foreground transition-colors">Coffee Types</a>
            <a href="#roasts" className="text-muted-foreground hover:text-foreground transition-colors">Our Roasts</a>
            <a href="#brew-guide" className="text-muted-foreground hover:text-foreground transition-colors">Brew Guide</a>
            <a href="#subscription" className="text-muted-foreground hover:text-foreground transition-colors">Subscribe</a>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button size="sm">Order Now</Button>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/hero-roastery.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/50 to-black/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48">
          <div className="max-w-2xl">
            <Badge variant="outline" className="mb-4 text-white border-white/40 bg-white/10">
              Est. 2019 · Specialty Coffee Roasters
            </Badge>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-none mb-6">
              Coffee at the
              <span className="block text-amber-400">Edge of the Universe</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
              We obsess over every variable — origin, roast profile, extraction — so your cup is nothing short of extraordinary. Specialty coffee, roasted in small batches, delivered to your door.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
                Explore Our Coffees
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white/50 bg-white/10 hover:bg-white/20">
                Learn Our Process
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Coffee Types ── */}
      <section id="coffee-types" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-3">The Menu</Badge>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Every Coffee Type,
              <span className="text-amber-500"> Perfected</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From the intensity of a single-shot espresso to the slow luxury of a nitro cold brew — we've mastered every method. Explore our full range and find your perfect cup.
            </p>
          </div>

          {/* Tab selector */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {coffeeTypes.map((coffee) => (
              <button
                key={coffee.id}
                onClick={() => setSelectedCoffee(coffee)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                  selectedCoffee.id === coffee.id
                    ? "bg-amber-500 border-amber-500 text-black shadow-md scale-105"
                    : "border-border text-muted-foreground hover:border-amber-400 hover:text-foreground"
                }`}
              >
                {coffee.name}
              </button>
            ))}
          </div>

          {/* Selected Coffee Detail */}
          <div className="grid md:grid-cols-2 gap-10 items-center bg-background rounded-2xl border border-border shadow-lg overflow-hidden">
            <div className="relative h-72 md:h-full min-h-[320px] overflow-hidden">
              <img
                src={selectedCoffee.image}
                alt={selectedCoffee.name}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <Badge variant={selectedCoffee.badgeVariant} className="text-xs font-semibold">
                  {selectedCoffee.badge}
                </Badge>
              </div>
            </div>

            <div className="p-8 md:p-10">
              <p className="text-amber-500 text-sm font-semibold uppercase tracking-widest mb-1">
                {selectedCoffee.tagline}
              </p>
              <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
                {selectedCoffee.name}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {selectedCoffee.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-muted/60 rounded-lg p-3 text-center">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Brew Time</p>
                  <p className="text-sm font-bold">{selectedCoffee.brewTime}</p>
                </div>
                <div className="bg-muted/60 rounded-lg p-3 text-center">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Caffeine</p>
                  <p className="text-sm font-bold">{selectedCoffee.caffeine}</p>
                </div>
                <div className="bg-muted/60 rounded-lg p-3 text-center">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Origin</p>
                  <p className="text-sm font-bold">{selectedCoffee.origin}</p>
                </div>
              </div>

              {/* Flavor Tags */}
              <div className="mb-6">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Flavor Profile</p>
                <div className="flex flex-wrap gap-2">
                  {selectedCoffee.flavors.map((flavor) => (
                    <span
                      key={flavor}
                      className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold border border-amber-500/20"
                    >
                      {flavor}
                    </span>
                  ))}
                </div>
              </div>

              <Button className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-black font-semibold">
                Order {selectedCoffee.name} →
              </Button>
            </div>
          </div>

          {/* All Coffee Cards Grid */}
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coffeeTypes.map((coffee) => (
              <Card
                key={coffee.id}
                onClick={() => setSelectedCoffee(coffee)}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${
                  selectedCoffee.id === coffee.id ? "ring-2 ring-amber-500 shadow-md" : ""
                }`}
              >
                <div className="relative h-44 overflow-hidden rounded-t-xl">
                  <img
                    src={coffee.image}
                    alt={coffee.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <Badge variant={coffee.badgeVariant} className="text-xs">
                      {coffee.badge}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{coffee.name}</CardTitle>
                  </div>
                  <CardDescription className="text-xs text-amber-500 font-semibold uppercase tracking-wide">
                    {coffee.tagline}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {coffee.description}
                  </p>
                </CardContent>
                <CardFooter className="flex flex-wrap gap-1 pt-0">
                  {coffee.flavors.slice(0, 3).map((f) => (
                    <span
                      key={f}
                      className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border"
                    >
                      {f}
                    </span>
                  ))}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Roasts ── */}
      <section id="roasts" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-3">Single-Origin & Blends</Badge>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Our Signature
              <span className="text-amber-500"> Roasts</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Roasted in small batches every week. Sourced directly from farmers we know and trust.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {roasts.map((roast) => (
              <Card key={roast.name} className="overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={roast.image}
                    alt={roast.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <Badge className="bg-amber-500 text-black text-xs font-bold">{roast.roast}</Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>{roast.name}</CardTitle>
                  <CardDescription>{roast.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {roast.flavors.map((f) => (
                      <span
                        key={f}
                        className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold">{roast.price}</span>
                      <span className="text-muted-foreground text-sm ml-1">/ {roast.weight}</span>
                    </div>
                    <Button variant="outline" size="sm">Add to Cart</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brew Guide ── */}
      <section id="brew-guide" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-3">The Method</Badge>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Brew Like a
              <span className="text-amber-500"> Pro</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Four principles that separate a good cup from a transcendent one.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {brewingGuide.map((step) => (
              <div key={step.step} className="bg-background rounded-2xl border border-border p-6 hover:shadow-md transition-shadow">
                <div className="text-5xl font-black text-amber-500/30 mb-3">{step.step}</div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Subscription Banner ── */}
      <section id="subscription" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl">
            <img
              src="/subscription.jpg"
              alt="Subscription"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-amber-900/40" />
            <div className="relative px-8 py-20 md:py-28 text-center">
              <Badge variant="outline" className="mb-4 text-white border-white/30 bg-white/10">
                Never Run Out
              </Badge>
              <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
                Subscribe & Save
              </h2>
              <p className="text-white/75 text-lg md:text-xl max-w-xl mx-auto mb-8">
                Get freshly roasted beans delivered to your door every week, bi-weekly, or monthly. Cancel anytime. Always 15% off.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-bold text-base px-8">
                  Start My Subscription
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white/40 bg-white/10 hover:bg-white/20">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">☕</span>
                <span className="text-lg font-bold">Dark Matter Brew</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                Specialty coffee roasters pushing the boundaries of what's possible in the cup. Sourced with care. Roasted with obsession.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3 uppercase tracking-wide">Coffee</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {coffeeTypes.map((c) => (
                  <li key={c.id}>
                    <a href="#coffee-types" className="hover:text-foreground transition-colors">{c.name}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3 uppercase tracking-wide">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Sourcing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Sustainability</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <Separator className="mb-6" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
            <p>© 2024 Dark Matter Brew. All rights reserved.</p>
            <p>Roasted with ♥ and a lot of caffeine.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
