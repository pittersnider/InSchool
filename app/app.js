// @@ Setup nunjucks
nunjucks.configure({ web: { async: true } });

// @@ Setup variables
Giantboard = {
  root: 'http://giantboard.vm',
  label: {
    title: 'Meu Space',
    company: 'Cassiano'
  },
  reloadViews: function (next) {
    return $.get(Giantboard.root + '/api/v1/views').then(function (result) {
      Giantboard.views = result;
      return next(null, Giantboard);
    }).catch(next);
  },
  breadcrumb: function () {
    var deep = _.values(arguments);
    var result = '';

    _.initial(deep).forEach(function (name) {
      var pattern = '<li class="breadcrumb-item"><a href="#">%s</a></li>';
      result += pattern.replace('%s', name);
    });

    var last = _.last(deep);
    if (last) {
      var pattern = '<li class="breadcrumb-item active"><a href="#">%s</a></li>';
      result += pattern.replace('%s', last);
      $('.page-title').text(last).change();
    }

    $('.breadcrumb').html(result).change();
  },
  fire: function (jQueryEvent, eventName) {
    var ev = Giantboard.events[eventName] || function () { console.error('Event %s not defined', eventName); };
    return ev(jQueryEvent);
  },
  view: function (name) {
    return Giantboard.views[name];
  },
  render: function (view, selector, data) {
    var build = nunjucks.renderString(Giantboard.view(view), data || Giantboard);
    return $(selector || view).html(build).change();
  },
  heartbeat: function () {
    var queue = _.values(arguments);
    return queue.forEach(function (item) {
      if (Array.isArray(item)) {
        return Giantboard.render(...item);
      } else {
        return Giantboard.render(item);
      }
    });
  },
  display: function (selector) {
    var el = $(selector);
    if (el.css('display') == 'none') {
      el.css('display', '').change();
    }

    return el;
  },
  hide: function (selector) {
    return $(selector).css('display', 'none').change();
  },
  controller: function (name) {
    return Giantboard.controllers[name];
  },
  initRouter: function () {
    page('/', Giantboard.controller('first'));
    page('/overview', Giantboard.controller('overview'));
    page('/profile', console.log);
    page('/classroom', console.log);
    page('/reports', console.log);
    page('/calendar', console.log);
    page('/support', console.log);
    page('/login', Giantboard.controller('login'));
    page('/register', console.log);
    page('*', Giantboard.controller('any'));
    page.start();
  }
};

// @@ Setup the router's controllers
Giantboard.controllers = {
  login: function (ctx) {
    $('body').addClass('bg-accpunt-pages');
    Giantboard.hide('footer, header');
    Giantboard.render('login', '#stack');
  },
  overview: function (ctx) {
    Giantboard.heartbeat('header', 'footer', ['overview', '#stack']);
    Giantboard.display('footer, header');
    Giantboard.breadcrumb('Meu Space', 'Visao Geral');
    $('body').removeClass('bg-accpunt-pages');
  },
  first: function (ctx) {
    page.redirect('/login');
  },
  any: function (ctx) {
    page.redirect('/overview');
  }
};

// @@ Setup the event's catcher
Giantboard.events = {
  login: function (event) {
    event.preventDefault();
    var inputs = $('#bd-signin').find('input');
    var items = {};

    inputs.each(function (input) {
      items[input.id] = input.value;
    });

    console.log(items);
  }
};

// @@ Cache all views and load basic main layout
Giantboard.reloadViews(function (error, result) {

  $(document).ready(function () {
    Giantboard.heartbeat('header', 'footer');
    Giantboard.initRouter();
    Giantboard.display('body');
  });

});

// @@ Register jQuery events
$('body').on('click', '#ca-signin', Giantboard.events.login);