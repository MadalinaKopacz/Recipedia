import { Button } from "@mui/material";

interface ShoppingListInfo {
  recipeName: string;
  ingredientsList: string[];
}

export default function ShoppingList(props: ShoppingListInfo) {
  const ExportShoppingList = () => {
    const text = props.recipeName + "\n\n" + props.ingredientsList;
    const blob = new Blob([text]);
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.style.display = "None";
    link.setAttribute("download", props.recipeName + " Shopping List.txt");
    document.body.appendChild(link);
    link.click();
    if (link.parentNode) link.parentNode.removeChild(link);
  };

  return (
    <Button variant="contained" onClick={ExportShoppingList}>
      Download Shopping List
    </Button>
  );
}
