angular.module("app", ["templates"])
    .directive("app", () => {
        return {
            scope: {},
            restrict: "E",
            templateUrl: "./js/app/app.tpl.html",
        };
    })
    .directive("contentView", () => {
        return {
            scope: {},
            restrict: "E",
            transclude: true,
            templateUrl: "./js/app/content-view.tpl.html",
            controller: ["$scope", "$element", sortDatas],
        };

        function sortDatas($scope) {
            $scope.choice = {
                singleSelect: null,
                date: "date",
                title: "title"
            };

            $scope.datas = makeDefaulData();
            let str = $scope.datas;
            $scope.filterSort = (newTitle, addForm) => {
                for (let obj in str) {
                    if ($scope.isChecked == true) {
                        str[obj].date = str[obj].date.slice(0, str[obj].date.indexOf('T'));
                    } else {
                        str[obj].date = str[obj].date;
                    }
                }
                if (addForm.$valid && newTitle !== undefined) {
                    let obj = {
                        id: makeDataId(),
                        title: newTitle
                    }
                    str.push(obj);
                }
            };

        }
    })
    .directive("sidebarView", () => {
        return {
            scope: {},
            restrict: "E",
            templateUrl: "./js/app/sidebar-view.tpl.html",
        };
    })
    .directive("elementsView", () => {
        return {
            scope: {},
            restrict: "E",
            templateUrl: "./js/app/elements-view.tpl.html",
            controller: ["$scope", "$element", elementsViewCtrl],
        };

        function elementsViewCtrl($scope, $element) {
            $scope.model = {
                width: 300,
            };
            $scope.setWidth = () => {
                let width = $scope.model.width;
                if (!width) {
                    width = 1;
                    $scope.model.width = width;
                }
                $element.css("width", `${width}px`);
            };
            $scope.setWidth();
            $scope.datas = makeDefaulData();
        }
    })
    .directive("some1", () => {
        return {
            scope: {},
            restrict: "E",
            template: "<some-2></some-2>",
        };
    })
    .directive("some2", () => {
        return {
            scope: {},
            restrict: "E",
            template: "<some-3></some-3>",
        };
    })
    .directive("some3", () => {
        return {
            scope: {},
            restrict: "E",
            template: "<summary-view></summary-view>",
        };
    })
    .directive("summaryView", () => {
        return {
            require: '^contentView',
            restrict: "E",
            transclude: true,
            scope: {},
            link: function(scope, element, attrs, ctrl) {
                scope.datas = makeDefaulData();
                scope.arr = [];
                for (let obj in scope.datas) {
                    for (let tag in scope.datas[obj].tags) {
                        scope.arr.push(scope.datas[obj].tags[tag]);
                    }
                }
                scope.set = new Set(scope.arr);
                scope.result = Array.from(scope.set);
            },
            templateUrl: "./js/app/summary-view.tpl.html",
        };

        // function tagsAndLastElemts($scope) {}
    });