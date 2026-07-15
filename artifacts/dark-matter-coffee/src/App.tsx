import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

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
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/90 backdrop-blur border-b border-border shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.span 
            className="font-bold text-lg tracking-widest uppercase"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            Dark Matter
          </motion.span>
          <nav className="hidden md:flex gap-8">
            {NAV_LINKS.map((l, i) => (
              <motion.a
                key={l.label}
                href={l.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                whileHover={{ y: -2 }}
              >
                {l.label}
              </motion.a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                size="sm"
                variant="outline"
                onClick={() => setCartCount((c) => c + 1)}
              >
                Cart {cartCount > 0 && `(${cartCount})`}
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* ── HERO ── */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        <motion.img
          src="/hero-roastery.jpg"
          alt="Roastery interior"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.35]"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <motion.div 
          className="relative z-10 max-w-3xl px-6 space-y-6"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <Badge variant="outline" className="border-white/40 text-white/80">
              Specialty · Single Origin · Small Batch
            </Badge>
          </motion.div>
          <motion.h1
            variants={fadeInUp}
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
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-lg text-white/70 max-w-xl mx-auto"
          >
            We source rare, high-altitude beans and roast them in micro-batches
            to coax out flavours that defy gravity.
          </motion.p>
          <motion.div 
            variants={fadeInUp}
            className="flex gap-4 justify-center flex-wrap"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" asChild>
                <a href="#roasts">Shop Roasts</a>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" variant="outline" className="text-white border-white/40 hover:bg-white/10" asChild>
                <a href="#subscription">Subscribe & Save</a>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── ROASTS ── */}
      <section id="roasts" className="py-24 max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold mb-2">Current Roasts</h2>
          <p className="text-muted-foreground mb-10">
            Three carefully chosen lots, roasted fresh every week.
          </p>
        </motion.div>
        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {ROASTS.map((r, i) => (
            <motion.div
              key={r.id}
              variants={fadeInUp}
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden group">
                  <div className="overflow-hidden h-52">
                    <motion.img
                      src={r.img}
                      alt={r.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
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
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="sm" onClick={() => setCartCount((c) => c + 1)}>
                        Add to Cart
                      </Button>
                    </motion.div>
                  </CardFooter>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <Separator />

      {/* ── BREW GUIDES ── */}
      <section id="brew" className="py-24 max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold mb-2">Brew Guides</h2>
          <p className="text-muted-foreground mb-10">
            Master your method with our step-by-step recipes.
          </p>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={scaleIn}
        >
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
                <motion.div 
                  className="grid md:grid-cols-2 gap-10 items-start"
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainer}
                >
                  <motion.img
                    variants={fadeInUp}
                    src={g.img}
                    alt={g.label}
                    className="rounded-xl w-full h-72 object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div variants={fadeInUp}>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {[
                        { label: "Ratio", value: g.ratio },
                        { label: "Grind", value: g.grind },
                        { label: "Temp", value: g.temp },
                      ].map((s) => (
                        <motion.div
                          key={s.label}
                          className="bg-muted rounded-lg p-3 text-center"
                          whileHover={{ y: -4 }}
                          transition={{ duration: 0.2 }}
                        >
                          <p className="text-xs text-muted-foreground">{s.label}</p>
                          <p className="font-semibold mt-0.5">{s.value}</p>
                        </motion.div>
                      ))}
                    </div>
                    <ol className="space-y-3">
                      {g.steps.map((step, i) => (
                        <motion.li 
                          key={i} 
                          className="flex gap-3 text-sm"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                            {i + 1}
                          </span>
                          {step}
                        </motion.li>
                      ))}
                    </ol>
                    <p className="text-xs text-muted-foreground mt-4">
                      Total brew time: <strong>{g.time}</strong>
                    </p>
                  </motion.div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </section>

      <Separator />

      {/* ── SUBSCRIPTION ── */}
      <section id="subscription" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="grid md:grid-cols-2 gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl font-bold mb-4">Never Run Out Again</h2>
              <p className="text-muted-foreground mb-6">
                Customise your cadence, choose your roast, and receive freshly
                roasted coffee at your door on a schedule that fits your life.
                Subscribers save 15% on every order.
              </p>
              <motion.ul 
                className="space-y-2 text-sm mb-8"
                variants={staggerContainer}
              >
                {[
                  "Roasted to order within 48 hours of shipping",
                  "Skip, pause or cancel any time",
                  "Free delivery on all subscriptions",
                  "Exclusive access to limited single-origin releases",
                ].map((item, i) => (
                  <motion.li 
                    key={item} 
                    className="flex items-center gap-2"
                    variants={fadeInUp}
                  >
                    <span className="text-primary">✓</span> {item}
                  </motion.li>
                ))}
              </motion.ul>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <PricingCalculator />
              </motion.div>
            </motion.div>
            <motion.img
              variants={fadeInUp}
              src="/subscription.jpg"
              alt="Subscription coffee bag"
              className="rounded-2xl w-full h-96 object-cover"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        </div>
      </section>

      <Separator />

      {/* ── FAQ ── */}
      <section id="about" className="py-24 max-w-3xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold mb-2">Common Questions</h2>
          <p className="text-muted-foreground mb-10">
            Everything you need to know before your first bag.
          </p>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <Accordion type="single" collapsible className="w-full">
            {FAQ.map((item, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <AccordionItem value={`item-${i}`}>
                  <AccordionTrigger>{item.q}</AccordionTrigger>
                  <AccordionContent>{item.a}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <motion.footer 
        className="border-t border-border py-10 text-center text-sm text-muted-foreground"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.p variants={fadeInUp} className="font-bold tracking-widest uppercase mb-2">Dark Matter Coffee</motion.p>
        <motion.p variants={fadeInUp}>© {new Date().getFullYear()} Dark Matter Coffee Co. All rights reserved.</motion.p>
        <motion.p variants={fadeInUp} className="mt-2 text-xs">
          Roasted with care somewhere between here and the void.
        </motion.p>
      </motion.footer>
    </div>
  );
}
