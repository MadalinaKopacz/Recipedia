import ResponsiveAppBar from "../components/Headers/StartPageHeader";
import SearchIngredients from "../components/IngredientsPage/SearchIngredients";
import StartPageHeader from "../components/StartPage/StartPageBody";

const IngredientsPage = () => {
    return (
      <>
        <ResponsiveAppBar/>
        <SearchIngredients/>
      </>
    );
};

export default IngredientsPage;