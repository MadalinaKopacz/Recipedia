type Recipe = {
  calories: number;
  cautions: string[];
  cuisineType: string[];
  dietLabels: string[];
  digest: [];
  dishType: string[];
  healthLabels: string[];
  image: string;
  images: [];
  ingredientLines: string[];
  ingredients: [];
  label: string;
  mealType: string[];
  shareAs: string;
  source: string;
  totalDaily: { [key: string]: Nutrient };
  totalNutrients: { [key: string]: Nutrient };
  totalTime: number;
  totalWeigth: number;
  uri: string;
  url: string;
  yeild: number;
  categories: string[];
};

type Nutrient = {
  label: string;
  quantity: number;
  unit: string;
};

type User = {
  first_name: string;
  last_name: string;
  username: string;
  preference_diet: string[];
  preference_health: string[];
  favorites: Recipe[];
  profile_picture: string;
  email: string;
};

export type { Recipe, User, Nutrient };
