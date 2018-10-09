angular.module('contactModule')
.controller('startPageController', ['startPageService', function(startService) {
  this.startPageService = startService

  this.control = {
    response: false,
  }

}])
