'use strict';

// @@ cuz all these feelings never took me down (8)
const properties = {
  'apps': [ {
    'name': 'space',
    'script': 'srv/index.js',
    'log_date_format': 'DDDD DD MM YYYY HH:mm',
    'max_memory_restart': '512M',
    'exec_mode': 'fork_mode',
    'instances': 2,
    'env': {
      'NODE_ENV': 'development',
      'APP_DATABASE_HOST': 'localhost',
      'APP_DATABASE_USERNAME': 'root',
      'APP_DATABASE_PASSWORD': 'root',
      'APP_DATABASE_DATABASE': 'inschool'
    }
  }
  ]
}

// @@ Hearts beating
module.exports = properties;
