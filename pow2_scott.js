const sbin = a => b => bin => tip => bin(a)(b);
const stip = bin => tip => tip;
const ssize = (stree) => stree(a => b => ssize(a) + ssize(b))(1);
const spow2 = (n) => n === 0 ? stip : sbin(spow2(n - 1))(spow2(n - 1));
var depth = Number(process.argv[2]||"0");
console.log(ssize(spow2(depth)));
