const Bin = (a, b) => ({ctor:"Bin", a, b});
const Tip = {ctor:"Tip"};

const size = (tree) => {
  switch (tree.ctor) {
    case "Tip": return 1;
    case "Bin": return size(tree.a) + size(tree.b);
  }
};

const pow2 = (n) => {
  if (n === 0) {
    return Tip;
  } else {
    return Bin(pow2(n - 1), pow2(n - 1));
  };
};

var depth = Number(process.argv[2]||"0");
console.log(size(pow2(depth)));
