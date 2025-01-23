module.exports = {
  func: ({ name, label, props }) => [
    `  ${name}: (children, ${props.join(", ")}) => [`,
    `  ],`,
  ],
  recursion: ({ name, label, props }) =>
    `    \`<${name}>\${children}</${name}>\``,
  list: ({ name, label, props }) =>
    `    \`const ${name}: string = "${label}";\``,
};
