
function routes($stateProvider) {
    $stateProvider
        .state('helloworld', {
            url: '/helloworld',
            templateUrl: '/plugin/helloworld/html/partials/helloworld.html',
            controller: 'HelloWorldController',
        })};


function HelloWorldController($scope,$mdToast,StateService){
    $scope.hello = 'helloworld';
    $scope.data = [];

    $scope.getData = function (){
           return StateService.intent({
            endpoint: 'helloworld.get_list',
            onSuccess: function (response) {

                $scope.data = JSON.parse(response.data);
                console.log($scope.data);

            },
            onError: function(response) {
                $mdToast.show(
                    $mdToast.simple()
                        .content(response.data.error_message)
                        .position('top right')
                        .hideDelay(6000)
            )}});
    }
};

angular.module('HelloWorld', [])
        .config(routes)
        .controller('HelloWorldController', HelloWorldController);

