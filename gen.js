const fs = require("fs");
const { DIVIDER } = require("./config");

const arg = process.argv[2];
const templates = require(`./${arg}.templates.js`);
const root = JSON.parse(
  fs.readFileSync(`./${arg}.root.json`, { encoding: "utf8" })
);

const listSet = new Set();

const generateRecursion = (node) => {
  const fn = templates[node.method];
  if (!fn) throw new Error(`undefined method: ${node.method}`);

  console.log(node);
  const [rec, listItem] = fn(
    node.children.map(generateRecursion).join(DIVIDER),
    node.label,
    node.props
  );

  listSet.add(listItem);
  return rec;
};

fs.writeFileSync(
  `./${arg}.recursion.txt`,
  root.map(generateRecursion).join("\n").replaceAll(DIVIDER, "")
);
fs.writeFileSync(`./${arg}.list.txt`, [...listSet].reverse().join("\n"));

console.log("DONE!");
