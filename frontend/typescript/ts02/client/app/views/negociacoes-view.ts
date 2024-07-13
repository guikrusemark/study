export class NegociacoesView {
	private elemento: HTMLElement;
	constructor(seletor: string) {
		this.elemento = document.querySelector(seletor);
	}

	template(): string {
		return `
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th>DATA</th>
            <th>QUANTIDADE</th>
            <th>VALOR</th>
            <th>VOLUME</th>
          </tr>
        </thead>

        <tbody>
        </tbody>

        <tfoot>
        </tfoot>
      </table>
    `;
	}

	update(): void {
		this.elemento.innerHTML = this.template();
	}
}
