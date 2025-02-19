export class View {
    constructor(seletor, escapar = false, seletorAdicional) {
        this.elemento = document.querySelector(seletor);
        this.escapar = escapar;
        if (seletorAdicional)
            this.elementoAdicional = document.querySelector(seletorAdicional);
    }
    update(model) {
        let template = this.template(model);
        if (this.escapar) {
            template = template.replace(/<script>[\s\S]*?<\/script>/, "");
            if (this.elemento)
                this.elemento.innerHTML = template;
        }
    }
}
