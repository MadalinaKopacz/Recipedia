import { Box, Grid, Link, Modal, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../App";
import { Recipe } from "../../DTOs";

interface RecipeInfo {
  recipe: Recipe;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "#EFE2D3",
  boxShadow: 24,
  p: 4,
  outline: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "15px",
};

export default function RecipeIntro({ recipe }: RecipeInfo) {
  const [favRecipes, setFavRecipes] = useState<Recipe[]>([]);
  const [open, setOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const context = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (context.user?.favorites != null) setFavRecipes(context.user?.favorites);
  }, [context.user?.favorites]);

  const addFavorite = () => {
    if (isFavorite) {
      return;
    }
    setIsFavorite(true);
    axios
      .post(
        "http://localhost:8000/user/update_favorites/",
        { command: "add", recipe: recipe },
        {
          headers: {
            Authorization: context.token,
          },
        }
      )
      .then((resp) => {})
      .catch((error) => {
        console.error(error);
      });
  };

  const removeFavorite = () => {
    if (!isFavorite) {
      return;
    }
    setIsFavorite(false);
    axios
      .post(
        "http://localhost:8000/user/update_favorites/",
        { command: "remove", recipe: recipe },
        {
          headers: {
            Authorization: context.token,
          },
        }
      )
      .then((resp) => {})
      .catch((error) => {
        console.error(error);
      });
  };

  const handleFavoriteOnClick = () => {
    setOpen(true);
  };

  const redirectSource = () => {
    if (recipe.source) window.open(recipe.url);
  };

  const handleFavsLoggedInUser = () => {
    if (isFavorite) {
      return (
        <img
          src="/media/favorite-heart-red.svg"
          alt="favorite-heart-red"
          onClick={removeFavorite}
          height={40}
          width={40}
        />
      );
    } else {
      return (
        <img
          src="/media/not-favorite-heart-red.svg"
          alt="not-favorite-heart-red"
          onClick={addFavorite}
          height={40}
          width={40}
        />
      );
    }
  };
  const handleFavsNotLoggedInUser = () => {
    return (
      <img
        src="/media/not-favorite-heart-red.svg"
        alt="not-favorite-heart-red"
        onClick={handleFavoriteOnClick}
        height={40}
        width={40}
      />
    );
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (favRecipes) {
      for (let i = 0; i < favRecipes.length; i++) {
        if (favRecipes[i].uri === recipe.uri) {
          setIsFavorite(true);
        }
      }
    }
  }, [context.token, favRecipes, recipe.uri]);
  if (
    recipe.image ===
      "https://edamam-product-images.s3.amazonaws.com/web-img/564/5648dc3132160f07414fb225f45c1d09.gif?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQDxS2SAArIwSSzZqJacswkTfFuxJY6HflYM3KzZU9rNPwIhAL4%2BWIb1j5HVowZCIjUsTABljufPenEEwPi%2BWu8ICVj4KrgFCDkQABoMMTg3MDE3MTUwOTg2IgzEZtvWso%2FyVZYzLlAqlQUXhYAj91SoGxvHv4I7zWGs5lzywIChco%2Bqoi9gw0tvsaqlPMFJREdRuH06wcAVDA7YZp%2BeCCgVuJRjv54b3eh%2BDa4Tg9TJ8e4gAzQJPD4DfRI6SQ0reWmM%2Fi7gdd2Euj9iCLyGrthfawqkBE6MOfKIsIbWmFNw4qpkRPLg%2F8u7MYSM9gFCBRTADRhd2iYVrDkDPea6a3wHgnVBKlnw7XtvivRcZ1cS7wECpGbNh1r09CG4Qy45VSBJDaVXkUU%2BRkh6ECEtTBaVv4Un%2F2WoXqtirS637m5Aj2ENyTv77PjTvML%2B9IlzS4QT3ow8czonX4dbg0YFdgd3w79SKX1H%2F8Ll6zssBzNv0YMjoW9QY4ojNP2At2ni80v0gPJlm9VQ5tcVFeVMuA48htTRbYAiFQXRMWgbrKp5V6gpgrpERTJAbUrACOc0%2F7r15m3usVJkGCaVqedAS1bFtb4%2B5xa0VBGXx%2FR5KDDdKJxgf9NDD8hHsnoIHaGs3Pn5mOSKqVp05IoBWjaRS1p8V0TFSsOwDCSEnf5AMpI%2FrBJHhU4Ntb%2F2Y0OU5kffEln1NcPVZqP6WKd%2FlB2CeQmjjKve5B1AkZrfwD4A0Wvzwm%2FxBg4K4j8%2F6hCiluK073vDKtFDGuHSruNOvA6h8aF4N%2FWS0IIP11UtLdoeg%2Fn1q6nkXjuAMe1zoFCP%2FIiJd92PHRNMxs9r%2BS2h%2BRnjgDDemgSbn28z2LJr3s2rwhSkAoEiXvBDSwB6MYH9PlV3vHXA0rFDlqE0rCJzBC7%2BNnlzFcMaFr%2BDJjT7srcwu9HrANkkdCnmuI8ef7699QJvDfgnl%2FCZqZB%2BtCXEeG6l%2BKWkWV3xmX9q%2BDYaSF5w1VjcLG4us3iPXaq0SHg5dFs5MOefzJ4GOrABYybeEmxC2eCdhgYhAR3Nu%2BDMhk7DrDr2FL2RX2rZuua276M53wEeUm0vOY1aWUwMKYiTLSpGc6pUzWOC8DNSQWnDqFduqyBJz4YnyNnA4vNIefU2%2BsLbcaKUleQCgO1%2B43D9Lv9aGP7BshTy8hc%2FXZJ20Qq630mbL6zButAxZ3TRGtW7Kbw5iwAS%2FdntjJBlVB89TKpQAKweS0F1QU00uXAl1UqLwSBCycveFzymaY4%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230127T002512Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFFFSTHY3B%2F20230127%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=edc1c6c3f395a0debd260699767cc27920ce97070ea7aaa128548b7f69cea287" ||
    recipe.image ===
      "https://edamam-product-images.s3.amazonaws.com/web-img/286/28635841b2d4c8c057dfa4191d322da1.png?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQDxS2SAArIwSSzZqJacswkTfFuxJY6HflYM3KzZU9rNPwIhAL4%2BWIb1j5HVowZCIjUsTABljufPenEEwPi%2BWu8ICVj4KrgFCDkQABoMMTg3MDE3MTUwOTg2IgzEZtvWso%2FyVZYzLlAqlQUXhYAj91SoGxvHv4I7zWGs5lzywIChco%2Bqoi9gw0tvsaqlPMFJREdRuH06wcAVDA7YZp%2BeCCgVuJRjv54b3eh%2BDa4Tg9TJ8e4gAzQJPD4DfRI6SQ0reWmM%2Fi7gdd2Euj9iCLyGrthfawqkBE6MOfKIsIbWmFNw4qpkRPLg%2F8u7MYSM9gFCBRTADRhd2iYVrDkDPea6a3wHgnVBKlnw7XtvivRcZ1cS7wECpGbNh1r09CG4Qy45VSBJDaVXkUU%2BRkh6ECEtTBaVv4Un%2F2WoXqtirS637m5Aj2ENyTv77PjTvML%2B9IlzS4QT3ow8czonX4dbg0YFdgd3w79SKX1H%2F8Ll6zssBzNv0YMjoW9QY4ojNP2At2ni80v0gPJlm9VQ5tcVFeVMuA48htTRbYAiFQXRMWgbrKp5V6gpgrpERTJAbUrACOc0%2F7r15m3usVJkGCaVqedAS1bFtb4%2B5xa0VBGXx%2FR5KDDdKJxgf9NDD8hHsnoIHaGs3Pn5mOSKqVp05IoBWjaRS1p8V0TFSsOwDCSEnf5AMpI%2FrBJHhU4Ntb%2F2Y0OU5kffEln1NcPVZqP6WKd%2FlB2CeQmjjKve5B1AkZrfwD4A0Wvzwm%2FxBg4K4j8%2F6hCiluK073vDKtFDGuHSruNOvA6h8aF4N%2FWS0IIP11UtLdoeg%2Fn1q6nkXjuAMe1zoFCP%2FIiJd92PHRNMxs9r%2BS2h%2BRnjgDDemgSbn28z2LJr3s2rwhSkAoEiXvBDSwB6MYH9PlV3vHXA0rFDlqE0rCJzBC7%2BNnlzFcMaFr%2BDJjT7srcwu9HrANkkdCnmuI8ef7699QJvDfgnl%2FCZqZB%2BtCXEeG6l%2BKWkWV3xmX9q%2BDYaSF5w1VjcLG4us3iPXaq0SHg5dFs5MOefzJ4GOrABYybeEmxC2eCdhgYhAR3Nu%2BDMhk7DrDr2FL2RX2rZuua276M53wEeUm0vOY1aWUwMKYiTLSpGc6pUzWOC8DNSQWnDqFduqyBJz4YnyNnA4vNIefU2%2BsLbcaKUleQCgO1%2B43D9Lv9aGP7BshTy8hc%2FXZJ20Qq630mbL6zButAxZ3TRGtW7Kbw5iwAS%2FdntjJBlVB89TKpQAKweS0F1QU00uXAl1UqLwSBCycveFzymaY4%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230127T002217Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFFFSTHY3B%2F20230127%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=6cb317484ec2188216b69fd3f3063d0f83461ea829149f1ce5f9891be9e5824f" ||
    recipe.image ===
      "https://edamam-product-images.s3.amazonaws.com/web-img/286/28635841b2d4c8c057dfa4191d322da1.png?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQDsGDrwuJYScR3FjCi%2FhvGURPD%2Bi2NkjkaJ0xN188dSZwIgfOtaY2ijuG%2FnL%2BsEeKqs8uk%2BKahPFZ86I2YX2NsB6XEquAUIQxAAGgwxODcwMTcxNTA5ODYiDH9krbkgZmUFnrfwVCqVBfpWGDrP2IQF7LDHlJ6NjiUWH87Ruwcuvyd2ebwaIgQSWgxV628nFhz9rDLiEDtPBytc17BC059i8UK5Tou28CTvyPBEOHroT2INyhqmnl8qC%2F6P1PSlVNWAOEBKw94IjGF%2FIFFd1EE60urzQE3UC9g7IyUkLM8Q0Z%2Btuz%2FHGr2E7JOvv6sBdslH5e9lAZx2kDb30bTRVa%2F0OkcXj8W%2B3zkDcKx7WkSFD%2FGmCnWIhnJLSy0CisA1dawmQppZ8sBo0cW76dE8Gl3h2%2FMpdBLx1v2u%2FGCOD2zu1n4f3WtISt%2FV%2BxAzJdfRWBKikbZNf72G%2FsGdUUvp1vOhw%2BdIWAh5w4Xaq51NiI5co3EFd%2FB3fS%2B8Quwq9Yz149dIr2GUflIVxVry5YbsCX%2F14%2FZ6KdjnPOFVKTHQzc3k8HJv4ijyOpgvEJesA37zl%2FZCXA5Jw%2F6rDZhBWy%2BD%2F1c%2Bnkxg6zFeTEJz8LLry%2BdnhEPafL50OKqZXnyDgltIJAdyIxpmJNYVq5QsvfQ0lZaVCLgsOcnzM5jk5CJwjS3blRJB88COI%2BcAZVeSq3H7FZpnip7CpyBawPnkd4E3L22BXUE1VuNnOxQ7OKObV%2FMnzqI961a2Skj8si%2BRaKi9Na65kaFpgXwhcD6HFdZNO5%2Bk89Lx4RkoTxB7imD9qOnf5%2BNQMmk5vyMXfm4R1SyQGb5QvRi9H4Gd0cmYcRyKi79%2BvXeVkLE5DXPzBoqQmjXhgUBRGI6h%2By5J3Kw9p7CdhH0kup11Qfvq5b15%2BZfsW46m5FPiZQrr6%2F5DakLzH02NM%2BXf3fjscsd2R8UC%2BDGGGqKO4IW3AHJO5CmJWH9qJ2NilmgFu2ShFN%2FRi339HrjfqJByLtL7ox4hjmjZxE0wpMXOngY6sQEgTmq6tByGahr4CA8d8T5zLhg7vQ8E9WkcinLSAi%2BjjUaCJ%2BM6BlAud6uYNfEqhOqL3IUMqAxRZmEcmAOkswBbwA4pNO4cUcE3QnOBi5QPbo%2BbPYjLA%2BdoI%2FqTORiRJc4FU9OX%2Ffc0O0eXTZOQVtyvyAwH4JN7Wldmsp3DUgL10tJ%2F3cl0v9pHXct8xWR8dx8XpPxE4N81A49UkSL0uNu7w%2B8zVjf9qKcM7WTBubQpF54%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230127T112832Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFMY4NT6NO%2F20230127%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=ffcd13f6643949938e31dcfae219d7ce4d35b4654961cb6e368977c1c6eeeab0" ||
    recipe.image ===
      "https://edamam-product-images.s3.amazonaws.com/web-img/286/28635841b2d4c8c057dfa4191d322da1.png?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIAWcS%2BgoM%2BzItrh5CvzUj1mSR2sPwH1ZrYM3bK6%2F6qAKAiEAvbz0oikffSxgGPwKUcwkcBA5fi4HaSM1GJF5iyWvsWkquAUIRBAAGgwxODcwMTcxNTA5ODYiDDiPBbnU6S%2FtVM51oSqVBdc1Ymo3b8QOJGfBSYHXBdR3UfBWBt8q3weqZNIlkeBFKabjqj%2BtO1nJtF%2FRBPFB%2F2yPcryaI8BPJsvvhSg0b3o3I7IjMrw%2BhyHH2nBK27iuK%2FnFJAi99SQ9Y0f7glAUEDZCJo8CaHnXj%2Bzz13Xg5LVgJII2TCa0CY%2FRzdWGyzML41wM2vRkPfM6H%2BrJTiuD2asBXdpFib%2B4BAX1IjQqKpBvxMUZzij6cNjdN4E9v7CsfbmwkC5A7%2BQfZ809ZIffnvr4Mqc9GilXjHeQZIDKy1lPSANguMzCBN%2B63RlLLG3uECAB%2F2L3AJmS29tVnjwAaahcggbeJ5XPOZrlnPWh5d%2B%2BXrY6%2FRPilHKSsJh2sjrx2N79ExjrF9nJtsC%2BQ9Og92YMtszNh91%2FkFTR2wmm0TFy2QFAIhPtt9MxBWnY4CWOoyK7dLHbJBg2%2BeDWagMnr4ELYeAiNp1ahV0b%2Fvob0WI1HPNBwg1Yw1XmcaQtI%2BMZ%2B%2FoOUiJ1JmaDTAPSJWnN%2FsAppWmRzYepKJ52VLvqEuHgJqFHmVuWIioA0gfUcbB638Zmar73pY8FxxdXNTsrVASfWHYLnbjfYRMJCYGN%2Bq8nDkIo6LxF1ZO%2BaGbQBzrNDM657mO9c%2Fg5hLGIbV8W%2FKUJlOxANwm1e66ttLktXtoICPouKn9v%2B%2B%2B6qKq3SYto9QxKPst0zSiOLI7YwQwG5swlmT3Liy3iMesDhxFXFI9QDVZpxoC2qV7jUKzlBPNON6dabDjiubx8g1IX%2BVXShvpeEb43H7DwYcB8Q5ajd7d40j8mwQeCN3VX6fN2%2FpEBo9yyZh8YiMgxee2xC0oAs%2FXx8h0pkgQPPDYBtxnJuJxKD3oWr8LjoDr8Vg0sa3BWdQw8sYQwyeLOngY6sQH%2Fx9hThXijQv8n3GxFCpk7SDEPhATp2bmrmuw6j1TJcN2cm6fFbQOFm0bWseqnSvYi9FHd3whfIhZ3ieUqKUwq8Ek%2F52G6%2FfSmcXriV8j2LL1FWa0mEn4z9KZ0kwxQrOLr7XwevPLGvz7WcC%2B8Nq%2FV3bey9V2bMd5Hq9VDaKAbJqac%2FvmW%2FhsaPnONL65Ef3G4%2FVn2lONKMQVJZVhIfZna%2BbG4l7YzMNy82Q5WGZ123%2FU%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230127T115746Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFDGK4VD7Z%2F20230127%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=d8047c9c80aa5e3e2b496970e69ffcfcb46f0290f08200d4517249d6afe9048e" ||
    recipe.image ===
      "https://edamam-product-images.s3.amazonaws.com/web-img/286/28635841b2d4c8c057dfa4191d322da1.png?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIAWcS%2BgoM%2BzItrh5CvzUj1mSR2sPwH1ZrYM3bK6%2F6qAKAiEAvbz0oikffSxgGPwKUcwkcBA5fi4HaSM1GJF5iyWvsWkquAUIRBAAGgwxODcwMTcxNTA5ODYiDDiPBbnU6S%2FtVM51oSqVBdc1Ymo3b8QOJGfBSYHXBdR3UfBWBt8q3weqZNIlkeBFKabjqj%2BtO1nJtF%2FRBPFB%2F2yPcryaI8BPJsvvhSg0b3o3I7IjMrw%2BhyHH2nBK27iuK%2FnFJAi99SQ9Y0f7glAUEDZCJo8CaHnXj%2Bzz13Xg5LVgJII2TCa0CY%2FRzdWGyzML41wM2vRkPfM6H%2BrJTiuD2asBXdpFib%2B4BAX1IjQqKpBvxMUZzij6cNjdN4E9v7CsfbmwkC5A7%2BQfZ809ZIffnvr4Mqc9GilXjHeQZIDKy1lPSANguMzCBN%2B63RlLLG3uECAB%2F2L3AJmS29tVnjwAaahcggbeJ5XPOZrlnPWh5d%2B%2BXrY6%2FRPilHKSsJh2sjrx2N79ExjrF9nJtsC%2BQ9Og92YMtszNh91%2FkFTR2wmm0TFy2QFAIhPtt9MxBWnY4CWOoyK7dLHbJBg2%2BeDWagMnr4ELYeAiNp1ahV0b%2Fvob0WI1HPNBwg1Yw1XmcaQtI%2BMZ%2B%2FoOUiJ1JmaDTAPSJWnN%2FsAppWmRzYepKJ52VLvqEuHgJqFHmVuWIioA0gfUcbB638Zmar73pY8FxxdXNTsrVASfWHYLnbjfYRMJCYGN%2Bq8nDkIo6LxF1ZO%2BaGbQBzrNDM657mO9c%2Fg5hLGIbV8W%2FKUJlOxANwm1e66ttLktXtoICPouKn9v%2B%2B%2B6qKq3SYto9QxKPst0zSiOLI7YwQwG5swlmT3Liy3iMesDhxFXFI9QDVZpxoC2qV7jUKzlBPNON6dabDjiubx8g1IX%2BVXShvpeEb43H7DwYcB8Q5ajd7d40j8mwQeCN3VX6fN2%2FpEBo9yyZh8YiMgxee2xC0oAs%2FXx8h0pkgQPPDYBtxnJuJxKD3oWr8LjoDr8Vg0sa3BWdQw8sYQwyeLOngY6sQH%2Fx9hThXijQv8n3GxFCpk7SDEPhATp2bmrmuw6j1TJcN2cm6fFbQOFm0bWseqnSvYi9FHd3whfIhZ3ieUqKUwq8Ek%2F52G6%2FfSmcXriV8j2LL1FWa0mEn4z9KZ0kwxQrOLr7XwevPLGvz7WcC%2B8Nq%2FV3bey9V2bMd5Hq9VDaKAbJqac%2FvmW%2FhsaPnONL65Ef3G4%2FVn2lONKMQVJZVhIfZna%2BbG4l7YzMNy82Q5WGZ123%2FU%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230127T115912Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFDGK4VD7Z%2F20230127%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=89cc13b66035b0feefa2424e1f63405543ef264ddfbab66a612fcfcce0870bfd"
  ) {
    return (
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          borderRadius: 35,
          margin: 10,
          height: "15vw",
          minWidth: 10,
          minHeight: 130,
          justifyContent: "center",
          flexDirection: "column",
          display: "flex",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontStyle: "italic",
            fontFamily: "Playfair",
            fontSize: "2.5vw",
            textAlign: "center",
          }}
        >
          {recipe.label}
        </Typography>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <Grid
            item
            sx={{
              marginX: 2,
              marginTop: 2,
            }}
          >
            <div>
              {context.user
                ? handleFavsLoggedInUser()
                : handleFavsNotLoggedInUser()}
              <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                  <Typography sx={{ fontFamily: "Playfair" }}>
                    To add favorites, please <Link href="/login">log in</Link>{" "}
                    or <Link href="/register">register</Link>.
                  </Typography>
                </Box>
              </Modal>
            </div>
          </Grid>
          {recipe.source && (
            <Grid item sx={{ marginTop: 2, paddingLeft: "8vw" }}>
              <img
                src="/media/share.svg"
                alt="share"
                onClick={redirectSource}
                height={40}
                width={40}
              />
            </Grid>
          )}
        </Grid>
      </Box>
    );
  } else {
    return (
      <Grid container>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontStyle: "italic",
              fontFamily: "Playfair",
              textAlign: "center",
              fontSize: "2vw",
              marginX: 10,
              marginBottom: 1,
            }}
          >
            {recipe.label}
          </Typography>
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
              marginTop: 1,
            }}
          >
            <Grid
              item
              sx={{
                marginRight: 2,
              }}
            >
              <div>
                {context.user
                  ? handleFavsLoggedInUser()
                  : handleFavsNotLoggedInUser()}
                <Modal open={open} onClose={handleClose}>
                  <Box sx={style}>
                    <Typography sx={{ fontFamily: "Playfair" }}>
                      To add favorites, please <Link href="/login">log in</Link>{" "}
                      or <Link href="/register">register</Link>.
                    </Typography>
                  </Box>
                </Modal>
              </div>
            </Grid>
            {recipe.source && (
              <Grid item>
                <img
                  src="/media/share.svg"
                  alt="share"
                  onClick={redirectSource}
                  height={40}
                  width={40}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={recipe.image}
            alt="recipeImage"
            height={300}
            width={400}
            style={{
              marginTop: 24,
              marginBottom: 24,
              borderRadius: 80,
              objectFit: "cover",
            }}
          />
        </Grid>
      </Grid>
    );
  }
}
