var expressVue = require('express-vue');
const path = require('path');
const flash = require('express-flash');
const errorHandler = require('errorhandler');
const cors = require('cors');
const moment = require('moment');
/**
 * Controllers (route handlers).
 */

const voteController = require('../controllers/vote');

module.exports = function (app) {

  function getVueOptionsMeta() {
    var vueOptionsMeta = [
      {
        script: 'https://unpkg.com/vue@2.4.4'
      },
      {
        script: '/js/jquery'
      },
      {
        script: 'https://cdn.jsdelivr.net/npm/vue-resource@1.3.4'
      },
      {
        script: '/dist/build.js'
      },
      {
        rel: "shortcut icon",
        type: "image/png",
        href: "/favicon.png"
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, shrink-to-fit=no'
      },
      {
        property: 'og:title',
        content: 'Drumpf'
      },
      {
        property: 'og:text',
        content: 'How long will Drumpf last?'
      },
      {
        name: 'twitter:title',
        content: 'Drumpf'
      }
    ];
    if (process.env.SHOW_GA === "true") {
      vueOptionsMeta.push({
        script: '/js/analytics.js'
      })
    }
    return vueOptionsMeta;
  }

  const vueOptions = {
    rootPath: path.join(__dirname, '../public/js/vue'),
    layout: {
      html: {
        start: '<!DOCTYPE html><html>',
        end: '</html>'
      },
      body: {
        start: '<body>' + 
        '',
        end: '</body>'
      }
    },
    vue: {
      head: {
        meta: getVueOptionsMeta()
      }
    }
  };

  const expressVueMiddleware = expressVue.init(vueOptions);
  app.use(expressVueMiddleware);

  const dataLayout = {};

  function getDataForView(req, res) {
    if (!res.locals)
      return;

    var _csrf = null;

    if (res.locals) {
      if (res.locals._csrf) {
        _csrf = res.locals._csrf;
      }
    }

    var model = {
      csrfToken: _csrf,
      todayFormat:  moment(new Date()).format('YYYY-MM-DD')
    };
    return model;
  };

  //Home route
  app.get('/', function (req, res) {
    const data = getDataForView(req, res);
    res.renderVue('App', data, vueOptions);
  });

  app.get('/admin', function (req, res) {
    const data = getDataForView(req, res);
    res.renderVue('Admin', data, vueOptions);
  });

  /**
   * API Vote Routes.
   */

  //Returns Votes
  app.get('/api/vote/facit', function (req, res) {
    return voteController.getFacit(req, res);
  });

  //Save Vote
  app.post('/api/vote', function (req, res) {
    const data = getDataForView(req, res);
    voteController.post(req, res, data, vueOptions);
  });

  //Facit
  app.post('/api/vote/admin', function (req, res) {
    const data = getDataForView(req, res);
    voteController.admin(req, res, data, vueOptions);
  });

  /**
   * Error Handler.
   */
  app.use(errorHandler());
}
