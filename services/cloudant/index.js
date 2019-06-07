const Cloudant = require('@cloudant/cloudant');
const uuid = require('uuidv4');

var cloudant = Cloudant({
  url: process.env.CLOUDANT_URL,
  username: process.env.CLOUDANT_USERNAME,
  plugins: {
    iamauth: {
      iamApiKey: process.env.IAM_API_KEY
    }
  }
})

cloudant.db.create('smartfood',(err,body) => {
  if (err) {
    console.log(err.message)
  }
  if (body) [
    console.log(body)
  ]
});