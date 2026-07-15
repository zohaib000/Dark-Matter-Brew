import { useState } from "react";
import { ArrowRight, Droplets, Flame, Clock, Beaker, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, useScroll, useTransform } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } }
};

const fadeUpFast = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0.65, 0.3, 0.9] } }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] } }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.2, 0.65, 0.3, 0.9] } }
};

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.2, 0.65, 0.3, 0.9] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const staggerContainerFast = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail("");
      }, 5000);
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground overflow-hidden">
      {/* Global Noise Overlay */}
      <div className="noise-overlay" />

      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-0 left-0 w-full z-40 px-6 py-8 flex justify-between items-center backdrop-blur-sm"
      >
        <motion.div 
          className="text-xl font-display font-bold tracking-widest text-primary uppercase"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          Dark Matter
        </motion.div>
        <div className="hidden md:flex gap-8 text-sm font-mono tracking-widest text-muted-foreground uppercase">
          {[
            { href: "#roasts", label: "Roasts" },
            { href: "#brewing", label: "Method" },
            { href: "#subscription", label: "Protocol" }
          ].map((item, i) => (
            <motion.a 
              key={i}
              href={item.href} 
              className="hover:text-primary transition-colors relative"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              {item.label}
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-[1px] bg-primary"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground rounded-none font-mono uppercase tracking-widest text-xs hidden md:inline-flex">
              Shop Now
            </Button>
          </motion.div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-[100dvh] flex items-center justify-center pt-20">
        <motion.div 
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="/hero-roastery.jpg" 
            alt="Dark Matter Roastery" 
            className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
        </motion.div>
        
        <div className="container relative z-10 mx-auto px-6 max-w-5xl">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-primary"></div>
              <span className="font-mono text-primary tracking-[0.2em] text-xs uppercase">Est. 2024</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-6xl md:text-8xl font-display font-bold leading-[0.9] tracking-tighter mb-8 text-white">
              THE INVISIBLE <br/>
              <span className="text-primary italic font-serif pr-4 font-light">force</span> BEHIND<br/>
              YOUR MORNING.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl leading-relaxed mb-12">
              We approach roasting as a hard science. Small-batch, precision-controlled, and designed for those who measure their water temperature to the degree.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-6">
              <motion.a 
                href="#roasts"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Button className="h-14 px-8 rounded-none bg-primary text-primary-foreground hover:bg-primary/90 font-mono uppercase tracking-widest text-sm w-full sm:w-auto">
                  Explore Roasts
                </Button>
              </motion.a>
              <motion.a 
                href="#brewing"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Button variant="outline" className="h-14 px-8 rounded-none border-border hover:bg-secondary hover:text-primary font-mono uppercase tracking-widest text-sm w-full sm:w-auto">
                  Brewing Guide
                </Button>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-6 md:left-12 z-10 flex flex-col items-center gap-4 animate-pulse"
        >
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase writing-vertical-rl rotate-180">Scroll</span>
          <div className="w-[1px] h-12 bg-primary/50"></div>
        </motion.div>
      </section>

      {/* Featured Roasts */}
      <section id="roasts" className="py-32 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8"
          >
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[1px] w-12 bg-primary"></div>
                <span className="font-mono text-primary tracking-[0.2em] text-xs uppercase">Current Offerings</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter">
                CALIBRATED<br/><span className="text-muted-foreground">ROASTS</span>
              </h2>
            </div>
            <p className="text-muted-foreground max-w-md font-light leading-relaxed">
              Our core profiles are meticulously developed to highlight intrinsic origin characteristics without the interference of heavy roast flavors.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                name: "Singularity",
                origin: "Yirgacheffe, Ethiopia",
                process: "Washed",
                notes: ["Dark Cherry", "Cacao Nib", "Bergamot"],
                img: "/roast-1.jpg",
                desc: "A dense, complex profile that pulls light into itself. Bright acidity anchored by deep chocolate undertones."
              },
              {
                name: "Event Horizon",
                origin: "Supremo, Colombia",
                process: "Honey Process",
                notes: ["Toasted Pecan", "Brown Butter", "Plum"],
                img: "/roast-2.jpg",
                desc: "The point of no return. A heavily textured, syrupy body with intense caramelized sweetness."
              },
              {
                name: "The Void",
                origin: "Mandheling, Sumatra",
                process: "Wet Hulled",
                notes: ["Earth", "Dark Chocolate", "Tobacco"],
                img: "/roast-3.jpg",
                desc: "Our darkest offering. Viscous, brooding, and devoid of sharp acidity. A heavy, lingering finish."
              }
            ].map((roast, i) => (
              <motion.div 
                key={i} 
                variants={fadeUp} 
                className="group cursor-pointer"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="relative aspect-[3/4] mb-8 overflow-hidden bg-card">
                  <motion.img 
                    src={roast.img} 
                    alt={roast.name}
                    className="w-full h-full object-cover mix-blend-luminosity opacity-70 group-hover:mix-blend-normal group-hover:opacity-100 transition-all duration-700 ease-out"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  />
                  <div className="absolute inset-0 border border-border/50 group-hover:border-primary/50 transition-colors duration-500"></div>
                </div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-display font-bold mb-1 group-hover:text-primary transition-colors">{roast.name}</h3>
                    <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase">{roast.origin}</p>
                  </div>
                  <span className="font-mono text-xs bg-secondary text-primary px-2 py-1 uppercase">{roast.process}</span>
                </div>
                <p className="text-muted-foreground text-sm font-light mb-6 line-clamp-2">
                  {roast.desc}
                </p>
                <motion.div 
                  className="flex flex-wrap gap-2 mb-6"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainerFast}
                >
                  {roast.notes.map((note, j) => (
                    <motion.span 
                      key={j} 
                      variants={scaleIn}
                      className="text-xs font-mono border border-border px-2 py-1 text-muted-foreground hover:border-primary hover:text-primary transition-colors cursor-default"
                      whileHover={{ scale: 1.1, y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      {note}
                    </motion.span>
                  ))}
                </motion.div>
                <motion.div 
                  className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-widest"
                  initial={{ opacity: 0, x: -16 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span>Add to Queue</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Brewing Guide */}
      <section id="brewing" className="py-32 bg-card relative z-10 border-y border-border">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-24"
          >
            <div className="flex justify-center items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-primary"></div>
              <span className="font-mono text-primary tracking-[0.2em] text-xs uppercase">Methodology</span>
              <div className="h-[1px] w-12 bg-primary"></div>
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter">
              EXTRACTION<br/><span className="text-muted-foreground">PARAMETERS</span>
            </h2>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-border"
          >
            {[
              {
                name: "Pour Over (V60)",
                img: "/brew-pourover.jpg",
                icon: <Droplets className="w-6 h-6 text-primary" />,
                ratio: "1:15",
                temp: "205°F",
                time: "3:00",
                desc: "Precision extraction requiring constant attention. Yields maximum clarity and highlights delicate origin notes."
              },
              {
                name: "Immersion (Press)",
                img: "/brew-frenchpress.jpg",
                icon: <Clock className="w-6 h-6 text-primary" />,
                ratio: "1:12",
                temp: "200°F",
                time: "4:00",
                desc: "Full contact immersion brewing. Produces a heavily textured cup with prominent body and oils."
              },
              {
                name: "Espresso",
                img: "/brew-espresso.jpg",
                icon: <Flame className="w-6 h-6 text-primary" />,
                ratio: "1:2",
                temp: "201°F",
                time: "0:28",
                desc: "High pressure, rapid extraction. Concentrated intensity amplifying both sweetness and acidity."
              }
            ].map((method, i) => (
              <motion.div 
                key={i} 
                variants={fadeUp} 
                className="group relative border-b lg:border-b-0 lg:border-r border-border last:border-0 overflow-hidden"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0">
                  <img src={method.img} alt={method.name} className="w-full h-full object-cover opacity-10 group-hover:opacity-30 transition-opacity duration-700 mix-blend-luminosity" />
                  <div className="absolute inset-0 bg-background/80 group-hover:bg-background/40 transition-colors duration-700"></div>
                </div>
                
                <div className="relative p-12 h-full flex flex-col">
                  <motion.div 
                    className="mb-8 p-4 bg-background/50 backdrop-blur-md inline-block w-fit border border-border/50"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {method.icon}
                  </motion.div>
                  <h3 className="text-2xl font-display font-bold mb-4">{method.name}</h3>
                  <p className="text-muted-foreground font-light mb-12 flex-grow">{method.desc}</p>
                  
                  <div className="grid grid-cols-3 gap-4 border-t border-border pt-8">
                    <div>
                      <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1">Ratio</div>
                      <div className="font-mono text-white">{method.ratio}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1">Temp</div>
                      <div className="font-mono text-white">{method.temp}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1">Time</div>
                      <div className="font-mono text-white">{method.time}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Subscription */}
      <section id="subscription" className="py-32 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="bg-secondary relative overflow-hidden border border-border"
          >
            <motion.div 
              className="absolute inset-0 w-1/2 hidden lg:block"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <img src="/subscription.jpg" alt="Subscription Protocol" className="w-full h-full object-cover mix-blend-luminosity opacity-40" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-secondary"></div>
            </motion.div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 p-12 md:p-20 items-center">
              <div className="hidden lg:block"></div> {/* Spacer for image */}
              <div>
                <motion.div 
                  className="flex items-center gap-4 mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Beaker className="w-5 h-5 text-primary" />
                  </motion.div>
                  <span className="font-mono text-primary tracking-[0.2em] text-xs uppercase">Automated Delivery</span>
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter mb-6">
                  THE DARK MATTER<br/>PROTOCOL
                </h2>
                <p className="text-muted-foreground font-light leading-relaxed mb-8 max-w-md">
                  Never run out of variables to test. Receive freshly roasted, experimental, and core profiles delivered to your lab on your schedule. Roasted on Tuesday, shipped on Wednesday.
                </p>
                
                <motion.ul 
                  className="space-y-4 mb-10"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainerFast}
                >
                  {[
                    "Rotating experimental nano-lots",
                    "Customized delivery intervals",
                    "Early access to limited releases",
                    "Wholesale equipment discounts"
                  ].map((benefit, i) => (
                    <motion.li key={i} variants={fadeUpFast} className="flex items-center gap-3">
                      <motion.div 
                        className="w-1.5 h-1.5 bg-primary rounded-none"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + 0.2, duration: 0.3 }}
                      />
                      <span className="text-sm font-light text-foreground/90">{benefit}</span>
                    </motion.li>
                  ))}
                </motion.ul>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button className="h-14 px-8 rounded-none bg-primary text-primary-foreground hover:bg-primary/90 font-mono uppercase tracking-widest text-sm w-full sm:w-auto">
                    Initiate Protocol
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer & Newsletter */}
      <footer className="relative z-10 border-t border-border bg-background pt-24 pb-12 overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-24">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
            >
              <h2 className="text-3xl font-display font-bold tracking-tighter mb-4">JOIN THE SYNDICATE.</h2>
              <p className="text-muted-foreground font-light mb-8 max-w-sm">
                Infrequent transmissions regarding new roasts, brewing theory, and esoteric coffee science.
              </p>
              
              <form onSubmit={handleSubscribe} className="relative max-w-md">
                <motion.div 
                  className="flex"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <Input 
                    type="email" 
                    placeholder="Enter email address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 bg-transparent border-border rounded-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary font-mono text-sm placeholder:text-muted-foreground"
                    disabled={isSubmitted}
                  />
                  <Button 
                    type="submit" 
                    className="h-12 px-6 rounded-none bg-white text-black hover:bg-white/90 font-mono uppercase tracking-widest text-xs"
                    disabled={isSubmitted}
                  >
                    {isSubmitted ? <CheckCircle2 className="w-4 h-4" /> : "Subscribe"}
                  </Button>
                </motion.div>
                {isSubmitted && (
                  <motion.p 
                    className="absolute -bottom-8 left-0 text-primary font-mono text-xs tracking-widest"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    Transmission received. Welcome.
                  </motion.p>
                )}
              </form>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid grid-cols-2 gap-8 font-mono text-sm"
            >
              <motion.div variants={slideInLeft}>
                <h4 className="text-primary tracking-widest uppercase mb-6 text-xs">Navigation</h4>
                <motion.ul 
                  className="space-y-4 text-muted-foreground"
                  variants={staggerContainerFast}
                >
                  {["Our Roasts", "Brewing Guide", "The Protocol", "Equipment"].map((item, i) => (
                    <motion.li key={i} variants={fadeUpFast}>
                      <a 
                        href={i < 3 ? ["#roasts", "#brewing", "#subscription"][i] : "#"} 
                        className="hover:text-primary transition-colors inline-block hover:translate-x-1 transition-transform"
                      >
                        {item}
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
              <motion.div variants={slideInRight}>
                <h4 className="text-primary tracking-widest uppercase mb-6 text-xs">HQ / Lab</h4>
                <motion.ul 
                  className="space-y-4 text-muted-foreground"
                  variants={staggerContainerFast}
                >
                  {[
                    "1042 Observable St.",
                    "Sector 4, Void City",
                    "Open Daily: 0600 - 1400",
                    { text: "comms@darkmatter.coffee", link: "mailto:comms@darkmatter.coffee" }
                  ].map((item, i) => (
                    <motion.li key={i} variants={fadeUpFast}>
                      {typeof item === 'string' ? item : (
                        <a href={item.link} className="hover:text-primary transition-colors inline-block hover:translate-x-1 transition-transform">
                          {item.text}
                        </a>
                      )}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </motion.div>
          </div>
          
          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-2xl font-display font-bold tracking-widest text-muted uppercase">
              Dark Matter
            </div>
            <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
              &copy; {new Date().getFullYear()} Dark Matter Roastery. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
