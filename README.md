## BBC News Labs
### BBC Device Switcher

#### Description

The [**BBC Device Switcher**](http://bbc.github.io/device-switcher) is an open-source web app that has been designed to allow editorial staff and developers to view the websites upon which they work in their mobile, tablet and desktop forms, with ease.

#### Setup
Clone the **BBC Device Switcher** via the following command:

```
git clone git@github.com:bbc/device-switcher.git
```

**BBC Device Switcher** uses the [**jQuery**](https://jquery.com/) and [**RequireJS**](http://requirejs.org/) JavaScript libraries, which you may download using the [**Bower**](http://bower.io/) dependency management system.

Once you have installed **Bower**, execute the following command within the **BBC Device Switcher** directory to install the necessary dependencies:

```
bower install
```

As the **BBC Device Switcher** is solely comprised of a single static web page, it is possible to test the app by opening `index.html` in a web browser.

However, if you would prefer to test the app on a server, you may instantiate one via the following Python command:

```
python -m SimpleHTTPServer 5705
```

and open the page via [`http://localhost:5705`](http://localhost:5705).

#### Parameters
Two parameters may be used to specify the state of the switcher:

- **`device`**, which specifies the type of device in which the edition will be displayed on the page and must be one of the following:
  - `mobile`
  - `tablet`
  - `desktop`
- **`url`**, which may be used to specify (in URL-encoded form) the URL of a website that may be displayed within the switcher

Parameters should be specified after a hash (`#`) that follows the base News Switcher URL, like so:

- [`http://bbc.github.io/device-switcher/#device=mobile`](http://bbc.github.io/device-switcher/#device=mobile), which will display the [default web page](http://bbcnewslabs.co.uk/) in its mobile form
- [`http://bbc.github.io/device-switcher/#device=tablet&url=http%3A%2F%2Fwww.bbc.co.uk%2Fnews`](http://localhost:5705/#device=tablet&url=http%3A%2F%2Fwww.bbc.co.uk%2Fnews), which will display the [BBC News](http://www.bbc.co.uk/news) website in its tablet form

***Please note:*** *in order to avoid the app being used maliciously, [the demo of the app](http://bbc.github.io/device-switcher/) has been set up to only allow URLs of BBC web-pages to be specified in the `url` parameter; any other URLs will redirect to the [BBC News](http://www.bbc.co.uk/news) website; to remove this behaviour on your own version of the Device Switcher, simply pass `false` as the value of the `aIsDemo` argument to the `setUpSwitcher` function*


#### Fonts
The following font files have been used (and distributed under the [SIL Open Font License](http://scripts.sil.org/OFL), 1.1) to brand the BBC Device Switcher:

- **Montserrat.ttf**: Copyright (c) 2011-2012, Julieta Ulanovsky (julieta.ulanovsky@gmail.com), with Reserved Font Names 'Montserrat'
- **Montserrat.woff2**: Copyright (c) 2011-2012, Julieta Ulanovsky (julieta.ulanovsky@gmail.com), with Reserved Font Names 'Montserrat'
