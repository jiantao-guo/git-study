hecModule.controller('$nineBlockCtrl', [
	'$scope',
	'$nineBlockDelegate',
	'$ionicHistory',
	function($scope, $nineBlockDelegate, $ionicHistory){
	var self = this;
	var deregisterInstance = $nineBlockDelegate._registerInstance(
 		self, $scope.config.delegateHandle, function(){
 			return $ionicHistory.isActiveScope($scope);
 		}
 	);

	self.refreshTipCount = function(){
		console.log(' $nineBlockCtrl -- self.refreshTipCount ');
		$scope.refreshTipsCount();
	};

}]);