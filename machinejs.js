
var compiler = require('./compiler');

function make_machine(regs, ops, controller) {
    var m = new Machine();
    for(var i=0; i<regs.length; i++) {
        m.allocate_register(regs[i]);
    }
    m.install_operations(ops);
    m.install_instructions_seq(assemble(controller, m));
    return m;
}

function Machine() {
    this.push_stack = function(x) {
        this.stack_ptr++;
        this.stack[stack_ptr] = x;
    };

    this.pop_stack = function() {
        this.stack_ptr--;
    };

    this.init_stack = function() {
        this.stack = new Array(2000);
        this.stack_ptr = 0;
    };

    this.allocate_register = function(name) {
        if(!this.regs[name]) {
            this.regs[name] = "_unassigned_";
        }
        throw "register already defined: " + name;
    };

    this.get_register = function(name) {
        if(this.regs[name]) {
            return this.regs[name];
        }
        throw "unknown register: " + name;
    };

    this.execute = function() {
    };

    this.regs = {};
    this.instruction_seq = [];
    this.allocate_register('pc');
    this.allocate_register('flag');
    this.init_stack();
}

function assemble(controller, machine) {
    extract_labels(controller,
                   function(insts, labels) {
                       update_insts(insts, labels, machine);
                       return insts;
                   });
}

function update_insts(insts, labels, machine) {
    for(var i=0, len=insts.length; i<len; i++) {
        insts[i].proc = 
            make_exec_proc(instruction_text(insts[i],
                                            labels,
                                            machine));
    }
}

function extract_labels(text, receive) {
    var labels = {};
    var insts = [];

    for(var i=0, len=text.length; i<len; i++) {
        if(typeof text[i] == "string") {
            labels[text[i]] = insts;
        }
        else {
            insts = insts.concat([make_instruction(text[i])]);
        }
    }

    receive(insts, labels);
}

function make_instruction(text) {
    return {text: text,
            proc: null,
            label: null,
            line: null};
}

function make_exec_proc(text, labels, machine) {
    switch(text[0]) {
    case "assign":
        return make_assign(inst, machine, labels);
    }

    throw "unknown instruction: " + text;
}

function make_assign(inst, machine, labels) {
    var target = inst[1];
    var expr = inst[2];
    var val;
    
    if(operation_exp_p(expr)) {
        val = make_operation_exp(expr, machine, labels);
    }
    else {
        val = make_primitive_exp(expr, machine, labels);
    }

    return [ASSIGN, target, val];
}

function make_primitive_exp(exp, machine, labels) {
    
}

