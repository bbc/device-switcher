function setUpSwitcher(aIsDemo) {
    var hash = (function() {
            function getParameters(aParameters) {
                var hash = window.location.hash.substring(1),
                    parametersInHash = hash.split('&'),
                    parameters = {
                        device: 'mobile',
                        url: false
                    };

                for (var i = 0; i < parametersInHash.length; i++) {
                    var parameter = parametersInHash[i].split('='),
                        parameterName = parameter[0],
                        parameterValue = parameter[1];
                    if (parameters.hasOwnProperty(parameterName)) {
                        parameters[parameterName] = parameterValue;
                    }
                }

                if (typeof aParameters != 'undefined') {
                    parameters = $.extend(parameters, aParameters);
                }

                if ($.inArray(parameters.device, ['mobile', 'tablet', 'desktop']) < 0) {
                    parameters.device = 'mobile';
                }

                if (aIsDemo) {
                    if (parameters.url != false) {
                        var regex = /^https?:\/\/(www\.)?(bbcnewslabs\.co\.uk|[^\#\?\/.]+\.bbc\.co(\.uk|m))(\/|\?|$)/,
                            decodedUrl = decodeURIComponent(parameters.url);
                        if (!regex.test(decodedUrl)) {
                            console.log("[WARNING] In demo mode, only URLs to BBC web pages may be used as custom URLs.")
                            parameters.url = encodeURIComponent('http://www.bbc.co.uk/news');
                        }
                    }
                }

                return parameters;
            }

            function getQueryString(aParameters) {
                var queryString = '#device=' + aParameters.device;

                if (aParameters.url != false) {
                    queryString += '&url=' + aParameters.url;
                }

                return queryString;
            }

            function update(aParameters) {
                var url = window.location,
                    newUrl = url.protocol + '//' + url.host + url.pathname + getQueryString(aParameters);

                if(url != newUrl) {
                    window.location = newUrl;
                }
            }

            return {
                getParameters: getParameters,
                update: update
            }
        })(),
        ui = (function() {
            function switchDevice(aDevice) {
                var $body = $('body');
                $body.removeClass();
                $body.addClass(aDevice);
                $('.device-option').removeClass('selected');
                $("[data-device-type='" + aDevice + "']").addClass('selected');
            }

            function switchUrl(aUrl) {
                var url = 'http://bbcnewslabs.co.uk';

                if (aUrl != false) {
                    url = decodeURIComponent(aUrl);
                }

                $('.device-display').attr('src', url);
            }

            function update(aParameters) {
                var parameters = hash.getParameters(aParameters);

                switchDevice(parameters.device);
                switchUrl(parameters.url);
                hash.update(parameters);
            }

            return {
                update: update
            }
        })();

    ui.update();

    $(window).on('hashchange', function() {
        ui.update();
    });

    $('.device-option').click(function() {
        var device = $(this).attr('data-device-type');
        ui.update({ device: device });
    });

    $('.device-options-container').each(function() {
        var $container = $(this);
            $chevronBar = $container.find('.chevron-bar');

        $chevronBar.click(function() {
            if($container.hasClass('collapsed')) {
               $container.removeClass('collapsed');
            } else {
                $container.addClass('collapsed');
            }
        });
    });
}

$(document).ready(function(){
    setUpSwitcher(true);
});
