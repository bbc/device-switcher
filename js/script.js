// Copyright (c) 2015 British Broadcasting Corporation

require.config({
  paths: {
    jquery: "../bower_components/jquery/dist/jquery.min"
  }
});

requirejs(
    ['jquery'],
    function ($) {
        function setUpSwitcher(aIsDemo) {
            var defaultParameters = {
                    device: 'mobile',
                    url: 'http://bbcnewslabs.co.uk'
                },
                hash = (function() {
                    function getParameters(aParameters) {
                        var hash = window.location.hash.substring(1),
                            parametersInHash = hash.split('&'),
                            parameters = { device: defaultParameters.device };

                        for (var i = 0; i < parametersInHash.length; i++) {
                            var parameter = parametersInHash[i].split('='),
                                parameterName = parameter[0],
                                parameterValue = parameter[1];
                            if (parameterName == 'device' || parameterName == 'url') {
                                parameters[parameterName] = parameterValue;
                            }
                        }

                        if (typeof aParameters != 'undefined') {
                            parameters = $.extend(parameters, aParameters);
                        }
                        if ($.inArray(parameters.device, ['mobile', 'tablet', 'desktop']) < 0) {
                            parameters.device = defaultParameters.device;
                        }
                        if (parameters.hasOwnProperty('url')) {
                            parameters.url = decodeURIComponent(parameters.url);
                            if (aIsDemo) {
                                var regex = /^https?:\/\/(www\.)?(bbcnewslabs\.co\.uk|[^\#\?\/.]+\.bbc\.co(\.uk|m))(\/|\?|$)/;
                                if (!regex.test(parameters.url)) {
                                    console.log("[WARNING] In demo mode, only URLs to BBC web pages may be used as custom URLs.")
                                    parameters.url = 'http://www.bbc.co.uk/news';
                                }
                            }
                        }

                        return parameters;
                    }

                    function update(aParameters) {
                        var url = window.location,
                            newUrl = url.protocol + '//' + url.host + url.pathname + '#' + $.param(aParameters);

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
                        var $deviceDisplay = $('.device-display'),
                            url = (typeof aUrl == 'undefined' ? defaultParameters.url : aUrl);

                        if ($deviceDisplay.attr('src') != url) {
                            $deviceDisplay.attr('src', url);
                        }
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
    }
);
