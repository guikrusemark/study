import { inspect } from "../decorators/inspect.js";
import { logExecution, logGeneric } from "../decorators/log-execution.js";
import { DiasDaSemana } from "../enums/dias-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { NegociacoesService } from "../services/negociacoes-service.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";

export class NegociacaoController {
	private inputData: HTMLInputElement;
	private inputQuantidade: HTMLInputElement;
	private inputValor: HTMLInputElement;
	private negociacoes = new Negociacoes();
	private negociacoesView = new NegociacoesView("#negociacoesView");
	private negociacoesService = new NegociacoesService();
	private mensagemView = new MensagemView("#mensagemView");

	constructor() {
		this.inputData = document.querySelector("#data") as HTMLInputElement;
		this.inputQuantidade = <HTMLInputElement>(
			document.querySelector("#quantidade")
		);
		this.inputValor = document.querySelector("#valor") as HTMLInputElement;
		this.negociacoesView.update(this.negociacoes);
	}

	@logGeneric
	// @logExecution()
	// @inspect
	public adiciona(): void {
		const negociacao = this.criaNegociacao();

		if (this.isDiaUtil(negociacao.data)) {
			this.negociacoes.adiciona(negociacao);
			this.atualizaView();
		} else {
			this.mensagemView.update(
				"Negociações só podem ser realizadas em dias úteis!",
			);
		}
	}

	private criaNegociacao(): Negociacao {
		return Negociacao.criaDe(
			this.inputData.value,
			this.inputQuantidade.value,
			this.inputValor.value,
		);
	}

	private limparFormulario(): void {
		this.inputData.value = new Date().toISOString().split("T")[0];
		this.inputQuantidade.value = "1";
		this.inputValor.value = "1";
		this.inputData.focus();
	}

	private atualizaView(): void {
		this.negociacoesView.update(this.negociacoes);
		this.mensagemView.update("Negociação adicionada com sucesso!");
		this.limparFormulario();
	}

	public importaDados(): void {
		this.negociacoesService
			.obterNegociacoesDoDia()
			.then((negociacoesDeHoje) => {
				return negociacoesDeHoje.filter((negociacaoDeHoje) => {
					return !this.negociacoes
						.lista()
						.some((negociacao) => negociacao.ehIgual(negociacaoDeHoje));
				});
			})
			.then((negociacoesDeHoje) => {
				for (const negociacao of negociacoesDeHoje) {
					this.negociacoes.adiciona(negociacao);
				}
				this.negociacoesView.update(this.negociacoes);
			});
	}

	private isDiaUtil(data: Date): boolean {
		return (
			data.getDay() !== DiasDaSemana.DOMINGO &&
			data.getDay() !== DiasDaSemana.SABADO
		);
	}
}