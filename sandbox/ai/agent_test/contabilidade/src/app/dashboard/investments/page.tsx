"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { TrendingUp, DollarSign, PieChart, Plus, Trash2 } from "lucide-react";

interface Investment {
  id: string;
  name: string;
  type: string;
  amount: number;
  currentValue: number;
  profit: number;
  profitPercentage: number;
}

export default function InvestmentsPage() {
  const [investments, setInvestments] = useState<Investment[]>([
    {
      id: "1",
      name: "Tesouro Selic",
      type: "Renda Fixa",
      amount: 5000,
      currentValue: 5250,
      profit: 250,
      profitPercentage: 5.0,
    },
    {
      id: "2",
      name: "Ações PETR4",
      type: "Renda Variável",
      amount: 3000,
      currentValue: 3450,
      profit: 450,
      profitPercentage: 15.0,
    },
    {
      id: "3",
      name: "FII HGLG11",
      type: "Fundos Imobiliários",
      amount: 2000,
      currentValue: 2180,
      profit: 180,
      profitPercentage: 9.0,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    amount: "",
    currentValue: "",
  });

  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalValue = investments.reduce(
    (sum, inv) => sum + inv.currentValue,
    0,
  );
  const totalProfit = totalValue - totalInvested;
  const totalProfitPercentage =
    totalInvested > 0 ? (totalProfit / totalInvested) * 100 : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const amount = Number.parseFloat(formData.amount);
    const currentValue = Number.parseFloat(formData.currentValue);
    const profit = currentValue - amount;
    const profitPercentage = amount > 0 ? (profit / amount) * 100 : 0;

    const newInvestment: Investment = {
      id: Date.now().toString(),
      name: formData.name,
      type: formData.type,
      amount,
      currentValue,
      profit,
      profitPercentage,
    };

    setInvestments([...investments, newInvestment]);
    setIsModalOpen(false);
    setFormData({
      name: "",
      type: "",
      amount: "",
      currentValue: "",
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este investimento?")) {
      setInvestments(investments.filter((inv) => inv.id !== id));
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Investimentos</h1>
        <p className="text-gray-600">
          Acompanhe o crescimento do seu patrimônio
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Total Investido
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-900">
              R$ {totalInvested.toFixed(2)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <PieChart className="w-4 h-4" />
              Valor Atual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">
              R$ {totalValue.toFixed(2)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Rentabilidade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p
              className={`text-3xl font-bold ${totalProfit >= 0 ? "text-green-600" : "text-red-600"}`}
            >
              {totalProfit >= 0 ? "+" : ""}R$ {totalProfit.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {totalProfitPercentage >= 0 ? "+" : ""}
              {totalProfitPercentage.toFixed(2)}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Investments List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Meus Investimentos</CardTitle>
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Investimento
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {investments.length === 0 ? (
            <div className="text-center py-12">
              <PieChart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">
                Nenhum investimento cadastrado
              </p>
              <Button onClick={() => setIsModalOpen(true)}>
                Adicionar primeiro investimento
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {investments.map((investment) => (
                <div
                  key={investment.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {investment.name}
                      </h3>
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded">
                        {investment.type}
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Investido</p>
                        <p className="font-medium">
                          R$ {investment.amount.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Valor Atual</p>
                        <p className="font-medium">
                          R$ {investment.currentValue.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Lucro</p>
                        <p
                          className={`font-medium ${investment.profit >= 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {investment.profit >= 0 ? "+" : ""}R${" "}
                          {investment.profit.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Rentabilidade</p>
                        <p
                          className={`font-medium ${investment.profitPercentage >= 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {investment.profitPercentage >= 0 ? "+" : ""}
                          {investment.profitPercentage.toFixed(2)}%
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(investment.id)}
                    className="ml-4 p-2 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Investment Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Novo Investimento"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nome do Investimento"
            placeholder="Ex: Tesouro Selic, Ações PETR4"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <Input
            label="Tipo"
            placeholder="Ex: Renda Fixa, Renda Variável"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            required
          />

          <Input
            type="number"
            label="Valor Investido"
            placeholder="0.00"
            step="0.01"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
            required
          />

          <Input
            type="number"
            label="Valor Atual"
            placeholder="0.00"
            step="0.01"
            value={formData.currentValue}
            onChange={(e) =>
              setFormData({ ...formData, currentValue: e.target.value })
            }
            required
          />

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              Adicionar
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
