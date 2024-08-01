var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { logGeneric } from "../decorators/log-execution.js";
import { DiasDaSemana } from "../enums/dias-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { NegociacoesService } from "../services/negociacoes-service.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";
export class NegociacaoController {
    constructor() {
        this.negociacoes = new Negociacoes();
        this.negociacoesView = new NegociacoesView("#negociacoesView");
        this.negociacoesService = new NegociacoesService();
        this.mensagemView = new MensagemView("#mensagemView");
        this.inputData = document.querySelector("#data");
        this.inputQuantidade = (document.querySelector("#quantidade"));
        this.inputValor = document.querySelector("#valor");
        this.negociacoesView.update(this.negociacoes);
    }
    adiciona() {
        const negociacao = this.criaNegociacao();
        if (this.isDiaUtil(negociacao.data)) {
            this.negociacoes.adiciona(negociacao);
            this.atualizaView();
        }
        else {
            this.mensagemView.update("Negociações só podem ser realizadas em dias úteis!");
        }
    }
    criaNegociacao() {
        return Negociacao.criaDe(this.inputData.value, this.inputQuantidade.value, this.inputValor.value);
    }
    limparFormulario() {
        this.inputData.value = new Date().toISOString().split("T")[0];
        this.inputQuantidade.value = "1";
        this.inputValor.value = "1";
        this.inputData.focus();
    }
    atualizaView() {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update("Negociação adicionada com sucesso!");
        this.limparFormulario();
    }
    importaDados() {
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
    isDiaUtil(data) {
        return (data.getDay() !== DiasDaSemana.DOMINGO &&
            data.getDay() !== DiasDaSemana.SABADO);
    }
}
__decorate([
    logGeneric
], NegociacaoController.prototype, "adiciona", null);
