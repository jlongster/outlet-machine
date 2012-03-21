var __args = process.argv.slice(2);var list_dash_union = (function(lst1,lst2){
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

