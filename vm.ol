
(require (compiler "./compiler")
         (machine "./machine"))

(define (run src)
  (let ((statements (compiler.compile src))
        (m (machine.feed-asm statements)))
    (m.start)
    (let ((res (machine.result)))
      (if res
          (pp res)))))

(run
 '(begin
    (define (factorial n)
      (define (iter product counter)
        (if (> counter n)
            product
            (iter (* counter product) (+ counter 1))))
      (iter 1 1))

    (pp (factorial 100))))
