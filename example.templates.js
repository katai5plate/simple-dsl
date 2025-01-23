module.exports = {
  HOGE: (children, ) => [
    `<HOGE>${children}</HOGE>`,
    `const HOGE: string = "";`,
  ],
  FUGA: (children, ) => [
    `<FUGA>${children}</FUGA>`,
    `const FUGA: string = "";`,
  ],
  FOO: (children, ) => [
    `<FOO>${children}</FOO>`,
    `const FOO: string = "";`,
  ],
  BAR: (children, ) => [
    `<BAR>${children}</BAR>`,
    `const BAR: string = "ああああ";`,
  ],
  BER: (children, color) => [
    `<BER>${children}</BER>`,
    `const BER: string = "いいいい";`,
  ],
  HELLO: (children, ) => [
    `<HELLO>${children}</HELLO>`,
    `const HELLO: string = "";`,
  ],
  WORLD: (children, numbers, text) => [
    `<WORLD>${children}</WORLD>`,
    `const WORLD: string = "うううう";`,
  ],
}