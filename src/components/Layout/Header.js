import classes from "./Header.module.css"
import HeaderCartButton from "./HeaderCartButton"

const mealImage = "https://raw.githubusercontent.com/academind/react-complete-guide-code/11-practice-food-order-app/extra-files/meals.jpg"

export default function Header(props) {
    return <>
        <header className={classes.header}>
            <h1>ReactMeals</h1>
            <HeaderCartButton onClick={props.onShowCart}/>
        </header>
        <div className={classes.mainImage}>
            <img src= {mealImage} alt="pictures of food"/>
        </div>
    </>
}