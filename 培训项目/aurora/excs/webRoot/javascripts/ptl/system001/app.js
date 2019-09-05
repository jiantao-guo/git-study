/**
* Created by mouse on 2015-5-22.
*/
var system001App = angular.module('system001App',['system001Controller', 'system001Service','system001NewsController','system001NewsService']);

system001App.config(function ($sceProvider) {
    $sceProvider.enabled(false);
});