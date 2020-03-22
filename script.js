var child_process = require("child_process");

var run = (cmd) => {
  return String(child_process.execSync(cmd));
};

var measure = (cmd) => {
  var init = Date.now();
  run(cmd,true);
  return (Date.now() - init) / 1000;
};

var tests = [
  {name: "pow2_native.hs", cmd: n => "./pow2_native "+n},
  {name: "pow2_scott.hs", cmd: n => "./pow2_scott "+n},
  {name: "pow2_native.js", cmd: n => "node pow2_native.js "+n},
  {name: "pow2_scott.js", cmd: n => "node pow2_scott.js "+n},
];

var csvs = {};
var maxn = 32;
var table = {};
loop: for (var i = 0; i < tests.length; ++i) {
  var {name,cmd} = tests[i];
  for (var n = 0; n < maxn; ++n) {
    try {
      var time = measure(cmd(n));
      table[i+";"+n] = time+"s";
      console.log(name, n, time);
    } catch (e) {
      continue loop;
    };
  };
};

console.log("n | " + tests.map(x => x.name.replace("pow2_","")).join(" | "));
for (var n = 0; n < maxn; ++n) {
  var line = n + " | ";
  for (var i = 0; i < tests.length; ++i) {
    line += (i === 0 ? "" : " | ") + table[i+";"+n];
  }
  console.log(line);
};

//run("ghc -O2 pow2_native.hs -o pow2_native");
//run("ghc -O2 pow2_scott.hs -o pow2_scott");

//console.log(time("./pow2_native 28"));
