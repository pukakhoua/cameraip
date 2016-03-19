angular.module('module.utils',[])
    .factory('Helper', function ($rootScope) {
        return {
            getScrollBarWidth: function () {
                var html = '<div style="position: absolute; top: -9999px; left: 0; overflow: scroll;">' +
                    '<div style="width: 100px; height: 100px;"></div>' +
                    '</div>';
                var $testDiv = $(html);
                var $testDivChild = $testDiv.find('div');

                $testDiv.appendTo('body');

                return $testDiv.width() - $testDivChild.width();
            },
            broadcastWhat: function (event, agrs) {
                $rootScope.$broadcast(event, agrs);
            },
            isPageScrollToBottom: function () {
                var scrollHeight = $(document).height();
                var scrollPosition = $(window).height() + $(window).scrollTop();
                return (scrollHeight - scrollPosition) / scrollHeight === 0;
            }
        }
    })

