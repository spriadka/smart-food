'use strict';

const Cloudant = require('@cloudant/cloudant');
const uuid = require('uuidv4');

async function run(params) {
  var cloudant = Cloudant({
    url: params.CLOUDANT_URL,
    username: params.CLOUDANT_USERNAME,
    plugins: {
      iamauth: {
        iamApiKey: params.IAM_API_KEY
      }
    }
  })
  let db = cloudant.db.use(params.DATABASE_NAME);
  try {
    return await db.destroy(params.DOC_ID, params.DOC_REV);
  } catch (err) {
    throw err;
  }
}

exports.run = run