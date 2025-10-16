$('form input[type="file"]').change((event) => {
	const arquivos = event.target.files;
	if (arquivos.length === 0) {
		console.log("sem imagem pra mostrar");
	} else {
		if (arquivos[0].type == "image/jpeg") {
			$("img").remove();
			const imagem = $('<img class="img-fluid">');
			imagem.attr("src", window.URL.createObjectURL(arquivos[0]));
			$("figure").prepend(imagem);
		} else {
			alert("Formato não suportado");
		}
	}
});
