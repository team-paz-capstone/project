/*
 * SOURCE: https://spring.io/guides/tutorials/react-and-spring-data-rest/
 * */

const rest = require('rest');
const defaultRequest = require('rest/interceptor/defaultRequest');
const mime = require('rest/interceptor/mime');
const errorCode = require('rest/interceptor/errorCode');
const baseRegistry = require('rest/mime/registry');
const uriTemplateInterceptor = require('./api/helpers/uriTemplateInterceptor');

const registry = baseRegistry.child();

registry.register('text/uri-list', require('./api/helpers/uriListConverter'));
registry.register('application/hal+json', require('rest/mime/type/application/hal'));

module.exports = rest
  .wrap(mime, { registry })
  .wrap(uriTemplateInterceptor)
  .wrap(errorCode)
  .wrap(defaultRequest, { headers: { Accept: 'application/hal+json' } });
