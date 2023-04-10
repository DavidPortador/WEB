'use strict';

;( function ( document, window, index ) {
	var inputs = document.querySelectorAll( '.inputfile' );
	Array.prototype.forEach.call( inputs, function( input ) {
		var label	 = input.nextElementSibling,
			labelVal = label.innerHTML;
		input.addEventListener( 'change', function( e ){
			var fileName = '';
			if( this.files && this.files.length > 1 )
				fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
			else
				fileName = e.target.value.split( '\\' ).pop();
			if( fileName )
				label.querySelector( 'span' ).innerHTML = fileName;
			else
				label.innerHTML = labelVal;
		});
	});
}( document, window, 0 ));

const input = document.getElementById("file-5");
const avatar = document.getElementById("imgeditar");
const lbl = document.getElementById("lbl");
var strbase = "";

const convertBase64 = (file) => {
	return new Promise((resolve, reject) => {
		const fileReader = new FileReader();
		fileReader.readAsDataURL(file);

		fileReader.onload = () => {
		resolve(fileReader.result);
		};

		fileReader.onerror = (error) => {
		reject(error);
		};
	});
};

const uploadImage = async (event) => {
	const file = event.target.files[0];
	const base64 = await convertBase64(file);
	//console.log(base64);
	avatar.src = base64;
	strbase = base64;
	var aux = "";
	/* 	Se elimina el formato de la imagen
		Es necesario borra el formato o la imagen se subirá dañada si no es png 
	*/
	const arr = strbase.split(",");
	for (let index = 1; index < arr.length; index++) {
		const element = arr[index];
		aux += element;
	}
	// Omite el texto hasta la primera coma [Formato de la imagen]
	console.log(aux);
    lbl.innerHTML = aux;
	strbase = aux;
};

input.addEventListener("change", (e) => {
	uploadImage(e);
});