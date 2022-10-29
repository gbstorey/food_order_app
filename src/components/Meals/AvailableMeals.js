import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem";
import { useEffect, useCallback, useState } from "react";

export default function AvailableMeals() {
      const [loadedMeals, setLoadedMeals] = useState([]);
      const [isLoading, setIsLoading] = useState(false);
      const [error, setError] = useState(null);

      const fetchMealsHandler = useCallback(async () => {
            setIsLoading(true);
            setError(null);
            try {
                  const response = await fetch(
                        "https://react-http-21c77-default-rtdb.firebaseio.com/meals.json"
                  );
                  if (!response.ok) {
                        throw new Error("Something went wrong!");
                  }

                  const data = await response.json();
                  const meals = [];
                  for (const key in data) {
                        meals.push({
                              id: key,
                              name: data[key].name,
                              description: data[key].description,
                              price: data[key].price,
                        });
                  }
                  setLoadedMeals(meals);
            } catch (error) {
                  setError(error.message);
            }
            setIsLoading(false);
      }, []);

      useEffect(() => {
            fetchMealsHandler();
      }, [fetchMealsHandler]);

      let content = <p>Found no meals.</p>;

      if (loadedMeals.length > 0) {
            content = loadedMeals.map((meal) => (
                  <MealItem
                        id={meal.id}
                        key={meal.id}
                        name={meal.name}
                        description={meal.description}
                        price={meal.price}
                  />
            ));
      }

      if (error) {
            content = <p>{error}</p>;
      }

      if (isLoading) {
            content = <p>Loading...</p>;
      }

      return (
            <section className={classes.meals}>
                  <Card>
                        <ul>{content}</ul>
                  </Card>
            </section>
      );
}
