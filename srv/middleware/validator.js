'use strict';
const _ = require('lodash');

const validator = {

      'strings': function (object, args, regexes = []) {
            if (!object) {
                  return false;
            }

            if (!Array.isArray(args)) {
                  args = [args];
            }

            if (!Array.isArray(regexes)) {
                  regexes = [regexes];
            }

            for (let index = 0; index < args.length; index++) {
                  const element = _.get(object, args[index]);
                  if (!element || typeof element != 'string') {
                        return false;
                  } else if (regexes[index] && !element.match(regexes[index])) {
                        return false;
                  } else continue;
            }

            return true;
      },

      'login': function (req, res, next) {
            const fields = ['email', 'password'];
            const regexes = [/^[@.a-zA-Z0-9_-]{4,50}$/, /^.{4,50}$/];
            const result = validator.strings(req.body, fields, regexes);
            return result ? next() : res.status(400).end();
      }

};

module.exports = validator;