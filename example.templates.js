module.exports = {
  HOGE: (children, label) => [
    `<HOGE>${children}</HOGE>`,
    `const HOGE: string = "";`,
  ],
  FUGA: (children, label) => [
    `<FUGA>${children}</FUGA>`,
    `const FUGA: string = "";`,
  ],
  FOO: (children, label) => [
    `<FOO>${children}</FOO>`,
    `const FOO: string = "";`,
  ],
  BAR: (children, label) => [
    `<BAR>${children}</BAR>`,
    `const BAR: string = "ああああ";`,
  ],
  BER: (children, label, { color }) => [
    `<BER color="${color}">${children}</BER>`, // 再帰的に評価され、次の工程で "{name}.recursion.txt" に出力される
    `const BER: TypeofBER = "${label}";`, // 次の工程で "{name}.list.txt" にて列挙される文字列
  ],
  HELLO: (children, label) => [
    `<HELLO>${children}</HELLO>`,
    `const HELLO: string = "";`,
  ],
  WORLD: (children, label, { numbers, date }) => [
    `<WORLD>${children}</WORLD>`,
    // dsl で JavaScript を書いた場合、返り値が入っている
    `const WORLD: string = "${date}";`,
  ],
};
