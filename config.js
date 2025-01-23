const INDENTx1 = "  ";
const INDENTx2 = "    ";
const $ = (x) => `\`${x}\``;
const to = (x) => `\${${x}}`;

module.exports = {
  func: ({ name, label, props }) => [
    `${INDENTx1}${name}: (children, label, ${props.join(", ")}) => [`,
    `${INDENTx1}],`,
  ],
  recursion: ({ name, label, props }) =>
    `${INDENTx2}${$(`<${name}>${to("children")}</${name}>`)}`,
  list: ({ name, label, props }) =>
    `${INDENTx2}${$(`const ${name}: string = "${label}";`)}`,
};
