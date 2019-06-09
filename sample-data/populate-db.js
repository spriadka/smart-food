const Cloudant = require('@cloudant/cloudant');

const FoodEntry = require('smartfood-model/lib/food-entry').FoodEntry;
const Mass = require('smartfood-model/lib/mass').Mass;
const NutritionInformationBuilder = require('smartfood-model/lib/nutrition-information-builder').NutritionInformationBuilder;

const entries = [
  new FoodEntry("Banana", "Chiquita", new Mass(100,'g'), new NutritionInformationBuilder()
  .calories(89,'calories')
  .carbohydrateContent(23,'g')
  .proteinContent(1.1,'g')
  .build(), []),
  new FoodEntry('Greek White Yogurt 0% fat Milko','Milko', new Mass(140,'g'), new NutritionInformationBuilder()
  .proteinContent(14,'g')
  .carbohydrateContent(5,'g')
  .sugarContent(4,'g')
  .fatContent(0.42,'g')
  .saturatedFatContent(0.28,'g')
  .build(), []),
  new FoodEntry("Mila Sedita","Sedita", new Mass(50, 'g'), new NutritionInformationBuilder()
  .proteinContent(5,'g')
  .calories(1148,'kJ')
  .carbohydrateContent(24,'g')
  .sugarContent(17,'g')
  .fatContent(18,'g')
  .saturatedFatContent(12,'g')
  .fiberContent(2,'g')
  .build(), []),
  new FoodEntry('Cherry Tomatotes', '', new Mass(100,'g'), new NutritionInformationBuilder()
  .calories(90,'kJ')
  .proteinContent(0.9,'g')
  .carbohydrateContent(4,'g')
  .fatContent(0.2,'g')
  .fiberContent(1,'g')
  .build(),[])
]

var cloudant = Cloudant({
  url: process.env.CLOUDANT_URL,
  username: process.env.CLOUDANT_USERNAME,
  plugins: {
    iamauth: {
      iamApiKey: process.env.IAM_API_KEY
    }
  }
})

cloudant.db.create('sample-data',(err,body) => {
  if (err) {
    console.log(err.message)
  }
});

const sampleDataDB = cloudant.db.use('sample-data');
entries.forEach(entry => {
  sampleDataDB.insert(entry);
})


