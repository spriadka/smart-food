import { NutritionInformation } from "./nutrition-information";

export class FoodEntry {
  name: string;
  brand: string;
  nutritionInfo: NutritionInformation;
  images: URL[];

  constructor(_name: string, _brand: string, _nutritionInfo: NutritionInformation, _images: URL[]) {
    this.name = _name;
    this.brand = _brand;
    this.nutritionInfo = _nutritionInfo;
    this.images = _images;
  }
}