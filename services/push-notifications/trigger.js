const openwhisk = require('openwhisk');
const uuidv4 = require('uuidv4');

const ow = openwhisk({
  api_host: 'eu-gb.functions.cloud.ibm.com',
  api_key: 'f810dc73-f5a6-4556-bdbf-f343ae243cfb:xsuj7eJD75CNuIBfLfekygyqZSf2he4U6d4xWIh4TQ0hfZ0vuCGlNVdfzUy4U848'
});

run = async (params) => {
  const triggerName = 'trigger-' + uuidv4();
  await ow.triggers.create({name: triggerName});
  await ow.feeds.create({
    name: '/whisk.system/alarms/once',
    trigger: triggerName,
    params: {
      deleteAfterFire: 'rules',
      trigger_payload: params.TRIGGER_PAYLOAD,
      date: params.DATE
    }});
  const rule = 'rule-' + uuidv4();
  return await ow.rules.create({
    name: rule,
    action: params.ACTION,
    trigger: triggerName
  })
}

exports.run = run;