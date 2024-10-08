import { formatDate } from "@/utils/utils";

const BASE_URL = "/api";

export async function fetchRestaurants() {
  const response = await fetch(`${BASE_URL}/restaurants`);
  const data = await response.json();
  return data;
}

export async function fetchMenu(
  dataset: string,
  id: string,
  date: Date = new Date(),
  moment: string = ""
) {
  const response = await fetch(
    `${BASE_URL}/menus/${dataset}/${id}?date=${formatDate(date)}${
      moment && `&moment=${moment}`
    }`
  );
  const data = await response.json();
  return data;
}
