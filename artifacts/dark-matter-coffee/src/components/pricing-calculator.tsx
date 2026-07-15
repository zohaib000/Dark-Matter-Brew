import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";

type Frequency = "weekly" | "biweekly" | "monthly";
type RoastLevel = "light" | "medium" | "dark";

interface FrequencyOption {
  label: string;
  value: Frequency;
  discount: number;
  description: string;
  badge?: string;
}

interface RoastOption {
  label: string;
  value: RoastLevel;
  basePrice: number;
  description: string;
}

const FREQUENCY_OPTIONS: FrequencyOption[] = [
  {
    label: "Weekly",
    value: "weekly",
    discount: 0.15,
    description: "Fresh beans every week",
    badge: "Most Popular",
  },
  {
    label: "Bi-Weekly",
    value: "biweekly",
    discount: 0.1,
    description: "Every two weeks",
  },
  {
    label: "Monthly",
    value: "monthly",
    discount: 0.05,
    description: "Once a month",
  },
];

const ROAST_OPTIONS: RoastOption[] = [
  {
    label: "Light Roast",
    value: "light",
    basePrice: 18,
    description: "Bright & fruity notes",
  },
  {
    label: "Medium Roast",
    value: "medium",
    basePrice: 20,
    description: "Balanced & smooth",
  },
  {
    label: "Dark Roast",
    value: "dark",
    basePrice: 22,
    description: "Bold & rich flavors",
  },
];

const BAG_SIZES = [250, 500, 1000]; // grams

export function PricingCalculator() {
  const [frequency, setFrequency] = useState<Frequency>("weekly");
  const [roast, setRoast] = useState<RoastLevel>("medium");
  const [quantity, setQuantity] = useState<number>(1);
  const [bagSize, setBagSize] = useState<number>(250);
  const [added, setAdded] = useState(false);

  const selectedFrequency = FREQUENCY_OPTIONS.find((f) => f.value === frequency)!;
  const selectedRoast = ROAST_OPTIONS.find((r) => r.value === roast)!;

  const calculation = useMemo(() => {
    const sizeMultiplier = bagSize === 250 ? 1 : bagSize === 500 ? 1.8 : 3.2;
    const basePrice = selectedRoast.basePrice * sizeMultiplier;
    const subtotal = basePrice * quantity;
    const discountAmount = subtotal * selectedFrequency.discount;
    const total = subtotal - discountAmount;
    const pricePerGram = total / (bagSize * quantity);
    const annualSavings =
      frequency === "weekly"
        ? discountAmount * 52
        : frequency === "biweekly"
        ? discountAmount * 26
        : discountAmount * 12;
    return { basePrice, subtotal, discountAmount, total, pricePerGram, annualSavings };
  }, [selectedRoast, selectedFrequency, quantity, bagSize, frequency]);

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section id="pricing-calculator" className="py-20 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 text-xs tracking-widest uppercase border-amber-600/50 text-amber-600">
            Build Your Plan
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Subscription Calculator
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Customize your coffee subscription. The more often you order, the more you save.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-6">
          {/* Controls */}
          <div className="md:col-span-3 space-y-6">
            {/* Frequency */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold">Delivery Frequency</CardTitle>
                <CardDescription>Choose how often you want your coffee</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  {FREQUENCY_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setFrequency(option.value)}
                      className={`relative flex flex-col items-center text-center p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                        frequency === option.value
                          ? "border-amber-500 bg-amber-500/10 shadow-md"
                          : "border-border hover:border-amber-400/60 hover:bg-muted/50"
                      }`}
                    >
                      {option.badge && (
                        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] font-semibold bg-amber-500 text-white px-2 py-0.5 rounded-full whitespace-nowrap">
                          {option.badge}
                        </span>
                      )}
                      <span className="font-semibold text-sm mt-1">{option.label}</span>
                      <span className="text-xs text-muted-foreground mt-1">{option.description}</span>
                      <span className="mt-2 text-xs font-bold text-amber-600">
                        Save {Math.round(option.discount * 100)}%
                      </span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Roast */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold">Roast Level</CardTitle>
                <CardDescription>Select your preferred roast profile</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  {ROAST_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setRoast(option.value)}
                      className={`flex flex-col items-center text-center p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                        roast === option.value
                          ? "border-amber-500 bg-amber-500/10 shadow-md"
                          : "border-border hover:border-amber-400/60 hover:bg-muted/50"
                      }`}
                    >
                      <span
                        className={`text-2xl mb-1 ${
                          option.value === "light"
                            ? "opacity-60"
                            : option.value === "medium"
                            ? "opacity-80"
                            : "opacity-100"
                        }`}
                      >
                        ☕
                      </span>
                      <span className="font-semibold text-sm">{option.label}</span>
                      <span className="text-xs text-muted-foreground mt-1">{option.description}</span>
                      <span className="mt-1 text-xs font-medium text-foreground/70">
                        from ${option.basePrice}
                      </span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Bag Size */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold">Bag Size</CardTitle>
                <CardDescription>Select your preferred bag size</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  {BAG_SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => setBagSize(size)}
                      className={`flex flex-col items-center text-center p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                        bagSize === size
                          ? "border-amber-500 bg-amber-500/10 shadow-md"
                          : "border-border hover:border-amber-400/60 hover:bg-muted/50"
                      }`}
                    >
                      <span className="font-bold text-lg">{size}g</span>
                      <span className="text-xs text-muted-foreground mt-1">
                        {size === 250 ? "~17 cups" : size === 500 ? "~34 cups" : "~68 cups"}
                      </span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quantity */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold">
                  Quantity
                  <span className="ml-2 text-amber-600 font-bold">{quantity} bag{quantity > 1 ? "s" : ""}</span>
                </CardTitle>
                <CardDescription>How many bags per delivery?</CardDescription>
              </CardHeader>
              <CardContent>
                <Slider
                  min={1}
                  max={10}
                  step={1}
                  value={[quantity]}
                  onValueChange={(val) => setQuantity(val[0])}
                  className="my-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>1 bag</span>
                  <span>5 bags</span>
                  <span>10 bags</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary */}
          <div className="md:col-span-2">
            <Card className="sticky top-6 border-2 border-amber-500/30 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Config Summary */}
                <div className="rounded-lg bg-muted/50 p-3 space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Roast</span>
                    <span className="font-medium capitalize">{roast} roast</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bag size</span>
                    <span className="font-medium">{bagSize}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Quantity</span>
                    <span className="font-medium">
                      {quantity} × ${calculation.basePrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Frequency</span>
                    <span className="font-medium capitalize">{frequency}</span>
                  </div>
                </div>

                <Separator />

                {/* Pricing Breakdown */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${calculation.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span className="flex items-center gap-1">
                      Subscription discount
                      <Badge variant="secondary" className="text-[10px] h-4 px-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        -{Math.round(selectedFrequency.discount * 100)}%
                      </Badge>
                    </span>
                    <span>-${calculation.discountAmount.toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                {/* Total */}
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold text-base">Total per delivery</span>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-amber-600">
                      ${calculation.total.toFixed(2)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      ${calculation.pricePerGram.toFixed(3)}/g
                    </div>
                  </div>
                </div>

                {/* Annual Savings */}
                <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-0.5">Estimated annual savings</p>
                  <p className="text-lg font-bold text-green-600">
                    ${calculation.annualSavings.toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">vs. one-time purchases</p>
                </div>

                {/* CTA */}
                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold h-11 transition-all duration-200"
                  size="lg"
                >
                  {added ? "✓ Added to Cart!" : "Subscribe Now"}
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  Free shipping · Cancel anytime · No commitment
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
