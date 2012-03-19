
;; syntactic analysis

(define self-evaluating? literal?)
(define variable? symbol?)

(define (quoted? expr)
  (eq? (car expr) 'quote))

(define (assignment? expr)
  (eq? (car expr) 'set!))

(define (definition? expr)
  (eq? (car expr) 'define))

(define (if? expr)
  (eq? (car expr) 'if))

(define (lambda? expr)
  (eq? (car expr) 'lambda))

(define (begin? expr)
  (eq? (car expr) 'begin))

(define application? list?)

;; inspecting syntax

(define (text-of-quotation expr)
  (cadr expr))

(define assignment-variable cadr)
(define assignment-value caddr)

(define (definition-variable expr)
  (if (symbol? (cadr expr))
      (cadr expr)
      (caadr expr)))

(define (definition-value expr)
  (if (symbol? (cadr expr))
      (caddr expr)
      (make-lambda (cdadr expr)
              (cddr expr))))

;; instruction sequences

(define (make-instruction-sequence needs modifies statements)
  [needs modifies statements])

(define (empty-instruction-sequence)
  (make-instruction-sequence [] [] []))

;; frames/environments

(define (make-frame vars vals)
  (zip vars vals))

(define enclosing-environment cdr)
(define first-frame car)
(define empty-environment '())

(define (extend-environment vars vals base-env)
  (if (== (length vars) (length vals))
      (cons (make-frame vars vals) base-env)
      (if (< (length vars) (length vals))
          (throw "too many arguments supplied")
          (throw "too few arguments supplied"))))

(define (find-frame-with-var varr env)
  (if (= env empty-environment)
      #f
      (let ((frame (first-frame env)))
        (if (in-list? (keys frame) varr)
            frame
            (find-frame-with-var varr (enclosing-environment env))))))

(define (lookup-variable-value varr env)
  (let ((frame (find-frame-with-var varr env)))
    (if frame
        (dict-ref frame varr)
        (throw (str "unbound variable: " varr)))))

(define (set-variable-value! varr val env)
  (let ((frame (find-frame-with-var varr env)))
    (if frame
        (dict-put! frame varr val)
        (throw (str "unbound variable: " varr)))))

(define (define-variable! varr val env)
  (dict-put! (first-frame env) varr val))

;; code generators

(define (compile-linkage linkage)
  (cond
   ((eq? linkage 'return)
    (make-instruction-sequence '[continue] []
                               '[(goto (reg continue))]))
   ((eq? linkage 'next)
    (empty-instruction-sequence))
   (else
    (make-instruction-sequence [] []
                               `[(goto (label ,linkage))]))))

(define (end-with-linkage linkage instruction-sequence)
  (preserving '[continue]
              instruction-sequence
              (compile-linkage linkage)))

(define (compile-self-evaluating exp target linkage)
  (end-with-linkage
   linkage
   (make-instruction-sequence
    [] [target]
    `[(assign ,target (const ,exp))])))

(define (compile-quoted)
  (end-with-linkage
   linkage
   (make-instruction-sequence
    [] [target]
    `[(assign ,target (const ,(text-of-quotation exp)))])))

(define (compile-variable exp target linkage)
  (end-with-linkage
   linkage
   (make-instruction-sequence
    '[env] [target]
    `[(assign ,target
              (op lookup-variable-value)
              (const ,exp)
              (reg env))])))

(define (compile-assignment exp target linkage)
  (let ((var (assignment-variable exp))
        (value-code
         (compile (assignment-value exp) 'val 'next)))
    (end-with-linkage
     linkage
     (preserving
      '[env]
      value-code
      (make-instruction-sequence
       '[env val] [target]
       `[(perform (op set-variable-value!)
                  (const ,var)
                  (reg val)
                  (reg env))
         (assign ,target (const ok))])))))

(define (compile-definition exp target linkage)
  (let ((var (definition-variable exp))
        (value-code
         (compile (definition-value exp) 'val 'next)))
    (end-with-linkage
     linkage
     (preserving
      '[env]
      value-code
      (make-instruction-sequence
       '[env val] [target]
       `[(perform (op define-variable!)
                  (const ,var)
                  (reg val)
                  (reg env))
         (assign ,target (const ok))])))))

;; main

(define (compile exp target linkage)
  (cond
   ((self-evaluating? exp)
    (compile-self-evaluating exp target linkage))
   ((quoted? exp) (compile-quoted exp target linkage))
   ((variable? exp)
    (compile-variable exp target linkage))
   ((assignment? exp)
    (compile-assignment exp target linkage))
   ((definition? exp)
    (compile-definition exp target linkage))
   ((if? exp) (compile-if exp target linkage))
   ((lambda? exp) (compile-lambda exp target linkage))
   ((begin? exp)
    (compile-sequence (begin-actions exp)
                      target
                      linkage))
   ((application? exp)
    (compile-application exp target linkage))
   (else
    (throw (str "compiler: unknown expression type" exp)))))
