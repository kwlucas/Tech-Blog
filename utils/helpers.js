module.exports = {
  format_date: date => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  },
  ifComparison: function (operator, item1, item2, options) {
    switch (operator) {
      case '==':
        return (item1 == item2) ? options.fn(this) : options.inverse(this);
      case '===':
        return (item1 === item2) ? options.fn(this) : options.inverse(this);
      case '!=':
        return (item1 != item2) ? options.fn(this) : options.inverse(this);
      case '!==':
        return (item1 !== item2) ? options.fn(this) : options.inverse(this);
      case '<':
        return (item1 < item2) ? options.fn(this) : options.inverse(this);
      case '<=':
        return (item1 <= item2) ? options.fn(this) : options.inverse(this);
      case '>':
        return (item1 > item2) ? options.fn(this) : options.inverse(this);
      case '>=':
        return (item1 >= item2) ? options.fn(this) : options.inverse(this);
      case '&&':
        return (item1 && item2) ? options.fn(this) : options.inverse(this);
      case '||':
        return (item1 || item2) ? options.fn(this) : options.inverse(this);
      default:
        return false;
    }
  }
};