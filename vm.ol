
(require (compiler "./compiler")
         (machine "./machine"))

(define (run src)
  (let ((statements (compiler.compile src))
        (m (machine.feed-asm statements)))
    (m.start)))

(define (install-primitives procs)
  (compiler.install-primitives procs))

(set! module.exports {:run run
                      :install-primitives install-primitives})
