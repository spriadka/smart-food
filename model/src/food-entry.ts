import { NutritionInformation } from "./nutrition-information";
import { Mass } from "./mass";

export class FoodEntry {
  name: string;
  brand: string;
  amount: Mass
  nutritionInfo: NutritionInformation;
  dateOfPurchase: Date;
  expirationDate: Date;
  images: URL[];

  constructor(_name: string, _brand: string = "", _amount: Mass = new Mass(0,'g'),_nutritionInfo: NutritionInformation, _images: URL[], _dateOfPurchase: Date = new Date(Date.now()), _expirationDate: Date = new Date(_dateOfPurchase)) {
    this.name = _name;
    this.brand = _brand;
    this.amount = _amount;
    this.nutritionInfo = _nutritionInfo;
    this.dateOfPurchase = _dateOfPurchase;
    this.expirationDate = _expirationDate;
    this.images = _images;
  }
}