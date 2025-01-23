const fs = require("fs");
const arg = process.argv[2];
const templates = require(`./templates.${arg}.js`);
const root = JSON.parse(fs.readFileSync(`./root.${arg}.json`, { encoding: "utf8" }));

const listSet = new Set();

const generateRecursion = (node) => {
  const fn = templates[node.method];
  if (!fn) throw new Error(`undefined method: ${node.method}`);

  console.log(node);
  const [rec, listItem] = fn(
    node.children.map(generateRecursion).join(""),
    ...Object.values(node.props)
  );

  listSet.add(listItem);
  return rec;
};

fs.writeFileSync("./recursion.txt", root.map(generateRecursion).join("\n"));
fs.writeFileSync("./list.txt", [...listSet].join("\n"));
