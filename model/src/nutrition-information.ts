import { Energy } from './energy';
import { Mass } from './mass';
import { NutritionInformationBuilder } from './nutrition-information-builder';

export class NutritionInformation {
  calories: Energy;
  carbohydrateContent: Mass;
  cholesterolContent: Mass;
  fatContent: Mass;
  fiberContent: Mass;
  proteinContent: Mass;
  saturatedFatContent: Mass;
  servingSize: string;
  sodiumContent: Mass;
  sugarContent: Mass;
  transFatContent: Mass;
  unsaturatedFatContent: Mass;
  constructor(builder: NutritionInformationBuilder) {
    this.calories = builder._calories;
    this.carbohydrateContent = builder._carbohydrateContent;
    this.cholesterolContent = builder._cholesterolContent;
    this.fatContent = builder._fatContent;
    this.fiberContent = builder._fiberContent;
    this.proteinContent = builder._proteinContent;
    this.saturatedFatContent = builder._saturatedFatContent;
    this.servingSize = builder._servingSize;
    this.sodiumContent = builder._sodiumContent;
    this.sugarContent = builder._sugarContent;
    this.transFatContent = builder._transFatContent;
    this.unsaturatedFatContent = builder._unsaturatedFatContent;
  }
}