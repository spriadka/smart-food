require('es7-object-polyfill');

const express = require('express');
const session = require('express-session');
const log4js = require('log4js');
const passport = require('passport');

const path = require('path');

const URL = require('url').URL;

const appEnv = require('cfenv').getAppEnv({
  name: 'authserver',
  vcapFile: path.join(__dirname, 'vcap-local.json')
});

const health = require('@cloudnative/health-connect');

let healthCheck = new health.HealthChecker();

const WebAppStrategy = require('ibmcloud-appid').WebAppStrategy;

const app = express();
const logger = log4js.getLogger('smart-food-auth-server');

app.use(passport.initialize());

const LOGIN_URL = '/login';
const CALL_BACK_URL = '/callback';

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'smart food secret'
}));

app.use(passport.initialize());
app.use(passport.session());

const appIDCredentials = Object.values(appEnv.getServices()).find(service => service.label == "AppID").credentials;

passport.use(new WebAppStrategy({
  tenantId: appIDCredentials.tenantId,
  clientId: appIDCredentials.clientId,
  secret: appIDCredentials.secret,
  oauthServerUrl: appIDCredentials.oauthServerUrl,
  redirectUri: appEnv.url + CALL_BACK_URL
}));

function parseUrl(url) {
  try {
    return new URL(url);
  } catch (DOMException) {
    return new URL(url, appEnv.url)
  }
};

passport.serializeUser((user,cb) => {
  cb(null,user);
});

passport.deserializeUser((obj,cb) => {
  cb(null,obj);
});

app.get(LOGIN_URL, passport.authenticate(WebAppStrategy.STRATEGY_NAME, {
    successRedirect: '/success',
    forceLogin: true
  }));

app.get(CALL_BACK_URL, passport.authenticate(WebAppStrategy.STRATEGY_NAME));

const redirectUrl = parseUrl(process.env.REDIRECT_URL);

app.get('/success', (req,res) => {
  console.log(req);
  res.redirect(redirectUrl + '?access_token=' + req.session.APPID_AUTH_CONTEXT.accessToken);
});

app.use('/health', health.LivenessEndpoint(healthCheck));

require('appmetrics-prometheus').attach();

app.listen(appEnv.port || 3000 );