var __args = process.argv.slice(2);var util = require("util");var type = (function(obj){
return (function() {if(number_p_(obj)) {return ((function() {return string_dash__gt_symbol("number");
}))();
} else {return (function() {if(boolean_p_(obj)) {return ((function() {return string_dash__gt_symbol("boolean");
}))();
} else {return (function() {if(string_p_(obj)) {return ((function() {return string_dash__gt_symbol("string");
}))();
} else {return (function() {if(null_p_(obj)) {return ((function() {return string_dash__gt_symbol("null");
}))();
} else {return (function() {if(list_p_(obj)) {return ((function() {return string_dash__gt_symbol("list");
}))();
} else {return (function() {if(vector_p_(obj)) {return ((function() {return string_dash__gt_symbol("vector");
}))();
} else {return (function() {if(dict_p_(obj)) {return ((function() {return string_dash__gt_symbol("dict");
}))();
} else {return false;
}})()
;
}})()
;
}})()
;
}})()
;
}})()
;
}})()
;
}})()
;
});
var number_p_ = (function(obj){
return eq_p_(typeof obj,"number");
});
var string_p_ = (function(obj){
return eq_p_(typeof obj,"string");
});
var symbol_p_ = (function(obj){
return (!!obj && obj.str !== undefined && obj.symbol !== undefined);
});
var boolean_p_ = (function(obj){
return (eq_p_(obj,true) || eq_p_(obj,false));
});
var null_p_ = (function(obj){
return (!!obj && not(eq_p_(obj.length,undefined)) && eq_p_(obj.length,1) && eq_p_(vector_dash_ref(obj,0),null));
});
var list_p_ = (function(obj){
return (!!obj && not(eq_p_(obj.length,undefined)) && not(eq_p_(obj.list,undefined)));
});
var vector_p_ = (function(obj){
return (not(list_p_(obj)) && not(null_p_(obj)) && !!obj && eq_p_(typeof obj,"object") && not(eq_p_(obj.length,undefined)));
});
var dict_p_ = (function(obj){
return (not(symbol_p_(obj)) && !!obj && eq_p_(typeof obj,"object") && eq_p_(obj.length,undefined));
});
var function_p_ = (function(obj){
return eq_p_(typeof obj,"function");
});
var literal_p_ = (function(x){
return (number_p_(x) || string_p_(x) || boolean_p_(x) || null_p_(x));
});
var str = (function() {
var args = vector_dash__gt_list(Array.prototype.slice.call(arguments));
return fold((function(el,acc){
return (acc + (function() {if(string_p_(el)) {return el;
} else {return inspect(el);
}})()
);
}),"",args);
});
var string_dash__gt_symbol = (function(str){
return ((function() {var o1 = (function(s){
s = s.replace(RegExp("-","g"),"_dash_");
s = s.replace(RegExp("\\?","g"),"_p_");
s = s.replace(RegExp("\\!","g"),"_excl_");
s = s.replace(RegExp(">","g"),"_gt_");
s = s.replace(RegExp("<","g"),"_lt_");
s = s.replace(RegExp("%","g"),"_per_");
s = s.replace(RegExp("=","g"),"_eq_");
return {str:s, symbol:true}});
var o2 = str;
return o1(o2);
}))();
});
var symbol_dash__gt_string = (function(sym){
return ((function() {var o3 = (function(s){
s = s.replace(RegExp("_dash_","g"),"-");
s = s.replace(RegExp("_p_","g"),"?");
s = s.replace(RegExp("_excl_","g"),"!");
s = s.replace(RegExp("_gt_","g"),">");
s = s.replace(RegExp("_lt_","g"),"<");
s = s.replace(RegExp("_per_","g"),"%");
s = s.replace(RegExp("_eq_","g"),"=");
return s;
});
var o4 = sym.str;
return o3(o4);
}))();
});
var _emptylst = [null];
var list = (function() {
var args = vector_dash__gt_list(Array.prototype.slice.call(arguments));
return args;
});
var cons = (function(obj,lst){
return ((function() {var o5 = (function(res){
res.list = true;return res;
});
var o6 = [obj, lst];
return o5(o6);
}))();
});
var car = (function(lst){
return lst[0]});
var cdr = (function(lst){
return lst[1]});
var cadr = (function(lst){
return car(cdr(lst));
});
var cddr = (function(lst){
return cdr(cdr(lst));
});
var cdar = (function(lst){
return cdr(car(lst));
});
var caddr = (function(lst){
return car(cdr(cdr(lst)));
});
var cdddr = (function(lst){
return cdr(cdr(cdr(lst)));
});
var cadar = (function(lst){
return car(cdr(car(lst)));
});
var cddar = (function(lst){
return cdr(cdr(car(lst)));
});
var caadr = (function(lst){
return car(car(cdr(lst)));
});
var cdadr = (function(lst){
return cdr(car(cdr(lst)));
});
var list_dash_ref = (function(lst,i){
return ((function() {var loop = (function(lst,i){
return (function() {if(null_p_(lst)) {return ((function() {return false;
}))();
} else {return (function() {if(eq_p_(i,0)) {return ((function() {return car(lst);
}))();
} else {return ((function() {return loop(cdr(lst),(i - 1));
}))();
}})()
;
}})()
;
});
var o7 = lst;
var o8 = i;
return loop(o7,o8);
}))();
});
var length = (function(lst){
return fold((function(el,acc){
return (acc + 1);
}),0,lst);
});
var list_dash_append = (function(lst1,lst2){
return ((function() {var loop = (function(lst){
return (function() {if(null_p_(lst)) {return lst2;
} else {return cons(car(lst),loop(cdr(lst)));
}})()
;
});
var o9 = lst1;
return loop(o9);
}))();
});
var list_dash_find = (function(lst,val){
var rst = vector_dash__gt_list(Array.prototype.slice.call(arguments, 2));
return ((function() {var o10 = (function(access){
return ((function() {var loop = (function(lst){
return (function() {if(null_p_(lst)) {return false;
} else {return (function() {if(_eq__eq_(access(car(lst)),val)) {return lst;
} else {return vector("__tco_call",(function() {return loop(cdr(lst));
}));
}})()
;
}})()
;
});
var o12 = lst;
return trampoline(loop(o12));
}))();
});
var o11 = (function() {if(null_p_(rst)) {return (function(x){
return x;
});
} else {return car(rst);
}})()
;
return o10(o11);
}))();
});
var map = (function(func,lst){
return (function() {if(null_p_(lst)) {return _emptylst;
} else {return cons(func(car(lst)),map(func,cdr(lst)));
}})()
;
});
var for_dash_each = (function(func,lst){
return ((function() {var loop = (function(lst){
return (function() {if(not(null_p_(lst))) {return ((function() {func(car(lst));
return vector("__tco_call",(function() {return loop(cdr(lst));
}));
}))();
} else {return false;
}})()
;
});
var o13 = lst;
return trampoline(loop(o13));
}))();
});
var fold = (function(func,acc,lst){
return (function() {if(null_p_(lst)) {return acc;
} else {return fold(func,func(car(lst),acc),cdr(lst));
}})()
;
});
var reverse = (function(lst){
return (function() {if(null_p_(lst)) {return _emptylst;
} else {return list_dash_append(reverse(cdr(lst)),list(car(lst)));
}})()
;
});
var vector_dash__gt_list = (function(vec){
return ((function() {var loop = (function(i){
return (function() {if((i < vec.length)) {return cons(vector_dash_ref(vec,i),loop((i + 1)));
} else {return _emptylst}})()
;
});
var o14 = 0;
return loop(o14);
}))();
});
var make_dash_vector = (function(count,val){
return ((function() {var o15 = (function(v){
return ((function() {var loop = (function(i){
return (function() {if((i < count)) {return ((function() {vector_dash_put_excl_(v,i,val);
return vector("__tco_call",(function() {return loop((i + 1));
}));
}))();
} else {return v;
}})()
;
});
var o17 = 0;
return trampoline(loop(o17));
}))();
});
var o16 = new Array(count);
return o15(o16);
}))();
});
var vector = (function() {return Array.prototype.slice.call(arguments)});
var vector_dash_ref = (function(vec,i){
return vec[i]});
var vector_dash_put_excl_ = (function(vec,i,obj){
return vec[i] = obj});
var vector_dash_concat = (function(vec1,vec2){
return vec1.concat(vec2)});
var vector_dash_slice = (function(vec,start,end){
return vec.slice(start, end)});
var vector_dash_push_excl_ = (function(vec,obj){
return vec.push(obj)});
var vector_dash_find = (function(vec,val){
return ((function() {var loop = (function(i){
return (function() {if((i < vec.length)) {return (function() {if(eq_p_(vector_dash_ref(vec,i),val)) {return i;
} else {return vector("__tco_call",(function() {return loop((i + 1));
}));
}})()
;
} else {return false;
}})()
;
});
var o18 = 0;
return trampoline(loop(o18));
}))();
});
var vector_dash_length = (function(vec){
return vec.length;
});
var list_dash__gt_vector = (function(lst){
var res = [];
for_dash_each((function(el){
return res.push(el);
}),lst);
return res;
});
var vector_dash_map = (function(func,vec){
var res = [];
((function() {var loop = (function(i){
return (function() {if((i < vec.length)) {return ((function() {res.push(func(vector_dash_ref(vec,i)));
return vector("__tco_call",(function() {return loop((i + 1));
}));
}))();
} else {return false;
}})()
;
});
var o19 = 0;
return trampoline(loop(o19));
}))();
return res;
});
var vector_dash_for_dash_each = (function(func,vec){
return ((function() {var loop = (function(i){
return (function() {if((i < vec.length)) {return ((function() {func(vector_dash_ref(vec,i));
return vector("__tco_call",(function() {return loop((i + 1));
}));
}))();
} else {return false;
}})()
;
});
var o20 = 0;
return trampoline(loop(o20));
}))();
});
var vector_dash_fold = (function(func,acc,vec){
return ((function() {var loop = (function(i,acc){
return (function() {if((i < vector_dash_length(vec))) {return vector("__tco_call",(function() {return loop((i + 1),func(vector_dash_ref(vec,i),acc));
}));
} else {return acc;
}})()
;
});
var o21 = 0;
var o22 = acc;
return trampoline(loop(o21,o22));
}))();
});
var dict = (function() {
var args = vector_dash__gt_list(Array.prototype.slice.call(arguments));
var res = {};
((function() {var loop = (function(lst){
return (function() {if(not(null_p_(lst))) {return ((function() {var o24 = (function(key,val){
dict_dash_put_excl_(res,key,val);
return vector("__tco_call",(function() {return loop(cddr(lst));
}));
});
var o25 = car(lst);
var o26 = cadr(lst);
return o24(o25,o26);
}))();
} else {return false;
}})()
;
});
var o23 = args;
return trampoline(loop(o23));
}))();
return res;
});
var dict_dash_put_excl_ = (function(dct,k,v){
return dct[k.str] = v});
var dict_dash_ref = (function(dct,k){
return dct[k.str]});
var dict_dash_map = (function(func,dct){
var res = dict();
((function() {var loop = (function(lst){
return (function() {if(not(null_p_(lst))) {return ((function() {var o28 = (function(k){
dict_dash_put_excl_(res,k,func(dict_dash_ref(dct,k)));
return vector("__tco_call",(function() {return loop(cdr(lst));
}));
});
var o29 = car(lst);
return o28(o29);
}))();
} else {return false;
}})()
;
});
var o27 = keys(dct);
return trampoline(loop(o27));
}))();
return res;
});
var dict_dash_merge = (function(dct1,dct2){
return ((function() {var o30 = (function(res){
map((function(k){
return dict_dash_put_excl_(res,k,dict_dash_ref(dct1,k));
}),keys(dct1));
map((function(k){
return dict_dash_put_excl_(res,k,dict_dash_ref(dct2,k));
}),keys(dct2));
return res;
});
var o31 = dict();
return o30(o31);
}))();
});
var dict_dash__gt_vector = (function(dct){
var res = vector();
((function() {var loop = (function(lst){
return (function() {if(not(null_p_(lst))) {return ((function() {vector_dash_push_excl_(res,car(lst));
vector_dash_push_excl_(res,dict_dash_ref(dct,car(lst)));
return vector("__tco_call",(function() {return loop(cdr(lst));
}));
}))();
} else {return false;
}})()
;
});
var o32 = keys(dct);
return trampoline(loop(o32));
}))();
return res;
});
var dict_dash__gt_list = (function(dct){
return vector_dash__gt_list(dict_dash__gt_vector(dct));
});
var keys = (function(dct){
return ((function() {var o33 = (function(res){
for(var k in dct) {
       res = cons(string_dash__gt_symbol(k), res);
    }return res;
});
var o34 = _emptylst;
return o33(o34);
}))();
});
var vals = (function(dct){
return map((function(k){
return dict_dash_ref(dct,k);
}),keys(dct));
});
var zip = (function(keys,vals){
var res = dict();
((function() {var loop = (function(ks,vs){
return (function() {if(not(null_p_(ks))) {return ((function() {dict_dash_put_excl_(res,car(ks),car(vs));
return vector("__tco_call",(function() {return loop(cdr(ks),cdr(vs));
}));
}))();
} else {return false;
}})()
;
});
var o35 = keys;
var o36 = vals;
return trampoline(loop(o35,o36));
}))();
return res;
});
var not = (function(obj){
return (typeof obj !== 'number' && !obj);
});
var _eq__eq_ = (function(obj1,obj2){
return (function() {if((symbol_p_(obj1) && symbol_p_(obj2))) {return obj1.str === obj2.str} else {return obj1 === obj2}})()
;
});
var _eq_ = (function(obj1,obj2){
return (function() {if((list_p_(obj1) && list_p_(obj2))) {return ((function() {return ((function() {var loop = (function(lst1,lst2){
var n1 = null_p_(lst1);
var n2 = null_p_(lst2);
return (function() {if((n1 && n2)) {return ((function() {return true;
}))();
} else {return (function() {if((n1 || n2)) {return ((function() {return false;
}))();
} else {return ((function() {return (function() {if(equal_p_(car(lst1),car(lst2))) {return loop(cdr(lst1),cdr(lst2));
} else {return false;
}})()
;
}))();
}})()
;
}})()
;
});
var o37 = obj1;
var o38 = obj2;
return loop(o37,o38);
}))();
}))();
} else {return (function() {if((vector_p_(obj1) && vector_p_(obj2))) {return ((function() {return ((function() {var loop = (function(i){
return (function() {if(((i < obj1.length) && (i < obj2.length))) {return ((function() {return true;
}))();
} else {return (function() {if(((i < obj1.length) || (i < obj2.length))) {return ((function() {return false;
}))();
} else {return ((function() {return (function() {if(equal_p_(vector_dash_ref(obj1,i),vector_dash_ref(obj2,i))) {return loop((i + 1));
} else {return false;
}})()
;
}))();
}})()
;
}})()
;
});
var o39 = 0;
return loop(o39);
}))();
}))();
} else {return (function() {if((dict_p_(obj1) && dict_p_(obj2))) {return ((function() {return ((function() {var o40 = (function(keys1,keys2){
return (eq_p_(length(keys1),length(keys2)) && ((function() {var loop = (function(lst){
return (function() {if(null_p_(lst)) {return true;
} else {return (function() {if(equal_p_(dict_dash_ref(obj1,car(lst)),dict_dash_ref(obj2,car(lst)))) {return vector("__tco_call",(function() {return loop(cdr(lst));
}));
} else {return false;
}})()
;
}})()
;
});
var o43 = keys1;
return trampoline(loop(o43));
}))());
});
var o41 = keys(obj1);
var o42 = keys(obj2);
return o40(o41,o42);
}))();
}))();
} else {return ((function() {return eq_p_(obj1,obj2);
}))();
}})()
;
}})()
;
}})()
;
});
var eq_p_ = _eq__eq_;
var equal_p_ = _eq_;
var print = (function(msg){
return util.print(msg);
});
var println = (function(msg){
return util.puts(msg);
});
var pp = (function(obj){
return println(inspect(obj));
});
var _per_inspect_dash_non_dash_sequence = (function(obj){
return (function() {if(number_p_(obj)) {return ((function() {return ("" + obj);
}))();
} else {return (function() {if(string_p_(obj)) {return ((function() {obj = obj.replace(RegExp("\\\\","g"),"\\\\");
obj = obj.replace(RegExp("\n","g"),"\\n");
obj = obj.replace(RegExp("\r","g"),"\\r");
obj = obj.replace(RegExp("\t","g"),"\\t");
obj = obj.replace(RegExp("\"","g"),"\\\"");
return ("\"" + obj + "\"");
}))();
} else {return (function() {if(symbol_p_(obj)) {return ((function() {return symbol_dash__gt_string(obj);
}))();
} else {return (function() {if(boolean_p_(obj)) {return ((function() {return (function() {if(obj) {return "#t";
} else {return "#f";
}})()
;
}))();
} else {return (function() {if(null_p_(obj)) {return ((function() {return "()";
}))();
} else {return (function() {if(function_p_(obj)) {return ((function() {return "<function>";
}))();
} else {return ((function() {throw("%inspect-non-sequence: unexpected type");
}))();
}})()
;
}})()
;
}})()
;
}})()
;
}})()
;
}})()
;
});
var _per_recur_dash_protect = (function(obj,arg,func,halt){
var rest = vector_dash__gt_list(Array.prototype.slice.call(arguments, 4));
return ((function() {var o44 = (function(parents){
return (function() {if(list_dash_find(parents,obj)) {return halt;
} else {return func(obj,arg,(function(el,arg){
return _per_recur_dash_protect(el,arg,func,halt,cons(obj,parents));
}));
}})()
;
});
var o45 = (function() {if(null_p_(rest)) {return _emptylst;
} else {return car(rest);
}})()
;
return o44(o45);
}))();
});
var _per_space = (function(obj){
return _per_recur_dash_protect(obj,false,(function(obj,arg,recur){
return (function() {if(list_p_(obj)) {return ((function() {return (length(obj) + 1 + fold((function(el,acc){
return (acc + recur(el,false));
}),0,obj));
}))();
} else {return (function() {if(dict_p_(obj)) {return ((function() {return recur(dict_dash__gt_list(obj),false);
}))();
} else {return (function() {if(vector_p_(obj)) {return ((function() {return recur(vector_dash__gt_list(obj),false);
}))();
} else {return ((function() {return vector_dash_length(_per_inspect_dash_non_dash_sequence(obj));
}))();
}})()
;
}})()
;
}})()
;
}),vector_dash_length("<circular>"));
});
var inspect = (function(obj){
var rest = vector_dash__gt_list(Array.prototype.slice.call(arguments, 1));
return ((function() {var o46 = (function(no_dash_newlines){
return _per_recur_dash_protect(obj,1,(function(obj,i,recur){
var buffer = "";
var get_dash_buffer = (function() {return buffer;
});
var disp = (function(s){
buffer = (buffer + s);
});
var pad = (function(n){
return vector_dash_for_dash_each((function(_){
return disp(" ");
}),make_dash_vector(n));
});
return (function() {if(list_p_(obj)) {return ((function() {return ((function() {var o48 = (function(sp,first){
disp("(");
for_dash_each((function(el){
(function() {if(not(first)) {return (function() {if((sp && not(no_dash_newlines))) {return ((function() {disp("\n");
return pad(i);
}))();
} else {return disp(" ");
}})()
;
} else {return false;
}})()
;
disp(recur(el,(i + 1)));
first = false;
}),obj);
disp(")");
return get_dash_buffer();
});
var o49 = (_per_space(obj) > 30);
var o50 = true;
return o48(o49,o50);
}))();
}))();
} else {return (function() {if(vector_p_(obj)) {return ((function() {return ((function() {var o51 = (function(sp,first){
disp("[");
vector_dash_for_dash_each((function(el){
(function() {if(not(first)) {return (function() {if((sp && not(no_dash_newlines))) {return ((function() {disp("\n");
return pad(i);
}))();
} else {return disp(" ");
}})()
;
} else {return false;
}})()
;
disp(recur(el,(i + 1)));
first = false;
}),obj);
disp("]");
return get_dash_buffer();
});
var o52 = (_per_space(obj) > 30);
var o53 = true;
return o51(o52,o53);
}))();
}))();
} else {return (function() {if(dict_p_(obj)) {return ((function() {return ((function() {var o54 = (function(sp,first){
disp("{");
for_dash_each((function(k){
(function() {if(not(first)) {return (function() {if((sp && not(no_dash_newlines))) {return ((function() {disp("\n");
return pad(i);
}))();
} else {return disp(" ");
}})()
;
} else {return false;
}})()
;
disp(":");
disp(recur(k,i));
disp(" ");
disp(recur(dict_dash_ref(obj,k),(i + 3 + vector_dash_length(symbol_dash__gt_string(k)))));
first = false;
}),keys(obj));
disp("}");
return get_dash_buffer();
});
var o55 = (_per_space(obj) > 30);
var o56 = true;
return o54(o55,o56);
}))();
}))();
} else {return ((function() {return _per_inspect_dash_non_dash_sequence(obj);
}))();
}})()
;
}})()
;
}})()
;
}),"<circular>");
});
var o47 = (function() {if(null_p_(rest)) {return false;
} else {return car(rest);
}})()
;
return o46(o47);
}))();
});
var apply = (function(func,args){
return func.apply(null,list_dash__gt_vector(args));
});
var trampoline_dash_result_p_ = (function(value){
return (vector_p_(value) && _eq_(vector_dash_ref(value,0),"__tco_call"));
});
var trampoline = (function(value){
while(trampoline_dash_result_p_(value)) { value = value[1](); }return value;
});
var _gensym = 0;
var gensym = (function() {_gensym = (_gensym + 1);
return string_dash__gt_symbol(("o" + _gensym));
});


