# Sanity Content Studio with Markets

Markets have been defined in a config that includes Market name, and the languages supported by each market.

We have a base studio which has a global view of all of the markets, and then each indivdual market has a studio. The config is made from a base config and a plugin that takes an optional market param. This plugin defines the structure and languages based on the passed in market. 

The reason for having the markets coming from a config is this is at build time when deploying a stuido, so if the markets are fetched asynchronously you will not be able to use them in Sanity dashboard. 

If you need languages to be fetched asynchronously this is possible by passing a function to the documentInternationalization plugin for supported languages.  
