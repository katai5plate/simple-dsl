# simple-dsl

スクリプト型自作 DSL  
叩き台をスピーディに作ります。

改造前提の作りになっているので、最低限の構成です。

テンプレートエンジンを使うほど大仰なことはやりたくないけど、それっぽいことをサクっとしたいときにどうぞ。

[雑務や日常用途に使うならこっちがおすすめ。](https://github.com/katai5plate/online-template-maker)

## Usage

### 1. `{name}.dsl` を作成

```
HOGE
  FUGA
    FOO
      BAR `ああああ`
      BER `いいいい` {color: "red"}
    HELLO
      WORLD `うううう` {numbers: [1, 2, 3], date: new Date().toLocaleDateString()}
```

```
構文:
メソッド名 `ラベル名` { プロパティ }
```

### 2. `node extract {name}` を実行

すると `{name}.templates.js` が生成される。

### 3. `{name}.templates.js` を編集する

```js
module.exports = {
  // ...
  BER: (children, label, { color }) => [
    `<BER color="${color}">${children}</BER>`, // 再帰的に評価され、次の工程で "recursion" に出力される
    `const BER: TypeofBER = "${label}";`, // 次の工程で "list" にて列挙される文字列
  ],
  // ...
  WORLD: (children, label, { numbers, date }) => [
    // dsl で JavaScript を書いた場合、返り値が入っている
    `<WORLD>${children}</WORLD>`,
    `const WORLD: string = "${date}";`,
  ],
};
```

デフォルトを変えたい場合は `config.js` を書き換えてください。

### 4. `node gen {name}` を実行

すると、`{name}.recursion.txt`, `{name}.list.txt` が生成される。

```xml
<HOGE>
  <FUGA>
    <FOO>
      <BAR></BAR>
      <BER color="red"></BER>
    </FOO>
    <HELLO>
      <WORLD clock="2025/1/24"></WORLD>
    </HELLO>
  </FUGA>
</HOGE>
```

```ts
const HOGE: string = "";
const FUGA: string = "";
const HELLO: string = "";
const WORLD: string = "2025/1/24";
const FOO: string = "";
const BER: string = "red";
const BAR: string = "ああああ";
```

## Utils

### div

children で Array.prototype.map を使えるようにする

```js
const { div } = require("./utils");
module.exports = {
  // ...
  FOO: (children, label) => [
    `<FOO>${div(children, (child) => {
      console.log("^^^^^^^^^^^^^^^^^^^^^^");
      console.log(child);
      console.log("vvvvvvvvvvvvvvvvvvvvvv");
      return child;
    })}</FOO>`,
    `const FOO: string = "";`,
  ],
  // ...
};
```

```
^^^^^^^^^^^^^^^^^^^^^^
<BAR></BAR>
vvvvvvvvvvvvvvvvvvvvvv
^^^^^^^^^^^^^^^^^^^^^^
<BER color="red"></BER>
vvvvvvvvvvvvvvvvvvvvvv
```

## 小技

### テンプレートを引用する

こうすることで入れ子構造にもできます。

```js
module.exports = {
  ABC: (children, label, {}) => {
    const def = T.DEF("", "def");
    return [`(${def[0]})`, def[2]];
  },
  DEF: (children, label, {}) => [`<${label}>`, "", "あああ"],
};

const T = module.exports;
```

### ユニーク ID を得る

用途によっては内容が被っては困る場合もあると思います。  
その場合は `{name}.template.js` か `config.js` を編集してください。

```js
let abcId = 0;
module.exports = {
  ABC: (children, label, {}) => {
    abcId++;
    return [`<div id="abc-${abcId}">${children}</div>`, `{ abc: ${abcId} },`];
  },
};
```

### extract で `{name}.template.js` をリセットしない

extract.js を以下のようにコメントアウトしてください。

```js
const res = parseTree(script);
fs.writeFileSync(`./${arg}.root.json`, JSON.stringify(res.root, null, 2));
// fs.writeFileSync(
//   `./${arg}.templates.js`,
//   `module.exports = {\n${res.methods
//     .map((methods) => {
//       const func = config.func(methods);
//       return [
//         func[0],
//         `${config.recursion(methods)},`,
//         `${config.list(methods)},`,
//         func[1],
//       ].join("\n");
//     })
//     .join("\n")}\n}`
// );
```
