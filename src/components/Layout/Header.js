import classes from "./Header.module.css"
import React from "react"

const mealImage = "https://raw.githubusercontent.com/academind/react-complete-guide-code/11-practice-food-order-app/extra-files/meals.jpg"

export default function Header(props) {
    return <>
        <header className={classes.header}>
            <h1>ReactMeals</h1>
            <button>Cart</button>
        </header>
        <div className={classes.mainImage}>
            <img src= {mealImage} alt="pictures of food"/>
        </div>
    </>
}