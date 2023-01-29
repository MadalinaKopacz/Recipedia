import { Box, Button, Typography } from "@mui/material";

interface ShoppingListInfo {
  recipeName: string;
  ingredientList: string[];
  checkedArray: boolean[];
}

export default function ShoppingList(props: ShoppingListInfo) {
  const ExportShoppingList = () => {
    let text = props.recipeName + "\n\n";
    for (let i = 0; i < props.ingredientList.length; i++) {
      if (!props.checkedArray[i]) {
        text = text + props.ingredientList[i] + "\n";
      }
    }

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
    <Box
      sx={{
        my: 2,
        paddingY: 3,
        paddingX: 4,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
      }}
      style={{
        color: "#DD0426",
        backgroundColor: "#FFD9A1",
        borderRadius: 40,
        textTransform: "none",
        fontFamily: "Playfair",
        fontWeight: "bold",
        marginTop: 40,
        maxWidth: 500,
      }}
      onClick={ExportShoppingList}
    >
      <Box
        sx={{
          marginRight: 1,
        }}
      >
        <img
          src="/media/shopping-cart.svg"
          alt="share"
          height={30}
          width={30}
        />
      </Box>
      <Typography
        sx={{
          fontFamily: "Playfair",
          fontWeight: "bold",
        }}
      >
        Download Shopping List
      </Typography>
    </Box>
  );
}
