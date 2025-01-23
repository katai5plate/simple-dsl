const fs = require("fs");
const config = require("./config");

const script = fs.readFileSync("./script.dsl", { encoding: "utf8" });

const parseTree = (txt) => {
  const root = [];
  const stack = [{ lvl: -1, ch: root }];
  const methods = [];
  txt
    .split("\n")
    .map((l) => l.match(/^(\s*)(\S+)(?:\s*`([^`]*)`)?(?:\s*(\{.*\}))?/))
    .filter((m) => m)
    .forEach((m) => {
      const lvl = m[1].length / 2;
      const node = {
        method: m[2],
        label: m[3] || "",
        props: m[4] ? eval(`(${m[4]})`) : {},
        children: [],
      };
      if (!methods.find((x) => x.name === node.method))
        methods.push({
          name: node.method,
          label: node.label,
          props: Object.keys(node.props),
        });
      while (stack.at(-1).lvl >= lvl) stack.pop();
      stack.at(-1).ch.push(node);
      stack.push({ lvl, ch: node.children });
    });
  return { root, methods: [...new Set(methods)] };
};

const now = Date.now();
const res = parseTree(script);
fs.writeFileSync(`./root.${now}.json`, JSON.stringify(res.root, null, 2));
fs.writeFileSync(
  `./templates.${now}.js`,
  `module.exports = {\n${res.methods
    .map((methods) => {
      const func = config.func(methods);
      return [
        func[0],
        `${config.recursion(methods)},`,
        `${config.list(methods)},`,
        func[1],
      ].join("\n");
    })
    .join("\n")}\n}`
);