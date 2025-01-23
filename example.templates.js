module.exports = {
  HOGE: (children) => [`<HOGE>${children}</HOGE>`, `const HOGE: string = "";`],
  FUGA: (children) => [`<FUGA>${children}</FUGA>`, `const FUGA: string = "";`],
  FOO: (children) => [`<FOO>${children}</FOO>`, `const FOO: string = "";`],
  BAR: (children) => [
    `<BAR>${children}</BAR>`,
    `const BAR: string = "ああああ";`,
  ],
  BER: (children, color) => [
    `<BER color="${color}">${children}</BER>`, // 再帰的に評価され、次の工程で "recursion" に出力される
    `const BER: string = "${color}";`, // 次の工程で "list" にて列挙される文字列
  ],
  HELLO: (children) => [
    `<HELLO>${children}</HELLO>`,
    `const HELLO: string = "";`,
  ],
  WORLD: (children, numbers, date) => [
    // dsl で JavaScript を書いた場合、返り値が入っている
    `<WORLD clock="${date}">${children}</WORLD>`,
    `const WORLD: string = "${date}";`,
  ],
};
