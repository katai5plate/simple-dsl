# simple-dsl

スクリプト型自作 DSL

プログラミングにも、雑務にも、日常用途にも。

[いや、雑務や日常用途に使うならこっちがおすすめ。](https://github.com/katai5plate/online-template-maker)

## Usage

### 1. `{name}.dsl` を作成

```
HOGE
  FUGA
    FOO
      BAR `ああああ`
      BER `いいいい` {color: "red"}
    HELLO
      WORLD `うううう` {numbers: [1, 2, 3], text: "aaaaaa"}
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
  BER: (children, color) => [
    `<BER color="${color}">${children}</BER>`, // 再帰的に評価され、次の工程で "recursion" に出力される
    `const BER: TypeofBER = 0 as any;`, // 次の工程で "list" にて列挙される文字列
  ],
  // ...
};
```

デフォルトを変えたい場合は `config.js` を書き換えてください。

### 4. `node gen {name}` を実行

すると、`{name}.recursion.txt`, `{name}.list.txt` が生成される。

```xml
<HOGE><FUGA><FOO><BAR></BAR><BER color="red"></BER></FOO><HELLO><WORLD></WORLD></HELLO></FUGA></HOGE>
```

```ts
const HOGE: string = "";
const FUGA: string = "";
const HELLO: string = "";
const WORLD: string = "うううう";
const FOO: string = "";
const BER: string = "いいいい";
const BAR: string = "ああああ";
```