var __compiler = require('/Users/james/projects/outlet/backends/../compiler');
var __generator = require('/Users/james/projects/outlet/backends/../backends/js');
var read = __compiler.read;
var fs = require("fs");var compiler = require("./compiler");var make_dash_machine = (function(regs,ops,controller){
return ((function() {var o1 = (function(machine){
for_dash_each((function(reg){
return machine.allocate_dash_register(reg);
}),regs);
machine.install_dash_operations(ops);
machine.install_dash_instruction_dash_sequence(assemble(controller,machine));
return machine;
});
var o2 = make_dash_new_dash_machine();
return o1(o2);
}))();
});
var set_dash_register_dash_contents_excl_ = (function(machine,reg,val){
});
var get_dash_register_dash_contents = (function(machine,reg){
});
var start = (function(machine){
});
var make_dash_register = (function() {return ((function() {var o3 = (function(contents){
return dict(string_dash__gt_symbol("get"),(function() {return contents;
}),string_dash__gt_symbol("set_excl_"),(function(val){
contents = val;
}));
});
var o4 = string_dash__gt_symbol("_unassigned_");
return o3(o4);
}))();
});
var make_dash_stack = (function() {return ((function() {var o5 = (function(s){
return dict(string_dash__gt_symbol("push"),(function(x){
s = cons(x,s);
}),string_dash__gt_symbol("pop_excl_"),(function() {return (function() {if(null_p_(s)) {throw("pop: empty stack");
} else {return ((function() {var o7 = (function(top){
s = cdr(s);
return top;
});
var o8 = car(s);
return o7(o8);
}))();
}})()
;
}),string_dash__gt_symbol("initialize"),(function() {s = _emptylst;
}));
});
var o6 = _emptylst;
return o5(o6);
}))();
});
var make_dash_new_dash_machine = (function() {return ((function() {var o9 = (function(pc,flag,stack,instruction_dash_sequence,paused,stack_dash_ptr){
return ((function() {var o16 = (function(ops,reg_dash_table){
var allocate_dash_register = (function(name){
return (function() {if(list_dash_find(keys(reg_dash_table),name)) {throw(str("register already defined: ",name));
} else {return dict_dash_put_excl_(reg_dash_table,name,make_dash_register());
}})()
;
});
var lookup_dash_register = (function(name){
return (function() {if(list_dash_find(keys(reg_dash_table),name)) {return dict_dash_ref(reg_dash_table,name);
} else {throw(str("unknown register: ",name));
}})()
;
});
var pause = (function() {paused = true;
});
var print_dash_registers = (function() {return for_dash_each((function(name){
return (function() {if((not(_eq__eq_(name,string_dash__gt_symbol("pc"))) && not(_eq__eq_(name,string_dash__gt_symbol("continue"))))) {return ((function() {var o19 = (function(reg){
return console.log((symbol_dash__gt_string(name) + ": " + util.inspect(reg.get())));
});
var o20 = lookup_dash_register(name);
return o19(o20);
}))();
} else {return false;
}})()
;
}),keys(reg_dash_table));
});
var execute = (function() {return ((function() {var loop = (function() {return ((function() {var o21 = (function(insts){
return (function() {if(null_p_(insts)) {return string_dash__gt_symbol("done");
} else {return ((function() {var o23 = (function(inst){
return (function() {if(not(paused)) {return ((function() {var o25 = (function(proc){
(function() {if(proc) {return proc();
} else {throw(str("invalid exec proc: ",proc));
}})()
;
return vector("__tco_call",(function() {return loop();
}));
});
var o26 = instruction_dash_exec_dash_proc(inst);
return o25(o26);
}))();
} else {return false;
}})()
;
});
var o24 = car(insts);
return o23(o24);
}))();
}})()
;
});
var o22 = pc.get();
return o21(o22);
}))();
});
return trampoline(loop());
}))();
});
return dict(string_dash__gt_symbol("start"),(function() {pc.set_excl_(instruction_dash_sequence);
return execute();
}),string_dash__gt_symbol("install_dash_instruction_dash_sequence"),(function(seq){
instruction_dash_sequence = seq;
}),string_dash__gt_symbol("allocate_dash_register"),allocate_dash_register,string_dash__gt_symbol("get_dash_register"),lookup_dash_register,string_dash__gt_symbol("install_dash_operations"),(function(dct){
ops = dict_dash_merge(ops,dct);
}),string_dash__gt_symbol("stack"),(function() {return stack;
}),string_dash__gt_symbol("operations"),(function() {return ops;
}),string_dash__gt_symbol("registers"),(function() {return keys(reg_dash_table);
}),string_dash__gt_symbol("print_dash_registers"),print_dash_registers,string_dash__gt_symbol("pause"),pause,string_dash__gt_symbol("proceed"),(function() {paused = false;
return execute();
}),string_dash__gt_symbol("on_dash_input"),(function(txt){
return ((function() {var o27 = (function(exp){
(function() {if(eq_p_(car(exp),string_dash__gt_symbol("read_dash_into_dash_reg"))) {return ((function() {var o29 = (function(reg){
return reg.set_excl_(read(txt));
});
var o30 = lookup_dash_register(cadr(exp));
return o29(o30);
}))();
} else {return false;
}})()
;
advance_dash_pc(pc);
stop_dash_stdin();
paused = false;
return execute();
});
var o28 = instruction_dash_text(car(pc.get()));
return o27(o28);
}))();
}));
});
var o17 = dict(string_dash__gt_symbol("initialize_dash_stack"),stack.initialize);
var o18 = dict(string_dash__gt_symbol("flag"),flag,string_dash__gt_symbol("pc"),pc);
return o16(o17,o18);
}))();
});
var o10 = make_dash_register();
var o11 = make_dash_register();
var o12 = make_dash_stack();
var o13 = _emptylst;
var o14 = false;
var o15 = 0;
return o9(o10,o11,o12,o13,o14,o15);
}))();
});
var get_dash_register_dash_contents = (function(machine,name){
return dict_dash_ref(machine.get_dash_register(name),string_dash__gt_symbol("get"))();
});
var set_dash_register_dash_contents_excl_ = (function(machine,name,val){
return dict_dash_ref(machine.get_dash_register(name),string_dash__gt_symbol("set_excl_"))(val);
});
var assemble = (function(controller,machine){
return extract_dash_labels(controller,(function(insts,labels){
update_dash_insts_excl_(insts,labels,machine);
return insts;
}));
});
var extract_dash_labels = (function(text,receive){
return (function() {if(null_p_(text)) {return receive(_emptylst,_emptylst);
} else {return extract_dash_labels(cdr(text),(function(insts,labels){
return ((function() {var o31 = (function(next_dash_inst){
return (function() {if(symbol_p_(next_dash_inst)) {return receive(insts,cons(make_dash_label_dash_entry(next_dash_inst,insts),labels));
} else {return receive(cons(make_dash_instruction(next_dash_inst),insts),labels);
}})()
;
});
var o32 = car(text);
return o31(o32);
}))();
}));
}})()
;
});
var update_dash_insts_excl_ = (function(insts,labels,machine){
return ((function() {var o33 = (function(pc,flag,stack,ops){
for_dash_each((function(inst){
return set_dash_instruction_dash_exec_dash_proc_excl_(inst,make_dash_execution_dash_procedure(instruction_dash_text(inst),labels,machine,pc,flag,stack,ops));
}),insts);
return for_dash_each((function(label){
return ((function() {var o38 = (function(i){
return for_dash_each((function(inst){
set_dash_instruction_dash_label_excl_(inst,label_dash_entry_dash_name(label));
set_dash_instruction_dash_line_dash_number_excl_(inst,i);
i = (i + 1);
}),label_dash_insts(label));
});
var o39 = 0;
return o38(o39);
}))();
}),labels);
});
var o34 = machine.get_dash_register(string_dash__gt_symbol("pc"));
var o35 = machine.get_dash_register(string_dash__gt_symbol("flag"));
var o36 = machine.stack();
var o37 = machine.operations();
return o33(o34,o35,o36,o37);
}))();
});
var make_dash_instruction = (function(text){
return vector(text,_emptylst,false,false);
});
var instruction_dash_text = (function(inst){
return vector_dash_ref(inst,0);
});
var instruction_dash_exec_dash_proc = (function(inst){
return vector_dash_ref(inst,1);
});
var instruction_dash_label = (function(inst){
return vector_dash_ref(inst,2);
});
var instruction_dash_line_dash_number = (function(inst){
return vector_dash_ref(inst,3);
});
var set_dash_instruction_dash_exec_dash_proc_excl_ = (function(inst,proc){
return vector_dash_put_excl_(inst,1,proc);
});
var set_dash_instruction_dash_label_excl_ = (function(inst,label){
return vector_dash_put_excl_(inst,2,label);
});
var set_dash_instruction_dash_line_dash_number_excl_ = (function(inst,n){
return vector_dash_put_excl_(inst,3,n);
});
var make_dash_label_dash_entry = (function(label,insts){
return vector(label,insts);
});
var label_dash_entry_dash_name = (function(label){
return vector_dash_ref(label,0);
});
var label_dash_insts = (function(label){
return vector_dash_ref(label,1);
});
var lookup_dash_label = (function(labels,name){
return ((function() {var o40 = (function(lst){
return (function() {if(lst) {return vector_dash_ref(car(lst),1);
} else {throw(str("undefined label: ",name));
}})()
;
});
var o41 = list_dash_find(labels,name,(function(v){
return vector_dash_ref(v,0);
}));
return o40(o41);
}))();
});
var advance_dash_pc = (function(pc){
return pc.set_excl_(cdr(pc.get()));
});
var make_dash_execution_dash_procedure = (function(inst,labels,machine,pc,flag,stack,ops){
return ((function() {var o42 = (function(top){
return (function() {if(_eq__eq_(top,string_dash__gt_symbol("assign"))) {return ((function() {return make_dash_assign(inst,machine,labels,ops,pc);
}))();
} else {return (function() {if(_eq__eq_(top,string_dash__gt_symbol("test"))) {return ((function() {return make_dash_test(inst,machine,labels,ops,flag,pc);
}))();
} else {return (function() {if(_eq__eq_(top,string_dash__gt_symbol("branch"))) {return ((function() {return make_dash_branch(inst,machine,labels,flag,pc);
}))();
} else {return (function() {if(_eq__eq_(top,string_dash__gt_symbol("goto"))) {return ((function() {return make_dash_goto(inst,machine,labels,pc);
}))();
} else {return (function() {if(_eq__eq_(top,string_dash__gt_symbol("save"))) {return ((function() {return make_dash_save(inst,machine,stack,pc);
}))();
} else {return (function() {if(_eq__eq_(top,string_dash__gt_symbol("restore"))) {return ((function() {return make_dash_restore(inst,machine,stack,pc);
}))();
} else {return (function() {if(_eq__eq_(top,string_dash__gt_symbol("perform"))) {return ((function() {return make_dash_perform(inst,machine,labels,ops,pc);
}))();
} else {return (function() {if(_eq__eq_(top,string_dash__gt_symbol("read_dash_into_dash_reg"))) {return ((function() {return make_dash_read(inst,machine,pc);
}))();
} else {return (function() {if(_eq__eq_(top,string_dash__gt_symbol("break"))) {return ((function() {return make_dash_break(machine,pc);
}))();
} else {return (function() {if(_eq__eq_(top,string_dash__gt_symbol("next"))) {return ((function() {return make_dash_next(machine,pc);
}))();
} else {return false;
}})()
;
}})()
;
}})()
;
}})()
;
}})()
;
}})()
;
}})()
;
}})()
;
}})()
;
}})()
;
});
var o43 = car(inst);
return o42(o43);
}))();
});
var make_dash_assign = (function(inst,machine,labels,ops,pc){
return ((function() {var o44 = (function(target,expr){
return ((function() {var o47 = (function(value_dash_proc){
return (function() {target.set_excl_(value_dash_proc());
return advance_dash_pc(pc);
});
});
var o48 = (function() {if(operation_dash_exp_p_(expr)) {return make_dash_operation_dash_exp(expr,machine,labels,ops);
} else {return make_dash_primitive_dash_exp(car(expr),machine,labels);
}})()
;
return o47(o48);
}))();
});
var o45 = machine.get_dash_register(cadr(inst));
var o46 = cddr(inst);
return o44(o45,o46);
}))();
});
var make_dash_test = (function(inst,machine,labels,ops,flag,pc){
return ((function() {var o49 = (function(condition){
return (function() {if(operation_dash_exp_p_(condition)) {return ((function() {var o51 = (function(condition_dash_proc){
return (function() {flag.set_excl_(condition_dash_proc());
return advance_dash_pc(pc);
});
});
var o52 = make_dash_operation_dash_exp(condition,machine,labels,ops);
return o51(o52);
}))();
} else {throw(str("bad test instruction:",inst));
}})()
;
});
var o50 = cdr(inst);
return o49(o50);
}))();
});
var make_dash_branch = (function(inst,machine,labels,flag,pc){
return ((function() {var o53 = (function(dest){
return (function() {if(label_dash_exp_p_(dest)) {return ((function() {var o55 = (function(insts){
return (function() {return (function() {if(flag.get()) {return pc.set_excl_(insts);
} else {return advance_dash_pc(pc);
}})()
;
});
});
var o56 = lookup_dash_label(labels,label_dash_exp_dash_label(dest));
return o55(o56);
}))();
} else {throw(str("bad branch instruction: ",inst));
}})()
;
});
var o54 = cadr(inst);
return o53(o54);
}))();
});
var make_dash_goto = (function(inst,machine,labels,pc){
return ((function() {var o57 = (function(dest){
return (function() {if(label_dash_exp_p_(dest)) {return ((function() {return ((function() {var o59 = (function(insts){
return (function() {return pc.set_excl_(insts);
});
});
var o60 = lookup_dash_label(labels,label_dash_exp_dash_label(dest));
return o59(o60);
}))();
}))();
} else {return (function() {if(register_dash_exp_p_(dest)) {return ((function() {return ((function() {var o61 = (function(reg){
return (function() {return pc.set_excl_(reg.get());
});
});
var o62 = machine.get_dash_register(register_dash_exp_dash_reg(dest));
return o61(o62);
}))();
}))();
} else {return ((function() {throw(str("bad goto instruction: ",inst));
}))();
}})()
;
}})()
;
});
var o58 = cadr(inst);
return o57(o58);
}))();
});
var make_dash_save = (function(inst,machine,stack,pc){
return ((function() {var o63 = (function(reg){
return (function() {stack.push(reg.get());
return advance_dash_pc(pc);
});
});
var o64 = machine.get_dash_register(cadr(inst));
return o63(o64);
}))();
});
var make_dash_restore = (function(inst,machine,stack,pc){
return ((function() {var o65 = (function(reg){
return (function() {reg.set_excl_(stack.pop_excl_());
return advance_dash_pc(pc);
});
});
var o66 = machine.get_dash_register(cadr(inst));
return o65(o66);
}))();
});
var make_dash_perform = (function(inst,machine,labels,ops,pc){
return ((function() {var o67 = (function(action){
return (function() {if(operation_dash_exp_p_(action)) {return ((function() {var o69 = (function(action_dash_proc){
return (function() {action_dash_proc();
return advance_dash_pc(pc);
});
});
var o70 = make_dash_operation_dash_exp(action,machine,labels,ops);
return o69(o70);
}))();
} else {throw(str("bad perform instruction: ",inst));
}})()
;
});
var o68 = cdr(inst);
return o67(o68);
}))();
});
var make_dash_read = (function(inst,machine,pc){
return ((function() {var o71 = (function(reg){
return (function() {start_dash_stdin(string_dash__gt_symbol("repl"));
return machine.pause();
});
});
var o72 = machine.get_dash_register(cadr(inst));
return o71(o72);
}))();
});
var make_dash_break = (function(machine,pc){
return (function() {advance_dash_pc(pc);
start_dash_stdin(string_dash__gt_symbol("break"));
println(str("break: ",get_dash_register_dash_contents(machine,string_dash__gt_symbol("exp"))));
return machine.pause();
});
});
var make_dash_next = (function(machine,pc){
return (function() {advance_dash_pc(pc);
machine.pause();
return setTimeout((function() {return machine.proceed();
}),1);
});
});
var make_dash_primitive_dash_exp = (function(exp,machine,labels){
return (function() {if(const_dash_exp_p_(exp)) {return ((function() {return ((function() {var o73 = (function(c){
return (function() {return c;
});
});
var o74 = cadr(exp);
return o73(o74);
}))();
}))();
} else {return (function() {if(label_dash_exp_p_(exp)) {return ((function() {return ((function() {var o75 = (function(insts){
return (function() {return insts;
});
});
var o76 = lookup_dash_label(labels,cadr(exp));
return o75(o76);
}))();
}))();
} else {return (function() {if(register_dash_exp_p_(exp)) {return ((function() {return ((function() {var o77 = (function(r){
return (function() {return r.get();
});
});
var o78 = machine.get_dash_register(cadr(exp));
return o77(o78);
}))();
}))();
} else {return ((function() {throw(str("unknown expression type: ",exp));
}))();
}})()
;
}})()
;
}})()
;
});
var label_dash_exp_p_ = (function(exp){
return (list_p_(exp) && _eq__eq_(car(exp),string_dash__gt_symbol("label")));
});
var label_dash_exp_dash_label = (function(exp){
return cadr(exp);
});
var register_dash_exp_p_ = (function(exp){
return (list_p_(exp) && _eq__eq_(car(exp),string_dash__gt_symbol("reg")));
});
var register_dash_exp_dash_reg = (function(exp){
return cadr(exp);
});
var const_dash_exp_p_ = (function(exp){
return (list_p_(exp) && _eq__eq_(car(exp),string_dash__gt_symbol("const")));
});
var const_dash_exp_dash_value = (function(exp){
return cadr(exp);
});
var make_dash_operation_dash_exp = (function(exp,machine,labels,ops){
return ((function() {var o79 = (function(op,aprocs){
return (function() {return apply(op,map((function(p){
return p();
}),aprocs));
});
});
var o80 = lookup_dash_prim(cadar(exp),ops);
var o81 = map((function(e){
return make_dash_primitive_dash_exp(e,machine,labels);
}),cdr(exp));
return o79(o80,o81);
}))();
});
var operation_dash_exp_p_ = (function(exp){
return (list_p_(exp) && eq_p_(car(car(exp)),string_dash__gt_symbol("op")));
});
var lookup_dash_prim = (function(sym,ops){
return ((function() {var o82 = (function(prim){
(function() {if(not(prim)) {throw(str("unknown operation: ",sym));
} else {return false;
}})()
;
return prim;
});
var o83 = dict_dash_ref(ops,sym);
return o82(o83);
}))();
});
var prompt_dash_for_dash_input = (function(msg){
return util.print(msg);
});
var stdin_dash_mode = false;
var start_dash_stdin = (function(mode){
process.stdin.resume();
stdin_dash_mode = mode;
});
var stop_dash_stdin = (function() {return process.stdin.pause();
});
process.stdin.on("data",(function(txt){
return ((function() {var o84 = (function(txt){
return (function() {if(_eq_(stdin_dash_mode,string_dash__gt_symbol("repl"))) {return ((function() {return on_dash_repl_dash_input(txt);
}))();
} else {return (function() {if(_eq_(stdin_dash_mode,string_dash__gt_symbol("break"))) {return ((function() {return on_dash_break_dash_input(txt);
}))();
} else {return false;
}})()
;
}})()
;
});
var o85 = (txt + "");
return o84(o85);
}))();
}));
var prompt_dash_read = (function() {return process.stdin.resume();
});
var continue_dash_machine = (function() {process.stdin.pause();
return current_dash_machine.proceed();
});
var inspect_dash_var = (function(v){
return (function() {if(compound_dash_procedure_p_(v)) {return ((function() {return ((function() {var o86 = (function(s){
return (function() {if((vector_dash_length(s) < 61)) {return s;
} else {return str(vector_dash_slice(s,0,60),"...)");
}})()
;
});
var o87 = inspect(list_dash_append(list(string_dash__gt_symbol("lambda"),_emptylst),((function() {var o89 = (function(o88){
return (function() {if(vector_p_(o88)) {return vector_dash__gt_list(o88);
} else {return o88;
}})()
;
});
var o90 = procedure_dash_body(v);
return o89(o90);
}))()),true);
return o86(o87);
}))();
}))();
} else {return (function() {if(primitive_dash_procedure_p_(v)) {return ((function() {return "<native-function>";
}))();
} else {return ((function() {return inspect(v);
}))();
}})()
;
}})()
;
});
var inspect_dash_environment = (function() {return ((function() {var o91 = (function(frame){
return fold((function(k,acc){
return ((function() {var o93 = (function(v,v){
return (acc + str(k,": ",v,"\n"));
});
var o94 = dict_dash_ref(frame,k);
var o95 = inspect_dash_var(o94);
return o93(o94,o95);
}))();
}),"",keys(frame));
});
var o92 = first_dash_frame(get_dash_register_dash_contents(current_dash_machine,string_dash__gt_symbol("env")));
return o91(o92);
}))();
});
var debugger_dash_handle = (function(txt){
return ((function() {var o96 = (function(txt){
return (function() {if(_eq_(txt,"v")) {return ((function() {return println(inspect_dash_environment());
}))();
} else {return ((function() {return continue_dash_machine();
}))();
}})()
;
});
var o97 = txt.trim();
return o96(o97);
}))();
});
var current_dash_machine = false;
var on_dash_repl_dash_input = (function(txt){
return current_dash_machine.on_dash_input(txt);
});
var on_dash_break_dash_input = debugger_dash_handle;
var feed_dash_asm = (function(src){
return ((function() {var o98 = (function(machine){
set_dash_register_dash_contents_excl_(machine,string_dash__gt_symbol("env"),compiler.global_dash_environment);
current_dash_machine = machine;
return machine;
});
var o99 = make_dash_machine(list(string_dash__gt_symbol("env"),string_dash__gt_symbol("proc"),string_dash__gt_symbol("val"),string_dash__gt_symbol("arg1"),string_dash__gt_symbol("continue"),string_dash__gt_symbol("input")),compiler.ops,read(src));
return o98(o99);
}))();
});
module.exports = dict(string_dash__gt_symbol("feed_dash_asm"),feed_dash_asm);

