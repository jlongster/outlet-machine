var __args = process.argv.slice(2);var compiler = require("./compiler");var machine = require("./machine");var run = (function(src){
return ((function() {var o1 = (function(statements,m){
return m.start();
});
var o2 = compiler.compile(src);
var o3 = machine.feed_dash_asm(o2);
return o1(o2,o3);
}))();
});
var install_dash_primitives = (function(procs){
return compiler.install_dash_primitives(procs);
});
module.exports = dict(string_dash__gt_symbol("run"),run,string_dash__gt_symbol("install_dash_primitives"),install_dash_primitives);

