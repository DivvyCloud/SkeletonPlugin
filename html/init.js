
function helloWorldRoutes($stateProvider) {
    $stateProvider
        .state('helloworld', {
            url: '/helloworld',
            abstract: true,
            templateUrl: '/plugin/helloworld/html/partials/layout.html',
            controller: LayoutController,
            controllerAs: 'ctrl'
        })
        .state('helloworld.first', {
            parent: 'helloworld',
            url: '/first',
            title: 'First',
            views: {
                'container@insights': {
                    templateUrl: '/plugin/helloworld/html/partials/first.html',
                    controller: FirstController,
                    controllerAs: 'ctrl'
                }
            }
        })
        .state('helloworld.second', {
            parent: 'helloworld',
            url: '/second',
            title: 'Second',
            views: {
                'container@insights': {
                    templateUrl: '/plugin/helloworld/html/partials/second.html',
                    controller: SecondController,
                    controllerAs: 'ctrl'
                }
            }
        });
};

function LayoutController($rootScope, $scope, $state, $stateParams){
    var ctrl = this;
    ctrl.tabs = [
        {
            'id': 'helloworld.first',
            'label': 'Thing One',
            'icon': 'home'
        },
        {
            'id': 'helloworld.second',
            'icon': 'list',
            'label': 'Thing Two'
        }
    ];

    // Get active tab
    ctrl.activeTab = R.find(R.propEq('id', $state.current.name))(ctrl.tabs);

    // Get the current name
    ctrl.name = $state.$current.name;
    ctrl.title = $state.$current.title;

    // Watch for successful state changes and update our name/title
    $rootScope.$on( "$stateChangeSuccess", function(event, toState, _toParams, _fromState, _fromParams) {
        ctrl.name = toState.name;
        ctrl.title = toState.title;
        ctrl.activeTab = R.find(R.propEq('id', ctrl.name))(ctrl.tabs);
    });

    ctrl.gotoTab = function(tab){
        ctrl.activeTab = tab;
        var params = {'id': $stateParams.id};
        $state.transitionTo(tab.id, params);
    };
}

function FirstController($scope){
    var ctrl = this;
    ctrl.hello = 'First';
};

function SecondController($scope){
    var ctrl = this;
    ctrl.hello = 'Second';
};


angular.module('HelloWorld', [])
    .config(helloWorldRoutes);
