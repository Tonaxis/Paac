import {
  Coffee,
  Croissant,
  Pizza,
  Sandwich,
  ShoppingBasket,
  Truck,
  Utensils,
  UtensilsCrossed,
} from "lucide-react";
import { ReactElement } from "react";

type TypeIconProps = {
  name: string;
};

type Icon = {
  names: string[];
  icon: ReactElement;
};

export default function TypeIcon({ name }: TypeIconProps) {
  const icons: Icon[] = [
    {
      names: [
        "Restaurant",
        "Restaurant agréé",
        "Restaurant administratif",
        "Restaurant géré",
      ],
      icon: <Utensils />,
    },
    {
      names: ["Sandwicherie", "Libre-service", "crous and go", "Kiosque"],
      icon: <Sandwich />,
    },
    {
      names: ["Cafétéria", "Coffee Corner", "Brasserie"],
      icon: <Coffee />,
    },
    {
      names: ["Pizzéria"],
      icon: <Pizza />,
    },
    {
      names: ["Space"],
      icon: <Croissant />,
    },
    {
      names: ["Triporteur", "Foodtruck"],
      icon: <Truck />,
    },
    {
      names: ["épicerie"],
      icon: <ShoppingBasket />,
    },
  ];

  return icons.find((i) => i.names.includes(name))?.icon || <UtensilsCrossed />;
}
