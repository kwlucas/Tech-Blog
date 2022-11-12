module.exports = {
  format_date: date => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  },
  ifComparison: (operator, item1, item2) => {
    switch (operator) {
      case '==':
        return (item1 == item2);
      case '===':
        return (item1 === item2);
      case '!=':
        return (item1 != item2);
      case '!==':
        return (item1 !== item2);
      case '<':
        return (item1 < item2);
      case '<=':
        return (item1 <= item2);
      case '>':
        return (item1 > item2);
      case '>=':
        return (item1 >= item2);
      case '&&':
        return (item1 && item2);
      case '||':
        return (item1 || item2);
      default:
        return false;
    }
  }
};