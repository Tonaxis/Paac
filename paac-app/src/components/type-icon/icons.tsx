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
    staticUri:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXV0ZW5zaWxzIj48cGF0aCBkPSJNMyAydjdjMCAxLjEuOSAyIDIgMmg0YTIgMiAwIDAgMCAyLTJWMiIvPjxwYXRoIGQ9Ik03IDJ2MjAiLz48cGF0aCBkPSJNMjEgMTVWMmE1IDUgMCAwIDAtNSA1djZjMCAxLjEuOSAyIDIgMmgzWm0wIDB2NyIvPjwvc3ZnPg==",
    icon: <Utensils />,
  },
  {
    names: ["Sandwicherie", "Libre-service", "crous and go", "Kiosque"],
    staticUri:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXNhbmR3aWNoIj48cGF0aCBkPSJNMyAxMXYzYTEgMSAwIDAgMCAxIDFoMTZhMSAxIDAgMCAwIDEtMXYtMyIvPjxwYXRoIGQ9Ik0xMiAxOUg0YTEgMSAwIDAgMS0xLTF2LTJhMSAxIDAgMCAxIDEtMWgxNmExIDEgMCAwIDEgMSAxdjJhMSAxIDAgMCAxLTEgMWgtMy44MyIvPjxwYXRoIGQ9Im0zIDExIDcuNzctNi4wNGEyIDIgMCAwIDEgMi40NiAwTDIxIDExSDNaIi8+PHBhdGggZD0iTTEyLjk3IDE5Ljc3IDcgMTVoMTIuNWwtMy43NSA0LjVhMiAyIDAgMCAxLTIuNzguMjdaIi8+PC9zdmc+",
    icon: <Sandwich />,
  },
  {
    names: ["Cafétéria", "Coffee Corner", "Brasserie"],
    staticUri:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNvZmZlZSI+PHBhdGggZD0iTTEwIDJ2MiIvPjxwYXRoIGQ9Ik0xNCAydjIiLz48cGF0aCBkPSJNMTYgOGExIDEgMCAwIDEgMSAxdjhhNCA0IDAgMCAxLTQgNEg3YTQgNCAwIDAgMS00LTRWOWExIDEgMCAwIDEgMS0xaDE0YTQgNCAwIDEgMSAwIDhoLTEiLz48cGF0aCBkPSJNNiAydjIiLz48L3N2Zz4=",
    icon: <Coffee />,
  },
  {
    names: ["Pizzéria"],
    staticUri:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXBpenphIj48cGF0aCBkPSJNMTUgMTFoLjAxIi8+PHBhdGggZD0iTTExIDE1aC4wMSIvPjxwYXRoIGQ9Ik0xNiAxNmguMDEiLz48cGF0aCBkPSJtMiAxNiAyMCA2LTYtMjBBMjAgMjAgMCAwIDAgMiAxNiIvPjxwYXRoIGQ9Ik01LjcxIDE3LjExYTE3LjA0IDE3LjA0IDAgMCAxIDExLjQtMTEuNCIvPjwvc3ZnPg==",
    icon: <Pizza />,
  },
  {
    names: ["Space"],
    staticUri:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNyb2lzc2FudCI+PHBhdGggZD0ibTQuNiAxMy4xMSA1Ljc5LTMuMjFjMS44OS0xLjA1IDQuNzkgMS43OCAzLjcxIDMuNzFsLTMuMjIgNS44MUM4LjggMjMuMTYuNzkgMTUuMjMgNC42IDEzLjExWiIvPjxwYXRoIGQ9Im0xMC41IDkuNS0xLTIuMjlDOS4yIDYuNDggOC44IDYgOCA2SDQuNUMyLjc5IDYgMiA2LjUgMiA4LjVhNy43MSA3LjcxIDAgMCAwIDIgNC44MyIvPjxwYXRoIGQ9Ik04IDZjMC0xLjU1LjI0LTQtMi00LTIgMC0yLjUgMi4xNy0yLjUgNCIvPjxwYXRoIGQ9Im0xNC41IDEzLjUgMi4yOSAxYy43My4zIDEuMjEuNyAxLjIxIDEuNXYzLjVjMCAxLjcxLS41IDIuNS0yLjUgMi41YTcuNzEgNy43MSAwIDAgMS00LjgzLTIiLz48cGF0aCBkPSJNMTggMTZjMS41NSAwIDQtLjI0IDQgMiAwIDItMi4xNyAyLjUtNCAyLjUiLz48L3N2Zz4=",
    icon: <Croissant />,
  },
  {
    names: ["Triporteur", "Foodtruck"],
    staticUri:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXRydWNrIj48cGF0aCBkPSJNMTQgMThWNmEyIDIgMCAwIDAtMi0ySDRhMiAyIDAgMCAwLTIgMnYxMWExIDEgMCAwIDAgMSAxaDIiLz48cGF0aCBkPSJNMTUgMThIOSIvPjxwYXRoIGQ9Ik0xOSAxOGgyYTEgMSAwIDAgMCAxLTF2LTMuNjVhMSAxIDAgMCAwLS4yMi0uNjI0bC0zLjQ4LTQuMzVBMSAxIDAgMCAwIDE3LjUyIDhIMTQiLz48Y2lyY2xlIGN4PSIxNyIgY3k9IjE4IiByPSIyIi8+PGNpcmNsZSBjeD0iNyIgY3k9IjE4IiByPSIyIi8+PC9zdmc+",
    icon: <Truck />,
  },
  {
    names: ["épicerie"],
    staticUri:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXNob3BwaW5nLWJhc2tldCI+PHBhdGggZD0ibTE1IDExLTEgOSIvPjxwYXRoIGQ9Im0xOSAxMS00LTciLz48cGF0aCBkPSJNMiAxMWgyMCIvPjxwYXRoIGQ9Im0zLjUgMTEgMS42IDcuNGEyIDIgMCAwIDAgMiAxLjZoOS44YTIgMiAwIDAgMCAyLTEuNmwxLjctNy40Ii8+PHBhdGggZD0iTTQuNSAxNS41aDE1Ii8+PHBhdGggZD0ibTUgMTEgNC03Ii8+PHBhdGggZD0ibTkgMTEgMSA5Ii8+PC9zdmc+",
    icon: <ShoppingBasket />,
  },
];

const defaultIcon = {
  names: ["Inconnu"],
  staticUri:
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXV0ZW5zaWxzLWNyb3NzZWQiPjxwYXRoIGQ9Im0xNiAyLTIuMyAyLjNhMyAzIDAgMCAwIDAgNC4ybDEuOCAxLjhhMyAzIDAgMCAwIDQuMiAwTDIyIDgiLz48cGF0aCBkPSJNMTUgMTUgMy4zIDMuM2E0LjIgNC4yIDAgMCAwIDAgNmw3LjMgNy4zYy43LjcgMiAuNyAyLjggMEwxNSAxNVptMCAwIDcgNyIvPjxwYXRoIGQ9Im0yLjEgMjEuOCA2LjQtNi4zIi8+PHBhdGggZD0ibTE5IDUtNyA3Ii8+PC9zdmc+",
  icon: <UtensilsCrossed />,
};

export default function getIcon(name: string) {
  return icons.find((i) => i.names.includes(name)) || defaultIcon;
}
