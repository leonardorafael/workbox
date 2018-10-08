/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

module.exports = `/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

<% if (workboxSWImport) { %>
importScripts(<%= JSON.stringify(workboxSWImport) %>);
<% if (modulePathPrefix) { %>workbox.setConfig({modulePathPrefix: <%= JSON.stringify(modulePathPrefix) %>});<% } %>
<% } %>
<% if (importScripts) { %>
importScripts(
  <%= importScripts.map(JSON.stringify).join(',\\n  ') %>
);
<% } %>

<% if (cacheId) { %>workbox.core.setCacheNameDetails({prefix: <%= JSON.stringify(cacheId) %>});<% } %>

<% if (skipWaiting) { %>workbox.skipWaiting();<% } %>
<% if (clientsClaim) { %>workbox.clientsClaim();<% } %>

<% if (Array.isArray(manifestEntries)) {%>
/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = <%= JSON.stringify(manifestEntries, null, 2) %>.concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, <%= precacheOptionsString %>);
<% } else { %>
if (Array.isArray(self.__precacheManifest)) {
  workbox.precaching.suppressWarnings();
  workbox.precaching.precacheAndRoute(self.__precacheManifest, <%= precacheOptionsString %>);
}
<% } %>
<% if (navigateFallback) { %>workbox.routing.registerNavigationRoute(<%= JSON.stringify(navigateFallback) %><% if (navigateFallbackWhitelist || navigateFallbackBlacklist) { %>, {
  <% if (navigateFallbackWhitelist) { %>whitelist: [<%= navigateFallbackWhitelist %>],<% } %>
  <% if (navigateFallbackBlacklist) { %>blacklist: [<%= navigateFallbackBlacklist %>],<% } %>
}<% } %>);<% } %>

<% if (runtimeCaching) { runtimeCaching.forEach(runtimeCachingString => {%><%= runtimeCachingString %><% });} %>

<% if (offlineAnalyticsConfigString) { %>workbox.googleAnalytics.initialize(<%= offlineAnalyticsConfigString %>);<% } %>`;
