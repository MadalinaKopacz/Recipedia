import StartPageHeader from "../components/Headers/StartPageHeader";
import ShoppingList from "../components/SingleRecipePage/ShoppingList";
import StartPageBody from "../components/StartPage/StartPageBody";

const StartPage = () => {
  return (
    <>
      <StartPageHeader />
      <StartPageBody />
      <ShoppingList recipeName={"Chec pufos"} ingredientsList={["chec, pufos, dragoste"]} />
    </>
  );
};

export default StartPage;
