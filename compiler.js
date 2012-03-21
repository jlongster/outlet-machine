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
var list_dash_union = (function(lst1,lst2){
return list_dash_append(lst1,fold((function(el,acc){
return (function() {if(list_dash_find(lst1,el)) {return acc;
} else {return cons(el,acc);
}})()
;
}),_emptylst,lst2));
});
var list_dash_difference = (function(lst1,lst2){
return fold((function(el,acc){
return (function() {if(list_dash_find(lst2,el)) {return acc;
} else {return cons(el,acc);
}})()
;
}),_emptylst,lst1);
});
var true_p_ = (function(x){
return x;
});
var false_p_ = (function(x){
return not(x);
});
var self_dash_evaluating_p_ = literal_p_;
var variable_p_ = symbol_p_;
var quoted_p_ = (function(expr){
return eq_p_(car(expr),string_dash__gt_symbol("quote"));
});
var assignment_p_ = (function(expr){
return eq_p_(car(expr),string_dash__gt_symbol("set_excl_"));
});
var definition_p_ = (function(expr){
return eq_p_(car(expr),string_dash__gt_symbol("define"));
});
var if_p_ = (function(expr){
return eq_p_(car(expr),string_dash__gt_symbol("if"));
});
var lambda_p_ = (function(expr){
return eq_p_(car(expr),string_dash__gt_symbol("lambda"));
});
var begin_p_ = (function(expr){
return eq_p_(car(expr),string_dash__gt_symbol("begin"));
});
var application_p_ = list_p_;
var text_dash_of_dash_quotation = (function(expr){
return cadr(expr);
});
var assignment_dash_variable = cadr;
var assignment_dash_value = caddr;
var make_dash_lambda = (function(args,body){
return cons(string_dash__gt_symbol("lambda"),cons(args,body));
});
var definition_dash_variable = (function(expr){
return (function() {if(symbol_p_(cadr(expr))) {return cadr(expr);
} else {return caadr(expr);
}})()
;
});
var definition_dash_value = (function(expr){
return (function() {if(symbol_p_(cadr(expr))) {return caddr(expr);
} else {return make_dash_lambda(cdadr(expr),cddr(expr));
}})()
;
});
var if_dash_predicate = cadr;
var if_dash_consequent = caddr;
var if_dash_alternative = (function(exp){
return (function() {if(not(null_p_(cdddr(exp)))) {return car(cdddr(exp));
} else {return false;
}})()
;
});
var first_dash_exp = car;
var rest_dash_exps = cdr;
var last_dash_exp_p_ = (function(exp){
return null_p_(cdr(exp));
});
var lambda_dash_parameters = cadr;
var lambda_dash_body = cddr;
var begin_dash_actions = cdr;
var operator = car;
var operands = cdr;
var label_dash_counter = 0;
var new_dash_label_dash_counter = (function() {label_dash_counter = (label_dash_counter + 1);
return label_dash_counter;
});
var make_dash_label = (function(name){
return string_dash__gt_symbol(str(name,new_dash_label_dash_counter()));
});
var make_dash_instruction_dash_sequence = (function(needs,modifies,statements){
return list(needs,modifies,statements);
});
var empty_dash_instruction_dash_sequence = (function() {return make_dash_instruction_dash_sequence(_emptylst,_emptylst,_emptylst);
});
var registers_dash_needed = (function(s){
return (function() {if(symbol_p_(s)) {return _emptylst;
} else {return car(s);
}})()
;
});
var registers_dash_modified = (function(s){
return (function() {if(symbol_p_(s)) {return _emptylst;
} else {return cadr(s);
}})()
;
});
var statements = (function(s){
return (function() {if(symbol_p_(s)) {return list(s);
} else {return caddr(s);
}})()
;
});
var needs_dash_register_p_ = (function(seq,reg){
return list_dash_find(registers_dash_needed(seq),reg);
});
var modifies_dash_register_p_ = (function(seq,reg){
return list_dash_find(registers_dash_modified(seq),reg);
});
var append_dash_instruction_dash_sequences = (function(){
var seqs = vector_dash__gt_list(Array.prototype.slice.call(arguments, 0));
var append_dash_2_dash_sequences = (function(seq1,seq2){
return make_dash_instruction_dash_sequence(list_dash_union(registers_dash_needed(seq1),list_dash_difference(registers_dash_needed(seq2),registers_dash_modified(seq1))),list_dash_union(registers_dash_modified(seq1),registers_dash_modified(seq2)),list_dash_append(statements(seq1),statements(seq2)));
});
var append_dash_seq_dash_list = (function(seqs){
return (function() {if(null_p_(seqs)) {return empty_dash_instruction_dash_sequence();
} else {return append_dash_2_dash_sequences(car(seqs),append_dash_seq_dash_list(cdr(seqs)));
}})()
;
});
return append_dash_seq_dash_list(seqs);
});
var preserving = (function(regs,seq1,seq2){
return (function() {if(null_p_(regs)) {return append_dash_instruction_dash_sequences(seq1,seq2);
} else {return ((function() {var o1 = (function(first_dash_reg){
return (function() {if((needs_dash_register_p_(seq2,first_dash_reg) && modifies_dash_register_p_(seq1,first_dash_reg))) {return preserving(cdr(regs),make_dash_instruction_dash_sequence(list_dash_union(list(first_dash_reg),registers_dash_needed(seq1)),list_dash_difference(registers_dash_modified(seq1),list(first_dash_reg)),list_dash_append(list(list(string_dash__gt_symbol("save"),first_dash_reg)),list_dash_append(statements(seq1),list(list(string_dash__gt_symbol("restore"),first_dash_reg))))),seq2);
} else {return preserving(cdr(regs),seq1,seq2);
}})()
;
});
var o2 = car(regs);
return o1(o2);
}))();
}})()
;
});
var tack_dash_on_dash_instruction_dash_sequence = (function(seq,body_dash_seq){
return make_dash_instruction_dash_sequence(registers_dash_needed(seq),registers_dash_modified(seq),list_dash_append(statements(seq),statements(body_dash_seq)));
});
var parallel_dash_instruction_dash_sequences = (function(seq1,seq2){
return make_dash_instruction_dash_sequence(list_dash_union(registers_dash_needed(seq1),registers_dash_needed(seq2)),list_dash_union(registers_dash_modified(seq1),registers_dash_modified(seq2)),list_dash_append(statements(seq1),statements(seq2)));
});
var make_dash_frame = (function(vars,vals){
return zip(vars,vals);
});
var enclosing_dash_environment = cdr;
var first_dash_frame = car;
var last_dash_frame = (function(env){
return car(reverse(env));
});
var empty_dash_environment = _emptylst;
var extend_dash_environment = (function(vars,vals,base_dash_env){
return (function() {if(_eq__eq_(length(vars),length(vals))) {return cons(make_dash_frame(vars,vals),base_dash_env);
} else {return (function() {if((length(vars) < length(vals))) {throw("too many arguments supplied");
} else {throw("too few arguments supplied");
}})()
;
}})()
;
});
var find_dash_frame_dash_with_dash_var = (function(varr,env){
return (function() {if(_eq_(env,empty_dash_environment)) {return false;
} else {return ((function() {var o3 = (function(frame){
return (function() {if(list_dash_find(keys(frame),varr)) {return frame;
} else {return find_dash_frame_dash_with_dash_var(varr,enclosing_dash_environment(env));
}})()
;
});
var o4 = first_dash_frame(env);
return o3(o4);
}))();
}})()
;
});
var lookup_dash_variable_dash_value = (function(varr,env){
return ((function() {var o5 = (function(frame){
return (function() {if(frame) {return dict_dash_ref(frame,varr);
} else {throw(str("unbound variable: ",varr));
}})()
;
});
var o6 = find_dash_frame_dash_with_dash_var(varr,env);
return o5(o6);
}))();
});
var set_dash_variable_dash_value_excl_ = (function(varr,val,env){
return ((function() {var o7 = (function(frame){
return (function() {if(frame) {return dict_dash_put_excl_(frame,varr,val);
} else {throw(str("unbound variable: ",varr));
}})()
;
});
var o8 = find_dash_frame_dash_with_dash_var(varr,env);
return o7(o8);
}))();
});
var define_dash_variable_excl_ = (function(varr,val,env){
return dict_dash_put_excl_(first_dash_frame(env),varr,val);
});
var setup_dash_environment = (function() {return extend_dash_environment(primitive_dash_procedure_dash_names(),primitive_dash_procedure_dash_objects(),empty_dash_environment);
});
var install_dash_primitives = (function(procs){
return ((function() {var o9 = (function(bottom){
return for_dash_each((function(key){
return dict_dash_put_excl_(bottom,key,make_dash_primitive_dash_procedure(dict_dash_ref(procs,key)));
}),keys(procs));
});
var o10 = last_dash_frame(global_dash_environment);
return o9(o10);
}))();
});
var primitive_dash_procedures = dict(string_dash__gt_symbol("car"),car,string_dash__gt_symbol("cdr"),cdr,string_dash__gt_symbol("cons"),cons,string_dash__gt_symbol("list"),list,string_dash__gt_symbol("null_p_"),null_p_,string_dash__gt_symbol("pp"),pp,string_dash__gt_symbol("+"),(function(x,y){
return (x + y);
}),string_dash__gt_symbol("_dash_"),(function(x,y){
return (x - y);
}),string_dash__gt_symbol("*"),(function(x,y){
return (x * y);
}),string_dash__gt_symbol("_gt_"),(function(x,y){
return (x > y);
}),string_dash__gt_symbol("_lt_"),(function(x,y){
return (x < y);
}),string_dash__gt_symbol("_eq__eq_"),_eq__eq_);
var primitive_dash_procedure_dash_names = (function() {return keys(primitive_dash_procedures);
});
var primitive_dash_procedure_dash_objects = (function() {return map(make_dash_primitive_dash_procedure,vals(primitive_dash_procedures));
});
var make_dash_primitive_dash_procedure = (function(proc){
return list(string_dash__gt_symbol("primitive"),proc);
});
var primitive_dash_procedure_p_ = (function(proc){
return eq_p_(car(proc),string_dash__gt_symbol("primitive"));
});
var primitive_dash_implementation = cadr;
var apply_dash_primitive_dash_procedure = (function(proc,args){
return apply(primitive_dash_implementation(proc),args);
});
var make_dash_compiled_dash_procedure = (function(entry,env){
return list(string_dash__gt_symbol("compiled_dash_procedure"),entry,env);
});
var compiled_dash_procedure_p_ = (function(proc){
return eq_p_(car(proc),string_dash__gt_symbol("compiled_dash_procedure"));
});
var compiled_dash_procedure_dash_entry = cadr;
var compiled_dash_procedure_dash_env = caddr;
var compile_dash_linkage = (function(linkage){
return (function() {if(eq_p_(linkage,string_dash__gt_symbol("return"))) {return ((function() {return make_dash_instruction_dash_sequence(list(string_dash__gt_symbol("continue")),_emptylst,list(list(string_dash__gt_symbol("goto"),list(string_dash__gt_symbol("reg"),string_dash__gt_symbol("continue")))));
}))();
} else {return (function() {if(eq_p_(linkage,string_dash__gt_symbol("next"))) {return ((function() {return empty_dash_instruction_dash_sequence();
}))();
} else {return ((function() {return make_dash_instruction_dash_sequence(_emptylst,_emptylst,list(list(string_dash__gt_symbol("goto"),list(string_dash__gt_symbol("label"),linkage))));
}))();
}})()
;
}})()
;
});
var end_dash_with_dash_linkage = (function(linkage,instruction_dash_sequence){
return preserving(list(string_dash__gt_symbol("continue")),instruction_dash_sequence,compile_dash_linkage(linkage));
});
var compile_dash_self_dash_evaluating = (function(exp,target,linkage){
return end_dash_with_dash_linkage(linkage,make_dash_instruction_dash_sequence(_emptylst,list(target),list(list(string_dash__gt_symbol("assign"),target,list(string_dash__gt_symbol("const"),exp)))));
});
var compile_dash_quoted = (function(exp,target,linkage){
return end_dash_with_dash_linkage(linkage,make_dash_instruction_dash_sequence(_emptylst,list(target),list(list(string_dash__gt_symbol("assign"),target,list(string_dash__gt_symbol("const"),text_dash_of_dash_quotation(exp))))));
});
var compile_dash_variable = (function(exp,target,linkage){
return end_dash_with_dash_linkage(linkage,make_dash_instruction_dash_sequence(list(string_dash__gt_symbol("env")),list(target),list(list(string_dash__gt_symbol("assign"),target,list(string_dash__gt_symbol("op"),string_dash__gt_symbol("lookup_dash_variable_dash_value")),list(string_dash__gt_symbol("const"),exp),list(string_dash__gt_symbol("reg"),string_dash__gt_symbol("env"))))));
});
var compile_dash_assignment = (function(exp,target,linkage){
return ((function() {var o11 = (function(_var_,value_dash_code){
return end_dash_with_dash_linkage(linkage,preserving(list(string_dash__gt_symbol("env")),value_dash_code,make_dash_instruction_dash_sequence(list(string_dash__gt_symbol("env"),string_dash__gt_symbol("val")),list(target),list(list(string_dash__gt_symbol("perform"),list(string_dash__gt_symbol("op"),string_dash__gt_symbol("set_dash_variable_dash_value_excl_")),list(string_dash__gt_symbol("const"),_var_),list(string_dash__gt_symbol("reg"),string_dash__gt_symbol("val")),list(string_dash__gt_symbol("reg"),string_dash__gt_symbol("env"))),list(string_dash__gt_symbol("assign"),target,list(string_dash__gt_symbol("const"),string_dash__gt_symbol("ok")))))));
});
var o12 = assignment_dash_variable(exp);
var o13 = compile(assignment_dash_value(exp),string_dash__gt_symbol("val"),string_dash__gt_symbol("next"));
return o11(o12,o13);
}))();
});
var compile_dash_definition = (function(exp,target,linkage){
return ((function() {var o14 = (function(_var_,value_dash_code){
return end_dash_with_dash_linkage(linkage,preserving(list(string_dash__gt_symbol("env")),value_dash_code,make_dash_instruction_dash_sequence(list(string_dash__gt_symbol("env"),string_dash__gt_symbol("val")),list(target),list(list(string_dash__gt_symbol("perform"),list(string_dash__gt_symbol("op"),string_dash__gt_symbol("define_dash_variable_excl_")),list(string_dash__gt_symbol("const"),_var_),list(string_dash__gt_symbol("reg"),string_dash__gt_symbol("val")),list(string_dash__gt_symbol("reg"),string_dash__gt_symbol("env"))),list(string_dash__gt_symbol("assign"),target,list(string_dash__gt_symbol("const"),string_dash__gt_symbol("ok")))))));
});
var o15 = definition_dash_variable(exp);
var o16 = compile(definition_dash_value(exp),string_dash__gt_symbol("val"),string_dash__gt_symbol("next"));
return o14(o15,o16);
}))();
});
var compile_dash_if = (function(exp,target,linkage){
return ((function() {var o17 = (function(t_dash_branch,f_dash_branch,after_dash_if,consequent_dash_linkage,p_dash_code,c_dash_code,a_dash_code){
return preserving(list(string_dash__gt_symbol("env"),string_dash__gt_symbol("continue")),p_dash_code,append_dash_instruction_dash_sequences(make_dash_instruction_dash_sequence(list(string_dash__gt_symbol("val")),_emptylst,list(list(string_dash__gt_symbol("test"),list(string_dash__gt_symbol("op"),string_dash__gt_symbol("false_p_")),list(string_dash__gt_symbol("reg"),string_dash__gt_symbol("val"))),list(string_dash__gt_symbol("branch"),list(string_dash__gt_symbol("label"),f_dash_branch)))),parallel_dash_instruction_dash_sequences(append_dash_instruction_dash_sequences(t_dash_branch,c_dash_code),append_dash_instruction_dash_sequences(f_dash_branch,a_dash_code)),after_dash_if));
});
var o18 = make_dash_label(string_dash__gt_symbol("true_dash_branch"));
var o19 = make_dash_label(string_dash__gt_symbol("false_dash_branch"));
var o20 = make_dash_label(string_dash__gt_symbol("after_dash_if"));
var o21 = (function() {if(eq_p_(linkage,string_dash__gt_symbol("next"))) {return o20;
} else {return linkage;
}})()
;
var o22 = compile(if_dash_predicate(exp),string_dash__gt_symbol("val"),string_dash__gt_symbol("next"));
var o23 = compile(if_dash_consequent(exp),target,o21);
var o24 = compile(if_dash_alternative(exp),target,linkage);
return o17(o18,o19,o20,o21,o22,o23,o24);
}))();
});
var compile_dash_sequence = (function(seq,target,linkage){
return (function() {if(last_dash_exp_p_(seq)) {return compile(first_dash_exp(seq),target,linkage);
} else {return preserving(list(string_dash__gt_symbol("env"),string_dash__gt_symbol("continue")),compile(first_dash_exp(seq),target,string_dash__gt_symbol("next")),compile_dash_sequence(rest_dash_exps(seq),target,linkage));
}})()
;
});
var compile_dash_lambda = (function(exp,target,linkage){
return ((function() {var o25 = (function(proc_dash_entry,after_dash_lambda,lambda_dash_linkage){
return append_dash_instruction_dash_sequences(tack_dash_on_dash_instruction_dash_sequence(end_dash_with_dash_linkage(lambda_dash_linkage,make_dash_instruction_dash_sequence(list(string_dash__gt_symbol("env")),list(target),list(list(string_dash__gt_symbol("assign"),target,list(string_dash__gt_symbol("op"),string_dash__gt_symbol("make_dash_compiled_dash_procedure")),list(string_dash__gt_symbol("label"),proc_dash_entry),list(string_dash__gt_symbol("reg"),string_dash__gt_symbol("env")))))),compile_dash_lambda_dash_body(exp,proc_dash_entry)),after_dash_lambda);
});
var o26 = make_dash_label(string_dash__gt_symbol("entry"));
var o27 = make_dash_label(string_dash__gt_symbol("after_dash_lambda"));
var o28 = (function() {if(eq_p_(linkage,string_dash__gt_symbol("next"))) {return o27;
} else {return linkage;
}})()
;
return o25(o26,o27,o28);
}))();
});
var compile_dash_lambda_dash_body = (function(exp,proc_dash_entry){
return ((function() {var o29 = (function(formals){
return append_dash_instruction_dash_sequences(make_dash_instruction_dash_sequence(list(string_dash__gt_symbol("env"),string_dash__gt_symbol("proc"),string_dash__gt_symbol("arg1")),list(string_dash__gt_symbol("env")),list(proc_dash_entry,list(string_dash__gt_symbol("assign"),string_dash__gt_symbol("env"),list(string_dash__gt_symbol("op"),string_dash__gt_symbol("compiled_dash_procedure_dash_env")),list(string_dash__gt_symbol("reg"),string_dash__gt_symbol("proc"))),list(string_dash__gt_symbol("assign"),string_dash__gt_symbol("env"),list(string_dash__gt_symbol("op"),string_dash__gt_symbol("extend_dash_environment")),list(string_dash__gt_symbol("const"),formals),list(string_dash__gt_symbol("reg"),string_dash__gt_symbol("arg1")),list(string_dash__gt_symbol("reg"),string_dash__gt_symbol("env"))))),compile_dash_sequence(lambda_dash_body(exp),string_dash__gt_symbol("val"),string_dash__gt_symbol("return")));
});
var o30 = lambda_dash_parameters(exp);
return o29(o30);
}))();
});
var compile_dash_application = (function(exp,target,linkage){
return ((function() {var o31 = (function(proc_dash_code,operand_dash_codes){
return preserving(list(string_dash__gt_symbol("env"),string_dash__gt_symbol("continue")),proc_dash_code,preserving(list(string_dash__gt_symbol("proc"),string_dash__gt_symbol("continue")),construct_dash_arglist(operand_dash_codes),compile_dash_procedure_dash_call(target,linkage)));
});
var o32 = compile(operator(exp),string_dash__gt_symbol("proc"),string_dash__gt_symbol("next"));
var o33 = map((function(operand){
return compile(operand,string_dash__gt_symbol("val"),string_dash__gt_symbol("next"));
}),operands(exp));
return o31(o32,o33);
}))();
});
var construct_dash_arglist = (function(operand_dash_codes){
return ((function() {var o34 = (function(operand_dash_codes){
return (function() {if(null_p_(operand_dash_codes)) {return make_dash_instruction_dash_sequence(_emptylst,list(string_dash__gt_symbol("arg1")),list(list(string_dash__gt_symbol("assign"),string_dash__gt_symbol("arg1"),list(string_dash__gt_symbol("const"),_emptylst))));
} else {return ((function() {var o36 = (function(code_dash_to_dash_get_dash_last_dash_arg){
return (function() {if(null_p_(cdr(operand_dash_codes))) {return code_dash_to_dash_get_dash_last_dash_arg;
} else {return preserving(list(string_dash__gt_symbol("env")),code_dash_to_dash_get_dash_last_dash_arg,code_dash_to_dash_get_dash_rest_dash_args(cdr(operand_dash_codes)));
}})()
;
});
var o37 = append_dash_instruction_dash_sequences(car(operand_dash_codes),make_dash_instruction_dash_sequence(list(string_dash__gt_symbol("val")),list(string_dash__gt_symbol("arg1")),list(list(string_dash__gt_symbol("assign"),string_dash__gt_symbol("arg1"),list(string_dash__gt_symbol("op"),string_dash__gt_symbol("list")),list(string_dash__gt_symbol("reg"),string_dash__gt_symbol("val"))))));
return o36(o37);
}))();
}})()
;
});
var o35 = reverse(operand_dash_codes);
return o34(o35);
}))();
});
var code_dash_to_dash_get_dash_rest_dash_args = (function(operand_dash_codes){
return ((function() {var o38 = (function(code_dash_for_dash_next_dash_arg){
return (function() {if(null_p_(cdr(operand_dash_codes))) {return code_dash_for_dash_next_dash_arg;
} else {return preserving(list(string_dash__gt_symbol("env")),code_dash_for_dash_next_dash_arg,code_dash_to_dash_get_dash_rest_dash_args(cdr(operand_dash_codes)));
}})()
;
});
var o39 = preserving(list(string_dash__gt_symbol("arg1")),car(operand_dash_codes),make_dash_instruction_dash_sequence(list(string_dash__gt_symbol("val"),string_dash__gt_symbol("arg1")),list(string_dash__gt_symbol("arg1")),list(list(string_dash__gt_symbol("assign"),string_dash__gt_symbol("arg1"),list(string_dash__gt_symbol("op"),string_dash__gt_symbol("cons")),list(string_dash__gt_symbol("reg"),string_dash__gt_symbol("val")),list(string_dash__gt_symbol("reg"),string_dash__gt_symbol("arg1"))))));
return o38(o39);
}))();
});
var compile_dash_procedure_dash_call = (function(target,linkage){
return ((function() {var o40 = (function(primitive_dash_branch,compiled_dash_branch,after_dash_call,compiled_dash_linkage){
return append_dash_instruction_dash_sequences(make_dash_instruction_dash_sequence(list(string_dash__gt_symbol("proc")),_emptylst,list(list(string_dash__gt_symbol("test"),list(string_dash__gt_symbol("op"),string_dash__gt_symbol("primitive_dash_procedure_p_")),list(string_dash__gt_symbol("reg"),string_dash__gt_symbol("proc"))),list(string_dash__gt_symbol("branch"),list(string_dash__gt_symbol("label"),primitive_dash_branch)))),parallel_dash_instruction_dash_sequences(append_dash_instruction_dash_sequences(compiled_dash_branch,compile_dash_proc_dash_app1(target,compiled_dash_linkage)),append_dash_instruction_dash_sequences(primitive_dash_branch,end_dash_with_dash_linkage(linkage,make_dash_instruction_dash_sequence(list(string_dash__gt_symbol("proc"),string_dash__gt_symbol("arg1")),list(target),list(list(string_dash__gt_symbol("assign"),target,list(string_dash__gt_symbol("op"),string_dash__gt_symbol("apply_dash_primitive_dash_procedure")),list(string_dash__gt_symbol("reg"),string_dash__gt_symbol("proc")),list(string_dash__gt_symbol("reg"),string_dash__gt_symbol("arg1")))))))),after_dash_call);
});
var o41 = make_dash_label(string_dash__gt_symbol("primitive_dash_branch"));
var o42 = make_dash_label(string_dash__gt_symbol("compiled_dash_branch"));
var o43 = make_dash_label(string_dash__gt_symbol("after_dash_call"));
var o44 = (function() {if(eq_p_(linkage,string_dash__gt_symbol("next"))) {return o43;
} else {return linkage;
}})()
;
return o40(o41,o42,o43,o44);
}))();
});
var compile_dash_proc_dash_app1 = (function(target,linkage){
return (function() {if((eq_p_(target,string_dash__gt_symbol("val")) && not(eq_p_(linkage,string_dash__gt_symbol("return"))))) {return ((function() {return make_dash_instruction_dash_sequence(list(string_dash__gt_symbol("proc")),all_dash_regs,list(list(string_dash__gt_symbol("assign"),string_dash__gt_symbol("continue"),list(string_dash__gt_symbol("label"),linkage)),list(string_dash__gt_symbol("assign"),string_dash__gt_symbol("val"),list(string_dash__gt_symbol("op"),string_dash__gt_symbol("compiled_dash_procedure_dash_entry")),list(string_dash__gt_symbol("reg"),string_dash__gt_symbol("proc"))),list(string_dash__gt_symbol("goto"),list(string_dash__gt_symbol("reg"),string_dash__gt_symbol("val")))));
}))();
} else {return (function() {if((not(eq_p_(target,string_dash__gt_symbol("val"))) && not(eq_p_(linkage,string_dash__gt_symbol("return"))))) {return ((function() {return make_dash_instruction_dash_sequence(list(string_dash__gt_symbol("proc")),all_dash_regs,list(list(string_dash__gt_symbol("assign"),string_dash__gt_symbol("continue"),list(string_dash__gt_symbol("label"),proc_dash_return)),list(string_dash__gt_symbol("assign"),string_dash__gt_symbol("val"),list(string_dash__gt_symbol("op"),string_dash__gt_symbol("compiled_dash_procedure_dash_entry")),list(string_dash__gt_symbol("reg"),string_dash__gt_symbol("proc"))),list(string_dash__gt_symbol("goto"),list(string_dash__gt_symbol("reg"),string_dash__gt_symbol("val"))),proc_dash_return,list(string_dash__gt_symbol("assign"),target,list(string_dash__gt_symbol("reg"),string_dash__gt_symbol("val"))),list(string_dash__gt_symbol("goto"),list(string_dash__gt_symbol("label"),linkage))));
}))();
} else {return (function() {if((eq_p_(target,string_dash__gt_symbol("val")) && eq_p_(linkage,string_dash__gt_symbol("return")))) {return ((function() {return make_dash_instruction_dash_sequence(list(string_dash__gt_symbol("proc"),string_dash__gt_symbol("continue")),all_dash_regs,list(list(string_dash__gt_symbol("assign"),string_dash__gt_symbol("val"),list(string_dash__gt_symbol("op"),string_dash__gt_symbol("compiled_dash_procedure_dash_entry")),list(string_dash__gt_symbol("reg"),string_dash__gt_symbol("proc"))),list(string_dash__gt_symbol("goto"),list(string_dash__gt_symbol("reg"),string_dash__gt_symbol("val")))));
}))();
} else {return (function() {if((not(eq_p_(target,string_dash__gt_symbol("val"))) && eq_p_(linkage,string_dash__gt_symbol("return")))) {return ((function() {throw(str("compile-proc-app1: return linkage, target not val: ",target));
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
});
var next_p_ = (function(exp){
return (list_p_(exp) && eq_p_(car(exp),string_dash__gt_symbol("next")));
});
var compile_dash_next = (function(linkage){
return end_dash_with_dash_linkage(linkage,make_dash_instruction_dash_sequence(_emptylst,_emptylst,list(list(string_dash__gt_symbol("next")))));
});
var all_dash_regs = list(string_dash__gt_symbol("env"),string_dash__gt_symbol("proc"),string_dash__gt_symbol("val"),string_dash__gt_symbol("arg1"),string_dash__gt_symbol("continue"));
var compile = (function(exp,target,linkage){
return (function() {if(next_p_(exp)) {return ((function() {return compile_dash_next(linkage);
}))();
} else {return (function() {if(self_dash_evaluating_p_(exp)) {return ((function() {return compile_dash_self_dash_evaluating(exp,target,linkage);
}))();
} else {return (function() {if(quoted_p_(exp)) {return ((function() {return compile_dash_quoted(exp,target,linkage);
}))();
} else {return (function() {if(variable_p_(exp)) {return ((function() {return compile_dash_variable(exp,target,linkage);
}))();
} else {return (function() {if(assignment_p_(exp)) {return ((function() {return compile_dash_assignment(exp,target,linkage);
}))();
} else {return (function() {if(definition_p_(exp)) {return ((function() {return compile_dash_definition(exp,target,linkage);
}))();
} else {return (function() {if(if_p_(exp)) {return ((function() {return compile_dash_if(exp,target,linkage);
}))();
} else {return (function() {if(lambda_p_(exp)) {return ((function() {return compile_dash_lambda(exp,target,linkage);
}))();
} else {return (function() {if(begin_p_(exp)) {return ((function() {return compile_dash_sequence(begin_dash_actions(exp),target,linkage);
}))();
} else {return (function() {if(application_p_(exp)) {return ((function() {return compile_dash_application(exp,target,linkage);
}))();
} else {return ((function() {throw(str("compiler: unknown expression type",exp));
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
}})()
;
}})()
;
}})()
;
}})()
;
});
var runtime_dash_ops = dict(string_dash__gt_symbol("make_dash_compiled_dash_procedure"),make_dash_compiled_dash_procedure,string_dash__gt_symbol("compiled_dash_procedure_p_"),compiled_dash_procedure_p_,string_dash__gt_symbol("compiled_dash_procedure_dash_env"),compiled_dash_procedure_dash_env,string_dash__gt_symbol("compiled_dash_procedure_dash_entry"),compiled_dash_procedure_dash_entry,string_dash__gt_symbol("extend_dash_environment"),extend_dash_environment,string_dash__gt_symbol("lookup_dash_variable_dash_value"),lookup_dash_variable_dash_value,string_dash__gt_symbol("define_dash_variable_excl_"),define_dash_variable_excl_,string_dash__gt_symbol("list"),list,string_dash__gt_symbol("cons"),cons,string_dash__gt_symbol("primitive_dash_procedure_p_"),primitive_dash_procedure_p_,string_dash__gt_symbol("apply_dash_primitive_dash_procedure"),apply_dash_primitive_dash_procedure,string_dash__gt_symbol("false_p_"),false_p_,string_dash__gt_symbol("true_p_"),true_p_);
var global_dash_environment = setup_dash_environment();
module.exports = dict(string_dash__gt_symbol("compile"),(function(src){
return statements(compile(src,string_dash__gt_symbol("val"),string_dash__gt_symbol("next")));
}),string_dash__gt_symbol("ops"),runtime_dash_ops,string_dash__gt_symbol("install_dash_primitives"),install_dash_primitives,string_dash__gt_symbol("global_dash_environment"),global_dash_environment);

