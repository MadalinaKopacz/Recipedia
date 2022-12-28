type Recipe = {
  recipe: {
    label: string;
    image: string;
    dishType: [string];
    categories: [string];
  };
};

type User = {
  first_name: string,
  last_name: string,
  username: string;
  preference_diet: string[],
  preference_health: string[],
  favorites: string[],
  profile_picture: string;
  email: string;
}

export type { Recipe, User };
