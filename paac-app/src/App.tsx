import { ModeToggle } from "@/components/mode-toggle";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

type Menu = {
  date: string;
  title: string;
  menu: Food[];
};

type Food = {
  category: string;
  choices: string[];
};

function App() {
  const [menu, setMenu] = useState<Menu>({} as Menu);

  useEffect(() => {
    const getMenu = async () => {
      const response = await fetch("/api/");

      const html = await response.text();
      const parsedHtml = new DOMParser().parseFromString(html, "text/html");

      const date = parsedHtml.querySelector(".menu_date_title");
      const mealTitle = parsedHtml.querySelector(".meal_title");
      const mealFoodies = parsedHtml.querySelector(".meal_foodies");

      const foods = [].slice.call(
        mealFoodies?.children || ([] as HTMLElement[])
      );

      setMenu({
        date: date?.textContent || "",
        title: mealTitle?.textContent || "",
        menu: foods
          .map((food: HTMLElement) => {
            const choices = [].slice.call(
              food.children[0].children || ([] as HTMLElement[])
            );

            return {
              category: food.innerHTML?.split("<")[0],
              choices: choices.map((choice: HTMLElement) => choice.textContent),
            };
          })
          .filter(
            (food) =>
              food.choices.length > 0 &&
              food.choices[0] !== "menu non communiqué"
          ) as Food[],
      });
    };

    getMenu();
  }, []);

  return (
    <div className="p-5 flex flex-col gap-5 items-center">
      <div className="flex justify-between w-max-96 w-full">
        <h1 className="text-primary text-3xl font-bold italic">PAAC</h1>
        <ModeToggle />
      </div>
      <h1 className="text-2xl font-bold capitalize">
        {menu.date?.toLowerCase().replace("menu du", "").trim()}
      </h1>
      <Card className="outline max-w-96 w-full mt-5 p-5 flex flex-col gap-5">
        <h1 className="text-primary text-2xl font-bold text-center">
          {menu.title}
        </h1>
        {menu?.menu?.map((food) => (
          <div key={food.category}>
            <h1 className="text-primary text-xl font-medium underline">
              {food.category}
            </h1>
            <ul className="flex flex-col items-start">
              {food.choices.map((choice) => (
                <li key={choice}>{choice}</li>
              ))}
            </ul>
          </div>
        ))}
      </Card>
    </div>
  );
}

export default App;
