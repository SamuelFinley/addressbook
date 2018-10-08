angular.module('contactModule')
.component('startPageComponent', {
  templateUrl: 'contactApp/startPage/startPageTemplate.html',
  controller: 'startPageController',
  controllerAs: 'startCtrl',
  bindings: {
    'toggle': '='
  }
})
