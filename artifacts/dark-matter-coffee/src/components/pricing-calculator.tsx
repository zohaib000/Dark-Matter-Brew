import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ROASTS = [
  { id: "light", label: "Light", pricePerOz: 1.2 },
  { id: "medium", label: "Medium", pricePerOz: 1.0 },
  { id: "dark", label: "Dark", pricePerOz: 0.9 },
  { id: "espresso", label: "Espresso", pricePerOz: 1.1 },
];

const FREQUENCIES = [
  { id: "weekly", label: "Weekly", multiplier: 4.33 },
  { id: "biweekly", label: "Bi-Weekly", multiplier: 2.17 },
  { id: "monthly", label: "Monthly", multiplier: 1 },
];

export function PricingCalculator() {
  const [selectedRoast, setSelectedRoast] = useState(ROASTS[1]);
  const [selectedFrequency, setSelectedFrequency] = useState(FREQUENCIES[2]);
  const [oz, setOz] = useState(12);

  const monthlyPrice = (
    oz *
    selectedRoast.pricePerOz *
    selectedFrequency.multiplier
  ).toFixed(2);

  const perBagPrice = (oz * selectedRoast.pricePerOz).toFixed(2);

  return (
    <div className="w-full rounded-2xl border border-border bg-card p-8 shadow-lg">
      {/* Roast Selection */}
      <div className="mb-8">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Choose Your Roast
        </h3>
        <div className="flex flex-wrap gap-3">
          {ROASTS.map((roast) => (
            <button
              key={roast.id}
              onClick={() => setSelectedRoast(roast)}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition-all ${
                selectedRoast.id === roast.id
                  ? "border-primary bg-primary text-primary-foreground shadow-md"
                  : "border-border bg-background text-foreground hover:border-primary/60"
              }`}
            >
              {roast.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity Slider */}
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Quantity
          </h3>
          <Badge variant="secondary" className="text-base font-bold px-3 py-1">
            {oz} oz
          </Badge>
        </div>
        <Slider
          min={4}
          max={32}
          step={4}
          value={[oz]}
          onValueChange={([val]) => setOz(val)}
          className="mt-2"
        />
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>4 oz</span>
          <span>32 oz</span>
        </div>
      </div>

      {/* Frequency Selection */}
      <div className="mb-8">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Delivery Frequency
        </h3>
        <div className="flex flex-wrap gap-3">
          {FREQUENCIES.map((freq) => (
            <button
              key={freq.id}
              onClick={() => setSelectedFrequency(freq)}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition-all ${
                selectedFrequency.id === freq.id
                  ? "border-primary bg-primary text-primary-foreground shadow-md"
                  : "border-border bg-background text-foreground hover:border-primary/60"
              }`}
            >
              {freq.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price Summary */}
      <div className="rounded-xl bg-muted/60 p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Per Bag</p>
            <p className="text-2xl font-bold">${perBagPrice}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Estimated Monthly</p>
            <p className="text-4xl font-extrabold text-primary">${monthlyPrice}</p>
          </div>
        </div>
        <Button className="mt-6 w-full" size="lg">
          Subscribe Now
        </Button>
      </div>
    </div>
  );
}
