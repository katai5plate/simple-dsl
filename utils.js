const { DIVIDER } = require("./config");

module.exports = {
  div: (children, map) => children.split(DIVIDER).map(map).join(DIVIDER),
};
