app.directive('onErrorSrc', function() {
    return {
        link: function(scope, element, attrs) {
            if (!attrs.ngSrc || attrs.ngSrc =="") {
                attrs.$set('src', attrs.onErrorSrc);
            }
            else
            {
                element.bind('error', function() {
                    if (attrs.src != attrs.onErrorSrc) {
                        attrs.$set('src', attrs.onErrorSrc);
                    }
                });
            }
        }
    }
});