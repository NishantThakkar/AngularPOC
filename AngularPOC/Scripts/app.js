/// <reference path="angular.js" />
var TodoApp = angular.module("TodoApp", ["ngResource"]).
    config(function ($routeProvider) {
        $routeProvider.
            when('/', { controller: ListCtrl, templateUrl: 'list.html' }).
            when('/new', { controller: CreateCtrl, templateUrl: 'detail.html' }).
             when('/edit/:editId', { controller: EditCtrl, templateUrl: 'detail.html' }).
        otherwise({ redirectTo: '/' });
    })
.directive('greet', function () {
    return {
        template: '<h2> Greetings from {{from}} to  {{to}}  </h2>',
        controller: function ($scope, $element, $attrs) {
            $scope.from = $attrs.from;
            $scope.to = $attrs.to;
        }
    };

})

.directive('sorted', function () {
    return {
        scope: true,
        transclude: true,
        template: '<a ng-click="do_sort()" ng-transclude></a>' +
      '<span ng-show="do_show(true)"><i class="icon-circle-arrow-down"></i></span>' +
      '<span ng-show="do_show(false)"><i class="icon-circle-arrow-up"></i></span>',
        controller: function ($scope, $element, $attrs) {
            $scope.sort = $attrs.col;

            $scope.do_sort = function () { $scope.sort_by($scope.sort); };

            $scope.do_show = function (asc) {
                return (asc != $scope.sort_desc) && ($scope.sort_order == $scope.sort);
            };
        }
    };

});

//var ListCtrl = function ($scope, $location) {
//    $scope.test = "testing";
//};

TodoApp.factory('Todo', function ($resource) {
    return $resource('/api/todo/:id', { id: '@id' }, { update: { method: 'PUT' } });
});

var CreateCtrl = function ($scope, $location, Todo) {
    $scope.save = function () {
        Todo.save($scope.item, function () {
            $location.path('/');
        });
    };
    $scope.action = 'Add';
}

var EditCtrl = function ($scope, $location, $routeParams, Todo) {
    var id = $routeParams.editId;
    $scope.item = Todo.get({ id: id });
    $scope.action = 'Update';

    $scope.save = function () {
        Todo.update({ id: id }, $scope.item, function () {
            $location.path('/');
        });
    };
}

var ListCtrl = function ($scope, $location, Todo) {
    $scope.search = function () {
        Todo.query({
            q: $scope.query,
            sort: $scope.sort_order,
            desc: $scope.sort_desc,
            limit: $scope.limit,
            offset: $scope.offset
        },
        function (data) {
            $scope.more = data.length == 10;
            $scope.items = $scope.items.concat(data);
        });
    };

    $scope.sort_order = "Priority";
    $scope.sort_desc = false;

    $scope.sort_by = function (ord) {
        if ($scope.sort_order == ord) { $scope.sort_desc = !$scope.sort_desc; }
        else { $scope.sort_desc = false; }
        $scope.sort_order = ord;
        $scope.reset();
    };

    $scope.do_show = function (asc, col) {
        return (asc != $scope.sort_desc) && ($scope.sort_order == col);
    };

    $scope.has_more = function () { return $scope.more; };

    $scope.reset = function () {
        $scope.limit = 10;
        $scope.offset = 0;
        $scope.items = [];
        $scope.more = true;
        $scope.search();
    };

    $scope.show_more = function () {
        $scope.offset += $scope.limit;
        $scope.search();
    };

    $scope.delete = function () {
        var id = this.item.Id;
        Todo.delete({ id: id }, function () {
            $('#todo_' + id).fadeOut();
        });
    };

    $scope.reset();
};

