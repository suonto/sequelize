'use strict';

const _ = require('lodash');
const { Op } = require('../../../operators');
const { getOperators } = require('../../../utils/format');

const OperatorHelpers = {
  OperatorMap: {
    [Op.eq]: '=',
    [Op.ne]: '!=',
    [Op.gte]: '>=',
    [Op.gt]: '>',
    [Op.lte]: '<=',
    [Op.lt]: '<',
    [Op.not]: 'IS NOT',
    [Op.is]: 'IS',
    [Op.in]: 'IN',
    [Op.notIn]: 'NOT IN',
    [Op.like]: 'LIKE',
    [Op.notLike]: 'NOT LIKE',
    [Op.iLike]: 'ILIKE',
    [Op.notILike]: 'NOT ILIKE',
    [Op.startsWith]: 'LIKE',
    [Op.notStartsWith]: 'NOT LIKE',
    [Op.endsWith]: 'LIKE',
    [Op.notEndsWith]: 'NOT LIKE',
    [Op.substring]: 'LIKE',
    [Op.notSubstring]: 'NOT LIKE',
    [Op.regexp]: '~',
    [Op.notRegexp]: '!~',
    [Op.iRegexp]: '~*',
    [Op.notIRegexp]: '!~*',
    [Op.between]: 'BETWEEN',
    [Op.notBetween]: 'NOT BETWEEN',
    [Op.overlap]: '&&',
    [Op.contains]: '@>',
    [Op.contained]: '<@',
    [Op.adjacent]: '-|-',
    [Op.strictLeft]: '<<',
    [Op.strictRight]: '>>',
    [Op.noExtendRight]: '&<',
    [Op.noExtendLeft]: '&>',
    [Op.any]: 'ANY',
    [Op.all]: 'ALL',
    [Op.and]: ' AND ',
    [Op.or]: ' OR ',
    [Op.col]: 'COL',
    [Op.placeholder]: '$$PLACEHOLDER$$',
    [Op.match]: '@@',
  },

  OperatorsAliasMap: {},

  setOperatorsAliases(aliases) {
    if (!aliases || _.isEmpty(aliases)) {
      this.OperatorsAliasMap = false;
    } else {
      this.OperatorsAliasMap = { ...aliases };
    }
  },

  _replaceAliases(orig) {
    const obj = {};
    if (!this.OperatorsAliasMap) {
      return orig;
    }

    for (const op of getOperators(orig)) {
      const item = orig[op];
      if (_.isPlainObject(item)) {
        obj[op] = this._replaceAliases(item);
      } else {
        obj[op] = item;
      }
    }

    _.forOwn(orig, (item, prop) => {
      prop = this.OperatorsAliasMap[prop] || prop;
      if (_.isPlainObject(item)) {
        item = this._replaceAliases(item);
      }

      obj[prop] = item;
    });

    return obj;
  },
};

module.exports = OperatorHelpers;
