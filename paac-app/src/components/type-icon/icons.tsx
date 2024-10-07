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
import coffee from "lucide-static/icons/coffee.svg";
import croissant from "lucide-static/icons/croissant.svg";
import pizza from "lucide-static/icons/pizza.svg";
import sandwich from "lucide-static/icons/sandwich.svg";
import shoppingBasket from "lucide-static/icons/shopping-basket.svg";
import truck from "lucide-static/icons/truck.svg";
import utensilsCrossed from "lucide-static/icons/utensils-crossed.svg";
import utensils from "lucide-static/icons/utensils.svg";
import { ReactElement } from "react";

type Icon = {
  names: string[];
  staticUri: string;
  icon: ReactElement;
};

const icons: Icon[] = [
  {
    names: [
      "Restaurant",
      "Restaurant agréé",
      "Restaurant administratif",
      "Restaurant géré",
    ],
    staticUri: utensils,
    icon: <Utensils />,
  },
  {
    names: ["Sandwicherie", "Libre-service", "crous and go", "Kiosque"],
    staticUri: sandwich,
    icon: <Sandwich />,
  },
  {
    names: ["Cafétéria", "Coffee Corner", "Brasserie"],
    staticUri: coffee,
    icon: <Coffee />,
  },
  {
    names: ["Pizzéria"],
    staticUri: pizza,
    icon: <Pizza />,
  },
  {
    names: ["Space"],
    staticUri: croissant,
    icon: <Croissant />,
  },
  {
    names: ["Triporteur", "Foodtruck"],
    staticUri: truck,
    icon: <Truck />,
  },
  {
    names: ["épicerie"],
    staticUri: shoppingBasket,
    icon: <ShoppingBasket />,
  },
];

const defaultIcon = {
  names: ["Inconnu"],
  staticUri: utensilsCrossed,
  icon: <UtensilsCrossed />,
};

export default function getIcon(name: string) {
  return icons.find((i) => i.names.includes(name)) || defaultIcon;
}
