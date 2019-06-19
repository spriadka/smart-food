const Cloudant = require('@cloudant/cloudant');

const Moment = require('moment');
const FoodEntry = require('smartfood-model/lib/food-entry').FoodEntry;
const Mass = require('smartfood-model/lib/mass').Mass;
const NutritionInformationBuilder = require('smartfood-model/lib/nutrition-information-builder').NutritionInformationBuilder;

const entries = [
  { user_email: "priadkasimon@gmail.com",
    data: new FoodEntry("Banana", "Chiquita", new Mass(100,'g'), new NutritionInformationBuilder()
  .calories(89,'calories')
  .carbohydrateContent(23,'g')
  .proteinContent(1.1,'g')
  .build(), ['https://www.chiquita.com/sites/default/files/2017-12/chiquita-bananasclassextra-640x620.jpg'], new Date(), Moment(new Date()).add(3,'d').toDate())
  },
  { user_email: "priadkasimon@gmail.com",
  data: new FoodEntry('Greek White Yogurt 0% fat Milko','Milko', new Mass(140,'g'), new NutritionInformationBuilder()
  .proteinContent(14,'g')
  .carbohydrateContent(5,'g')
  .sugarContent(4,'g')
  .fatContent(0.42,'g')
  .saturatedFatContent(0.28,'g')
  .build(), ['http://www.hustyjogurt.cz/images/jogurt-bily0-1kg-en.jpg'])
  },
  { user_email: "priadkasimon@gmail.com",
    data: new FoodEntry("Mila Sedita","Sedita", new Mass(50, 'g'), new NutritionInformationBuilder()
  .proteinContent(5,'g')
  .calories(1148,'kJ')
  .carbohydrateContent(24,'g')
  .sugarContent(17,'g')
  .fatContent(18,'g')
  .saturatedFatContent(12,'g')
  .fiberContent(2,'g')
  .build(), ['data:image/jpeg;base64,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'],
  new Date(), Moment(new Date()).add(1,'M').toDate())
  },
  { user_email: "priadkasimon@gmail.com",
  data: new FoodEntry('Cherry Tomatotes', '', new Mass(100,'g'), new NutritionInformationBuilder()
  .calories(90,'kJ')
  .proteinContent(0.9,'g')
  .carbohydrateContent(4,'g')
  .fatContent(0.2,'g')
  .fiberContent(1,'g')
  .build(),['https://www.ocado.com/productImages/652/65264011_1_640x640.jpg?identifier=e62f88c2ea6d823b086fdb36e70054ca'])
  }
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

createDb = async () => {
  try {
    await cloudant.db.create('sample-data');
    console.log("Database created");
  } catch (err) {
    throw err;
  }
}

const sampleDataDB = cloudant.db.use('sample-data');
insertAllRows = async () => {
try {
  await sampleDataDB.bulk({ docs: entries });
  console.log("Inserted all rows");
} catch(err) {
  throw err;
}
};


insertIndex = async () => {
  try {
    await sampleDataDB.index({
        index: {},
        type: "text"
     });
    console.log("Inserted index");
  } catch (err) {
    throw err;
  }
};

fetchRows = async () => {
try {
  let result = await sampleDataDB.find({
    selector: {
       "user_email": "priadkasimon@gmail.com"
    },
    sort: [
       {
          "data.name:string": "asc"
       }
    ]
 })
  console.log("Got all rows");
  result.docs.forEach(doc => {
    console.log(doc.data);
  })
} catch (err) {
  throw err;
}
};

console.log(JSON.stringify(entries));

createDb().then(() => insertAllRows()).then(() => insertIndex()).then(() => fetchRows())


