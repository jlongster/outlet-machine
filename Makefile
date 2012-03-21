# Outlet is required: https://github.com/jlongster/outlet

all: machine compiler vm web

machine: machine.ol
	ol -c machine.ol > machine.js

compiler: compiler.ol
	ol -c compiler.ol > compiler.js

vm: vm.ol
	ol -c vm.ol > vm.js

web: web.ol
	ol -c -r no-runtime web.ol > web.js
