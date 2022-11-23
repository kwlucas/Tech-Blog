module.exports = {
  format_date: date => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  },//Custom handlebars helper that allows to display item based on comparison of two values
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