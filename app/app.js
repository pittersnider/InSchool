// @@ Setup nunjucks
nunjucks.configure({ web: { async: true } });

String.prototype.format = function () {
  const args = arguments;
  return this.replace(/{(\d+)}/g, function (match, number) {
    return typeof args[number] != 'undefined'
      ? args[number]
      : match
    ;
  });
};

String.format = function (format) {
  const args = Array.prototype.slice.call(arguments, 1);
  return format.replace(/{(\d+)}/g, function (match, number) {
    return typeof args[number] != 'undefined'
      ? args[number]
      : match
    ;
  });
};

// @@ Setup variables
Giantboard = {
  root: 'http://giantboard.vm',
  apps: {},
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
    const deep = _.values(arguments);
    let result = '';

    _.initial(deep).forEach(function (name) {
      const pattern = '<li class="breadcrumb-item"><a href="#">%s</a></li>';
      result += pattern.replace('%s', name);
    });

    const last = _.last(deep);
    if (last) {
      const pattern = '<li class="breadcrumb-item active"><a href="#">%s</a></li>';
      result += pattern.replace('%s', last);
      $('.page-title').text(last).change();
    }

    $('.breadcrumb').html(result).change();
  },
  fire: function (jQueryEvent, eventName) {
    const ev = Giantboard.events[eventName] || function () { console.error('Event %s not defined', eventName); };
    return ev(jQueryEvent);
  },
  view: function (name) {
    return Giantboard.views[name];
  },
  render: function (view, selector, data) {
    const fullData = data ? _.merge(data, Giantboard) : Giantboard;
    const build = nunjucks.renderString(Giantboard.view(view), fullData);
    const el = $(selector || view).html(build).change();
    return el;
  },
  heartbeat: function () {
    const queue = _.values(arguments);
    return queue.forEach(function (item) {
      if (Array.isArray(item)) {
        return Giantboard.render(...item);
      }
      return Giantboard.render(item);

    });
  },
  display: function (selector) {
    return $(selector).css('display', '').change();
  },
  hide: function (selector) {
    return $(selector).css('display', 'none').change();
  },
  getController: function (name) {
    return Giantboard.controllers[name];
  },
  initRouter: function () {
    page('/overview', Giantboard.getController('check'), Giantboard.getController('overview'));
    page('/login', Giantboard.getController('login'));
    page('/register', Giantboard.getController('register'));
    page('/', Giantboard.getController('check'), () => page.redirect('/overview'));
    page.start();
  }
};

// @@ Setup the router's controllers
Giantboard.controllers = {

  login: function (ctx) {
    $('body').addClass('bg-accpunt-pages');
    Giantboard.hide('footer, header');
    Giantboard.render('login', '#stack');
    Giantboard.display('body');
  },

  register: function (ctx) {
    $('body').addClass('bg-accpunt-pages');
    Giantboard.hide('footer, header');
    Giantboard.render('register', '#stack');
    Giantboard.display('body');
  },

  overview: function (ctx) {
    $('body').removeClass('bg-accpunt-pages');
    Giantboard.heartbeat('header', 'footer', [ 'overview', '#stack' ]);
    Giantboard.display('body, footer, header');
    Giantboard.breadcrumb('Meu Space', 'Visão Geral');

    if (!Giantboard.first) {
      setTimeout(function () {
        $('.app__welcome').fadeOut(600);
      }, 5000);

      Giantboard.first = true;
    } else {
      $('.app__welcome').hide();
    }

    $('#app__calendar_overview').fullCalendar({
      timezone: 'America/Sao_Paulo',
      timeFormat: '(HH):00',
      weekends: false,
      selectable: false,
      defaultDate: moment(),
      events: String.format('/api/v1/person/{0}/calendar', Giantboard.session.user.id)
    });
  },

  check: function (ctx, next) {

    if (Giantboard.session) {
      return next && next();
    }

    return $.get({
      type: 'GET',
      url: '/api/v1/session',
      xhrFields: {
        withCredentials: true
      },

      success: function (data) {
        Giantboard.session = data;
        return next && next();
      },

      error: function () {
        Giantboard.session = null;
        return page.redirect('/login');
      }
    });

  }

};

// @@ Setup the event's catcher
Giantboard.events = {
  login: function (event) {

    event.preventDefault();
    const inputs = $('#bd-signin').find('input');
    const items = {
      email: $('#auth__email').val(),
      password: $('#auth__password').val()
    };

    $.post({
      type: 'POST',
      url: '/api/v1/session/login',
      data: items,
      dataType: 'json',
      xhrFields: {
        withCredentials: true
      },

      success: function (data) {
        Giantboard.session = { user: data };
        return page.redirect('/overview');
      },

      error: function () {
        return swal(
          'Oops...',
          'Senha incorreta.<br/>Por favor, tente novamente.',
          'error'
        );
      }

    });

  },
  logout: function (event) {

    event.preventDefault();
    Giantboard.session = null;

    $.ajax({
      type: 'DELETE',
      url: '/api/v1/session',

      success: function (data) {
        Giantboard.session = null;
        window.location.href = '/login';
      },

      error: function () {
        return swal(
          'Oops...',
          'Falha ao encerrar sessão.<br/>Por favor, tente novamente.',
          'error'
        );
      }

    });

  }
};

// @@ Cache all views and load basic main layout
Giantboard.reloadViews(function (error, result) {

  if (error) {
    throw error;
  }

  $(document).ready(function () {
    Giantboard.initRouter();
  });

});

// @@ Register jQuery events
$('body').on('click', '#ca-signin', Giantboard.events.login);
$('body').on('click', '#auth__logout', Giantboard.events.logout);

(function ($) {

  function initNavbar() {

    $('body').on('click', '.navbar-toggle', function (event) {
      $(this).toggleClass('open');
      $('#navigation').slideToggle(400);
    });

    $('.navigation-menu>li').slice(-2).addClass('last-elements');

    $('body').on('click', '.navigation-menu li.has-submenu a[href="#"]', function (e) {
      if ($(window).width() < 992) {
        e.preventDefault();
        $(this).parent('li').toggleClass('open').find('.submenu:first').toggleClass('open');
      }
    });
  }

  function initScrollbar() {
    $('.slimscroll').slimscroll({
      height: 'auto',
      position: 'right',
      size: '8px',
      color: '#9ea5ab'
    });
  }

  function init() {
    initNavbar();
    initScrollbar();
  }

  init();

})(jQuery);
