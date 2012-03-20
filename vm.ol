
(require (compiler "./compiler")
         (machine "./machine"))

(define (run src)
  (let ((inst (compiler.compile src 'val 'next))
        (machine (machine.feed-asm (statements inst))))
    (machine.start)))
