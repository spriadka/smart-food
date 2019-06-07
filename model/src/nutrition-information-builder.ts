import {Energy} from './energy';
import {Mass} from './mass';
import { NutritionInformation } from './nutrition-information';

export class NutritionInformationBuilder {
  _calories: Energy = new Energy(0,'kJ');
  _carbohydrateContent: Mass = new Mass(0,'g');
  _cholesterolContent: Mass = new Mass(0,'g');
  _fatContent: Mass = new Mass(0,'g');
  _fiberContent: Mass = new Mass(0,'g');
  _proteinContent: Mass = new Mass(0,'g');
  _saturatedFatContent: Mass = new Mass(0,'g');
  _servingSize: string = "";
  _sodiumContent: Mass = new Mass(0,'g');
  _sugarContent: Mass = new Mass(0,'g');
  _transFatContent: Mass = new Mass(0,'g');
  _unsaturatedFatContent: Mass = new Mass(0,'g');

  calories(amount: number, unit: string) : NutritionInformationBuilder {
    this._calories = new Energy(amount, unit);
    return this;
  }

  carbohydrateContent(amount: number, unit: string) : NutritionInformationBuilder {
    this._carbohydrateContent = new Mass(amount, unit);
    return this;
  }

  cholesterolContent(amount: number, unit: string) : NutritionInformationBuilder {
    this._cholesterolContent = new Mass(amount, unit);
    return this;
  }

  fatContent(amount: number, unit: string) : NutritionInformationBuilder {
    this._fatContent = new Mass(amount, unit);
    return this;
  }

  fiberContent(amount: number, unit: string) : NutritionInformationBuilder {
    this._fiberContent = new Mass(amount, unit);
    return this;
  }

  proteinContent(amount: number, unit: string) : NutritionInformationBuilder {
    this._proteinContent = new Mass(amount, unit);
    return this;
  }

  saturatedFatContent(amount: number, unit: string) : NutritionInformationBuilder {
    this._saturatedFatContent = new Mass(amount, unit);
    return this;
  }

  servingSize(servingSize: string) : NutritionInformationBuilder {
    this._servingSize = servingSize;
    return this;
  }

  sodiumContent(amount: number, unit: string) : NutritionInformationBuilder {
    this._sodiumContent = new Mass(amount, unit);
    return this;
  }

  sugarContent(amount: number, unit: string) : NutritionInformationBuilder {
    this._sugarContent = new Mass(amount, unit);
    return this;
  }

  transFatContent(amount: number, unit: string) : NutritionInformationBuilder {
    this._transFatContent = new Mass(amount, unit);
    return this;
  }

  unsaturatedFatContent(amount: number, unit: string) : NutritionInformationBuilder {
    this._unsaturatedFatContent = new Mass(amount, unit);
    return this;
  }

  build() : NutritionInformation {
    return new NutritionInformation(this);
  }
}