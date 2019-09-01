var calculadora = {

	visor: document.getElementById("display"),
	pantalla: "0",
	operaciones: "",
	primerValor: 0,
	segundoValor: 0,
	ultimoValor: 0,
	resultadoOperaciones: 0,
	teclaIgual: false,

	init: (function(){
		this.asignarEventosFormatoBotones(".tecla");
		this.asignarEventosaFuncion();
	}),

	asignarEventosFormatoBotones: function(selector){
		var x = document.querySelectorAll(selector);
		for (var i = 0; i<x.length;i++) {
			x[i].onmouseover = this.disminuirteclas;
			x[i].onmouseleave = this.restablecerTeclas;
		};
	},

	ObturarTecla: function(elemento){
		var x = elemento.id;
		if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
			elemento.style.width = "28%";
			elemento.style.height = "62px";
		} else if(x=="mas") {
			elemento.style.width = "87%";
			elemento.style.height = "97%";
		} else {
		elemento.style.width = "21%";
		elemento.style.height = "62px";
		}
	},

	SoltarTecla: function(elemento){
		var x = elemento.id;
		if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
			elemento.style.width = "29%";
			elemento.style.height = "62.91px";
		} else if(x=="mas") {
			elemento.style.width = "91%";
			elemento.style.height = "100%";
		} else {
		elemento.style.width = "22%";
		elemento.style.height = "62.91px";
		}
	},

	disminuirteclas: function(event){
		calculadora.ObturarTecla(event.target);
	},

	restablecerTeclas: function(event){
		calculadora.SoltarTecla(event.target);
	},

	asignarEventosaFuncion: function(){
		document.getElementById("0").addEventListener("click", function() {calculadora.ingresoNumero("0");});
		document.getElementById("1").addEventListener("click", function() {calculadora.ingresoNumero("1");});
		document.getElementById("2").addEventListener("click", function() {calculadora.ingresoNumero("2");});
		document.getElementById("3").addEventListener("click", function() {calculadora.ingresoNumero("3");});
		document.getElementById("4").addEventListener("click", function() {calculadora.ingresoNumero("4");});
		document.getElementById("5").addEventListener("click", function() {calculadora.ingresoNumero("5");});
		document.getElementById("6").addEventListener("click", function() {calculadora.ingresoNumero("6");});
		document.getElementById("7").addEventListener("click", function() {calculadora.ingresoNumero("7");});
		document.getElementById("8").addEventListener("click", function() {calculadora.ingresoNumero("8");});
		document.getElementById("9").addEventListener("click", function() {calculadora.ingresoNumero("9");});
		document.getElementById("mas").addEventListener("click", function() {calculadora.ingresoOperaciones("+");});
		document.getElementById("menos").addEventListener("click", function() {calculadora.ingresoOperaciones("-");});
		document.getElementById("por").addEventListener("click", function() {calculadora.ingresoOperaciones("*");});
		document.getElementById("dividido").addEventListener("click", function() {calculadora.ingresoOperaciones("/");});
		document.getElementById("on").addEventListener("click", function() {calculadora.limpiarPantalla();});
		document.getElementById("sign").addEventListener("click", function() {calculadora.cambiarSigno();});
		document.getElementById("punto").addEventListener("click", function() {calculadora.decimal();});
		document.getElementById("igual").addEventListener("click", function() {calculadora.verResultadoOperaciones();});
	},

	limpiarPantalla: function(){

	  this.pantalla = "0";
		this.operaciones = "";
		this.primerValor = 0;
		this.segundoValor = 0;
		this.resultadoOperaciones = 0;
		this.Operación = "";
		this.teclaIgual = false;
		this.ultimoValor = 0;
		this.actualizarPantalla();
	},

	cambiarSigno: function(){
		if (this.pantalla !="0") {
			var aux;
			if (this.pantalla.charAt(0)=="-") {
				aux = this.pantalla.slice(1);
			}	else {
				aux = "-" + this.pantalla;
			}
		this.pantalla = "";
		this.pantalla = aux;
		this.actualizarPantalla();
		}
	},

	decimal: function(){
		if (this.pantalla.indexOf(".")== -1) {
			if (this.pantalla == ""){
				this.pantalla = this.pantalla + "0.";
			} else {
				this.pantalla = this.pantalla + ".";
			}
			this.actualizarPantalla();
		}
	},

	ingresoNumero: function(valor){
		if (this.pantalla.length < 8) {

			if (this.pantalla=="0") {
				this.pantalla = "";
				this.pantalla = this.pantalla + valor;
			} else {
				this.pantalla = this.pantalla + valor;
			}
		this.actualizarPantalla();
		}
	},

	ingresoOperaciones: function(oper){
		this.primerValor = parseFloat(this.pantalla);
		this.pantalla = "";
		this.operaciones = oper;
		this.teclaIgual = false;
		this.actualizarPantalla();
	},

	verResultadoOperaciones: function(){

		if(!this.teclaIgual){
			this.segundoValor = parseFloat(this.pantalla);
			this.ultimoValor = this.segundoValor;
			this.realizarOperaciones(this.primerValor, this.segundoValor, this.operaciones);

		} else {
			this.realizarOperaciones(this.primerValor, this.ultimoValor, this.operaciones);
		}

		this.primerValor = this.resultadoOperaciones;
		this.pantalla = "";

		if (this.resultadoOperaciones.toString().length < 9){
			this.pantalla = this.resultadoOperaciones.toString();
		} else {
			this.pantalla = this.resultadoOperaciones.toString().slice(0,8) + "...";
		}
		this.actualizarPantalla();
		this.teclaIgual = true;


	},

	realizarOperaciones: function(primerValor, segundoValor, operaciones){
		switch(operaciones){
			case "+":
				this.resultadoOperaciones = eval(primerValor + segundoValor);
			break;
			case "-":
				this.resultadoOperaciones = eval(primerValor - segundoValor);
			break;
			case "*":
				this.resultadoOperaciones = eval(primerValor * segundoValor);
			break;
			case "/":
				this.resultadoOperaciones = eval(primerValor / segundoValor);
		}
	},

	actualizarPantalla: function(){
		this.visor.innerHTML = this.pantalla;
	}

};

calculadora.init();
