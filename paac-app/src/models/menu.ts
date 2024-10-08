export interface Menu {
  resto_id: string;
  date: string;
  availables_moments: string[];
  moment: "matin" | "midi" | "soir";
  categories: Category[];
}

export interface Category {
  name: string;
  dishes: Dish[];
}

export interface Dish {
  name: string;
}
