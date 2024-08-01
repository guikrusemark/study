export abstract class View<T> {
	private escapar: boolean;
	protected elemento: HTMLElement | null;
	protected elementoAdicional: HTMLElement;

	constructor(seletor: string, escapar = false, seletorAdicional?: string) {
		this.elemento = document.querySelector(seletor);
		this.escapar = escapar;
		if (seletorAdicional)
			this.elementoAdicional = document.querySelector(
				seletorAdicional,
			) as HTMLElement;
	}

	protected abstract template(model: T): string;

	public update(model: T): void {
		let template = this.template(model);
		if (this.escapar)
			template = template.replace(/<script>[\s\S]*?<\/script>/, "");

		if (this.elemento) this.elemento.innerHTML = template;
	}
}
