import classes from "./MainNavigation.module.css";
import Header from "../Header";

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <Header />
      </nav>
    </header>
  );
};

export default MainNavigation;
