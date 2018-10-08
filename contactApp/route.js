angular.module('contactModule')
.config(function($stateProvider, $urlRouterProvider) {

let startPageState = {
   name: 'start',
   url: '/',
   component: 'startPageComponent',
   resolve: {
       function(startPageService, $transition$) {
         return startPageService.getContacts($transition$.params());
       }
 }}


$stateProvider.state(startPageState)

 $urlRouterProvider.otherwise('/')

 })
