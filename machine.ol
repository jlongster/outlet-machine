
(require (fs "fs")
         (compiler "./compiler"))

;; main functions

(define (make-machine regs ops controller)
  (let ((machine (make-new-machine)))
    (for-each (lambda (reg)
                (machine.allocate-register reg))
              regs)
    (machine.install-operations ops)
    (machine.install-instruction-sequence (assemble controller machine))
    machine))

(define (set-register-contents! machine reg val))
(define (get-register-contents machine reg))
(define (start machine))

;; registers

(define (make-register)
  (let ((contents '_unassigned_))
    {:get (lambda () contents)
     :set! (lambda (val) (set! contents val))}))

;; stack

(define (make-stack)
  (let ((s '()))
    {:push (lambda (x)
             (set! s (cons x s)))
     :pop! (lambda ()
            (if (null? s)
                (throw "pop: empty stack")
                (let ((top (car s)))
                  (set! s (cdr s))
                  top)))
     :initialize (lambda () (set! s '() 'done))}))

;; machine

(define (make-new-machine)
  (let ((pc (make-register))
        (flag (make-register))
        (stack (make-stack))
        (instruction-sequence '())
        (paused #f)
        (stack-ptr 0))
    (let ((ops {:initialize-stack stack.initialize})
          (reg-table {:pc pc :flag flag}))
      (define (allocate-register name)
        (if (list-find (keys reg-table) name)
            (throw (str "register already defined: " name))
            (dict-put! reg-table name (make-register))))

      (define (lookup-register name)
        (if (list-find (keys reg-table) name)
            (dict-ref reg-table name)
            (throw (str "unknown register: " name))))

      (define (pause) (set! paused #t))

      (define (print-registers)
        (for-each (lambda (name)
                    (if (and (not (== name 'pc))
                             (not (== name 'continue)))
                        (let ((reg (lookup-register name)))
                          (console.log (+ (symbol->string name)
                                          ": " (util.inspect (reg.get)))))))
                  (keys reg-table)))

      (define (execute)
        (let loop ()
          (let ((insts (pc.get)))
            (if (null? insts)
                'done
                (let ((inst (car insts)))
                  (if (not paused)
                      (let ((proc (instruction-exec-proc inst)))
                        (if proc
                            (proc)
                            (throw (str "invalid exec proc: " proc)))
                        (loop))))))))

      {:start (lambda () (pc.set! instruction-sequence) (execute))
       :install-instruction-sequence (lambda (seq)
                                       (set! instruction-sequence seq))
       :allocate-register allocate-register
       :get-register lookup-register
       :install-operations (lambda (dct) (set! ops (dict-merge ops dct)))
       :stack (lambda () stack)
       :operations (lambda () ops)
       :registers (lambda () (keys reg-table))
       :print-registers print-registers
       :pause pause
       :proceed (lambda ()
                  (set! paused #f)
                  (execute))
       :on-input (lambda (txt)
                   (let ((exp (instruction-text (car (pc.get)))))
                     (if (eq? (car exp) 'read-into-reg)
                         (let ((reg (lookup-register (cadr exp))))
                           (reg.set! (read txt))))
                     ;; stop stdin and unpause the machine
                     (advance-pc pc)
                     (stop-stdin)
                     (set! paused #f)
                     (execute)))})))

(define (get-register-contents machine name)
  ((dict-ref (machine.get-register name) 'get)))

(define (set-register-contents! machine name val)
  ((dict-ref (machine.get-register name) 'set!) val))

;; assembler

(define (assemble controller machine)
  (extract-labels controller
                  (lambda (insts labels)
                    (update-insts! insts labels machine)
                    insts)))

(define (extract-labels text receive)
  (if (null? text)
      (receive '() '())
      (extract-labels (cdr text)
                      (lambda (insts labels)
                        (let ((next-inst (car text)))
                          (if (symbol? next-inst)
                              (receive insts
                                       (cons (make-label-entry next-inst
                                                               insts)
                                             labels))
                              (receive (cons (make-instruction next-inst)
                                             insts)
                                       labels)))))))

(define (update-insts! insts labels machine)
  (let ((pc (machine.get-register 'pc))
        (flag (machine.get-register 'flag))
        (stack (machine.stack))
        (ops (machine.operations)))
    (for-each
     (lambda (inst)
       (set-instruction-exec-proc!
        inst
        (make-execution-procedure
         (instruction-text inst) labels machine
         pc flag stack ops)))
     insts)

    (for-each
     (lambda (label)
       (let ((i 0))
         (for-each (lambda (inst)
                     (set-instruction-label! inst
                                             (label-entry-name label))
                     (set-instruction-line-number! inst i)
                     (set! i (+ i 1)))
                   (label-insts label))))
     labels)))

;; instructions

(define (make-instruction text)
  [text '() #f #f])

(define (instruction-text inst)
  (vector-ref inst 0))

(define (instruction-exec-proc inst)
  (vector-ref inst 1))

(define (instruction-label inst)
  (vector-ref inst 2))

(define (instruction-line-number inst)
  (vector-ref inst 3))

(define (set-instruction-exec-proc! inst proc)
  (vector-put! inst 1 proc))

(define (set-instruction-label! inst label)
  (vector-put! inst 2 label))

(define (set-instruction-line-number! inst n)
  (vector-put! inst 3 n))

;; labels

(define (make-label-entry label insts)
  [label insts])

(define (label-entry-name label)
  (vector-ref label 0))

(define (label-insts label)
  (vector-ref label 1))

(define (lookup-label labels name)
  (let ((lst (list-find labels name
                        (lambda (v) (vector-ref v 0)))))
    (if lst
        (vector-ref (car lst) 1)
        (throw (str "undefined label: " name)))))

;; execution procedures

(define (advance-pc pc)
  (pc.set! (cdr (pc.get))))

(define (make-execution-procedure inst labels machine
                                  pc flag stack ops)
  (let ((top (car inst)))
    (cond
     ((== top 'assign) (make-assign inst machine labels ops pc))
     ((== top 'test) (make-test inst machine labels ops flag pc))
     ((== top 'branch) (make-branch inst machine labels flag pc))
     ((== top 'goto) (make-goto inst machine labels pc))
     ((== top 'save) (make-save inst machine stack pc))
     ((== top 'restore) (make-restore inst machine stack pc))
     ((== top 'perform) (make-perform inst machine labels ops pc))
     ((== top 'read-into-reg) (make-read inst machine pc))
     ((== top 'break) (make-break machine pc))
     ((== top 'next) (make-next machine pc)))))

(define (make-assign inst machine labels ops pc)
  (let ((target (machine.get-register (cadr inst)))
        (expr (cddr inst)))
    (let ((value-proc
           (if (operation-exp? expr)
               (make-operation-exp expr machine labels ops)
               (make-primitive-exp (car expr) machine labels))))
      (lambda ()
        (target.set! (value-proc))
        (advance-pc pc)))))

(define (make-test inst machine labels ops flag pc)
  (let ((condition (cdr inst)))
    (if (operation-exp? condition)
        (let ((condition-proc
               (make-operation-exp condition machine labels ops)))
          (lambda ()
            (flag.set! (condition-proc))
            (advance-pc pc)))
        (throw (str "bad test instruction:" inst)))))

(define (make-branch inst machine labels flag pc)
  (let ((dest (cadr inst)))
    (if (label-exp? dest)
        (let ((insts (lookup-label labels (label-exp-label dest))))
          (lambda ()
            (if (flag.get)
                (pc.set! insts)
                (advance-pc pc))))
        (throw (str "bad branch instruction: " inst)))))

(define (make-goto inst machine labels pc)
  (let ((dest (cadr inst)))
    (cond
     ((label-exp? dest)
      (let ((insts (lookup-label labels
                                 (label-exp-label dest))))
        (lambda () (pc.set! insts))))
     ((register-exp? dest)
      (let ((reg (machine.get-register (register-exp-reg dest))))
        (lambda () (pc.set! (reg.get)))))
     (else
      (throw (str "bad goto instruction: " inst))))))

(define (make-save inst machine stack pc)
  (let ((reg (machine.get-register (cadr inst))))
    (lambda ()
      (stack.push (reg.get))
      (advance-pc pc))))

(define (make-restore inst machine stack pc)
  (let ((reg (machine.get-register (cadr inst))))
    (lambda ()
      (reg.set! (stack.pop!))
      (advance-pc pc))))

(define (make-perform inst machine labels ops pc)
  (let ((action (cdr inst)))
    (if (operation-exp? action)
        (let ((action-proc
               (make-operation-exp action machine labels ops)))
          (lambda ()
            (action-proc)
            (advance-pc pc)))
        (throw (str "bad perform instruction: " inst)))))

(define (make-read inst machine pc)
  (let ((reg (machine.get-register (cadr inst))))
    (lambda ()
      (start-stdin 'repl)
      (machine.pause))))

(define (make-break machine pc)
  (lambda ()
    (advance-pc pc)
    (start-stdin 'break)
    (println (str "break: " (get-register-contents machine 'exp)))
    (machine.pause)))

(define (make-next machine pc)
  (lambda ()
    (advance-pc pc)
    (machine.pause)
    (setTimeout (lambda () (machine.proceed)) 1)))

(define (make-primitive-exp exp machine labels)
  (cond
   ((const-exp? exp)
    (let ((c (cadr exp)))
      (lambda () c)))
   ((label-exp? exp)
    (let ((insts (lookup-label labels (cadr exp))))
      (lambda () insts)))
   ((register-exp? exp)
    (let ((r (machine.get-register (cadr exp))))
      (lambda () (r.get))))
   (else
    (throw (str "unknown expression type: " exp)))))

(define (label-exp? exp)
  (and (list? exp)
       (== (car exp) 'label)))

(define (label-exp-label exp)
  (cadr exp))

(define (register-exp? exp)
  (and (list? exp)
       (== (car exp) 'reg)))

(define (register-exp-reg exp)
  (cadr exp))

(define (const-exp? exp)
  (and (list? exp)
       (== (car exp) 'const)))

(define (const-exp-value exp)
  (cadr exp))

(define (make-operation-exp exp machine labels ops)
  (let ((op (lookup-prim (cadar exp) ops))
        (aprocs (map (lambda (e)
                       (make-primitive-exp e machine labels))
                     (cdr exp))))
    (lambda ()
      (apply op (map (lambda (p) (p)) aprocs)))))

(define (operation-exp? exp)
  (and (list? exp)
       (eq? (car (car exp)) 'op)))

(define (lookup-prim sym ops)
  (let ((prim (dict-ref ops sym)))
    (if (not prim)
        (throw (str "unknown operation: " sym)))
    prim))

;; main

(define (prompt-for-input msg)
  (util.print msg))

;; node.js code

(define stdin-mode #f)
(define (start-stdin mode)
  (process.stdin.resume)
  (set! stdin-mode mode))

(define (stop-stdin)
  (process.stdin.pause))

(process.stdin.on
 "data"
 (lambda (txt)
   (let ((txt (+ txt "")))
     (cond
      ((= stdin-mode 'repl) (on-repl-input txt))
      ((= stdin-mode 'break) (on-break-input txt))))))

(define (prompt-read)
  (process.stdin.resume))

(define (continue-machine)
  (process.stdin.pause)
  (current-machine.proceed))

;; end node.js code

;; debugger

(define (inspect-var v)
  (cond
   ((compound-procedure? v)
    (let ((s (inspect `(lambda () ,@(procedure-body v)) #t)))
      (if (< (vector-length s) 61)
          s
          (str (vector-slice s 0 60) "...)"))))
   ((primitive-procedure? v)
    "<native-function>")
   (else (inspect v))))

(define (inspect-environment)
  (let ((frame (first-frame
                (get-register-contents current-machine 'env))))
    (fold
     (lambda (k acc)
       (let ((v (dict-ref frame k))
             (v (inspect-var v)))
         (+ acc (str k ": " v "\n"))))
     ""
     (keys frame))))

(define (debugger-handle txt)
  (let ((txt (txt.trim)))
    (cond
     ((= txt "v")
      (println (inspect-environment)))
     (else
      (continue-machine)))))

;; main

(define current-machine #f)
(define (on-repl-input txt) (current-machine.on-input txt))
(define on-break-input debugger-handle)

(define (feed-asm src)
  (let ((machine (make-machine
                  '(env proc val arg1 continue input)
                  compiler.ops
                  (read src))))
    (set-register-contents! machine 'env compiler.global-environment)
    (set! current-machine machine)
    machine))

(set! module.exports {:feed-asm feed-asm})
