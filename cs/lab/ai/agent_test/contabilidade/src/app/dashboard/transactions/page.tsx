"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import {
  Search,
  Filter,
  Download,
  ArrowUpCircle,
  ArrowDownCircle,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Transaction {
  _id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    filterTransactions();
  }, [transactions, searchTerm, filterType, filterCategory]);

  const fetchTransactions = async () => {
    try {
      const response = await fetch("/api/transactions");
      const data = await response.json();

      if (response.ok && data.transactions) {
        setTransactions(data.transactions);
      }
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
    }
  };

  const filterTransactions = () => {
    let filtered = [...transactions];

    if (searchTerm) {
      filtered = filtered.filter(
        (tx) =>
          tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tx.category.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (filterType !== "all") {
      filtered = filtered.filter((tx) => tx.type === filterType);
    }

    if (filterCategory !== "all") {
      filtered = filtered.filter((tx) => tx.category === filterCategory);
    }

    setFilteredTransactions(filtered);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta transação?")) return;

    try {
      const response = await fetch(`/api/transactions/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchTransactions();
      }
    } catch (error) {
      console.error("Erro ao excluir transação:", error);
    }
  };

  const exportToCSV = () => {
    const headers = ["Data", "Descrição", "Categoria", "Tipo", "Valor"];
    const rows = filteredTransactions.map((tx) => [
      format(new Date(tx.date), "dd/MM/yyyy"),
      tx.description,
      tx.category,
      tx.type === "income" ? "Receita" : "Despesa",
      tx.amount.toFixed(2),
    ]);

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `transacoes-${format(new Date(), "yyyy-MM-dd")}.csv`;
    link.click();
  };

  const categories = Array.from(new Set(transactions.map((tx) => tx.category)));
  const totalIncome = filteredTransactions
    .filter((tx) => tx.type === "income")
    .reduce((sum, tx) => sum + tx.amount, 0);
  const totalExpense = filteredTransactions
    .filter((tx) => tx.type === "expense")
    .reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Transações</h1>
        <p className="text-gray-600">
          Visualize e gerencie todas as suas transações
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  Total de Transações
                </p>
                <p className="text-2xl font-bold">
                  {filteredTransactions.length}
                </p>
              </div>
              <Filter className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Receitas</p>
                <p className="text-2xl font-bold text-green-600">
                  R$ {totalIncome.toFixed(2)}
                </p>
              </div>
              <ArrowUpCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Despesas</p>
                <p className="text-2xl font-bold text-red-600">
                  R$ {totalExpense.toFixed(2)}
                </p>
              </div>
              <ArrowDownCircle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Buscar transações..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select
              options={[
                { value: "all", label: "Todos os tipos" },
                { value: "income", label: "Receitas" },
                { value: "expense", label: "Despesas" },
              ]}
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            />

            <Select
              options={[
                { value: "all", label: "Todas as categorias" },
                ...categories.map((cat) => ({ value: cat, label: cat })),
              ]}
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            />
          </div>

          <div className="mt-4 flex justify-end">
            <Button
              variant="outline"
              onClick={exportToCSV}
              disabled={filteredTransactions.length === 0}
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Lista de Transações ({filteredTransactions.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">
                Nenhuma transação encontrada com os filtros aplicados
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredTransactions.map((transaction) => (
                <div
                  key={transaction._id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div
                      className={`p-2 rounded-full ${
                        transaction.type === "income"
                          ? "bg-green-100"
                          : "bg-red-100"
                      }`}
                    >
                      {transaction.type === "income" ? (
                        <ArrowUpCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <ArrowDownCircle className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <div className="flex-1 grid grid-cols-4 gap-4">
                      <div>
                        <p className="font-medium text-gray-900">
                          {transaction.description}
                        </p>
                        <p className="text-sm text-gray-500">
                          {transaction.category}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Data</p>
                        <p className="font-medium">
                          {format(new Date(transaction.date), "dd MMM yyyy", {
                            locale: ptBR,
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Tipo</p>
                        <p className="font-medium">
                          {transaction.type === "income"
                            ? "Receita"
                            : "Despesa"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Valor</p>
                        <p
                          className={`text-lg font-semibold ${
                            transaction.type === "income"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {transaction.type === "income" ? "+" : "-"} R${" "}
                          {transaction.amount.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(transaction._id)}
                    className="ml-4 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
