"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { BarChart3, TrendingUp, PieChart, Calendar } from "lucide-react";
import { format, subMonths, startOfMonth, endOfMonth } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Transaction {
  _id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
}

interface CategoryTotal {
  category: string;
  total: number;
  percentage: number;
}

export default function ReportsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryTotal[]>([]);
  const [monthlyData, setMonthlyData] = useState<
    Array<{ month: string; income: number; expense: number }>
  >([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/transactions");
      const data = await response.json();

      if (response.ok && data.transactions) {
        setTransactions(data.transactions);
        processReportData(data.transactions);
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  const processReportData = (txs: Transaction[]) => {
    // Process by category
    const expensesByCategory: Record<string, number> = {};
    let totalExpenses = 0;

    for (const tx of txs.filter((t) => t.type === "expense")) {
      expensesByCategory[tx.category] =
        (expensesByCategory[tx.category] || 0) + tx.amount;
      totalExpenses += tx.amount;
    }

    const categoryTotals: CategoryTotal[] = Object.entries(expensesByCategory)
      .map(([category, total]) => ({
        category,
        total,
        percentage: (total / totalExpenses) * 100,
      }))
      .sort((a, b) => b.total - a.total);

    setCategoryData(categoryTotals);

    // Process by month (last 6 months)
    const months: Array<{ month: string; income: number; expense: number }> =
      [];

    for (let i = 5; i >= 0; i--) {
      const date = subMonths(new Date(), i);
      const monthStart = startOfMonth(date);
      const monthEnd = endOfMonth(date);

      const monthTxs = txs.filter((tx) => {
        const txDate = new Date(tx.date);
        return txDate >= monthStart && txDate <= monthEnd;
      });

      const income = monthTxs
        .filter((tx) => tx.type === "income")
        .reduce((sum, tx) => sum + tx.amount, 0);

      const expense = monthTxs
        .filter((tx) => tx.type === "expense")
        .reduce((sum, tx) => sum + tx.amount, 0);

      months.push({
        month: format(date, "MMM", { locale: ptBR }),
        income,
        expense,
      });
    }

    setMonthlyData(months);
  };

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Relatórios</h1>
        <p className="text-gray-600">Análise detalhada das suas finanças</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Total de Receitas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-green-600">
                R$ {totalIncome.toFixed(2)}
              </p>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Total de Despesas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-red-600">
                R$ {totalExpense.toFixed(2)}
              </p>
              <TrendingUp className="w-8 h-8 text-red-600 rotate-180" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Saldo Líquido
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p
                className={`text-2xl font-bold ${totalIncome - totalExpense >= 0 ? "text-blue-600" : "text-red-600"}`}
              >
                R$ {(totalIncome - totalExpense).toFixed(2)}
              </p>
              <BarChart3 className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Comparison */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <CardTitle>Comparativo Mensal (Últimos 6 Meses)</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyData.map((month) => (
              <div key={month.month} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium capitalize">{month.month}</span>
                  <span className="text-gray-600">
                    Receitas: R$ {month.income.toFixed(2)} | Despesas: R${" "}
                    {month.expense.toFixed(2)}
                  </span>
                </div>
                <div className="flex gap-2 h-8">
                  <div
                    className="bg-green-500 rounded flex items-center justify-center text-white text-xs font-medium"
                    style={{
                      width: `${Math.max((month.income / monthlyData.reduce((max, m) => Math.max(max, m.income, m.expense), 0)) * 100, 5)}%`,
                    }}
                  >
                    {month.income > 0 && `R$ ${month.income.toFixed(0)}`}
                  </div>
                  <div
                    className="bg-red-500 rounded flex items-center justify-center text-white text-xs font-medium"
                    style={{
                      width: `${Math.max((month.expense / monthlyData.reduce((max, m) => Math.max(max, m.income, m.expense), 0)) * 100, 5)}%`,
                    }}
                  >
                    {month.expense > 0 && `R$ ${month.expense.toFixed(0)}`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Expenses by Category */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <PieChart className="w-5 h-5" />
            <CardTitle>Despesas por Categoria</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {categoryData.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              Nenhuma despesa registrada ainda
            </p>
          ) : (
            <div className="space-y-4">
              {categoryData.map((cat) => (
                <div key={cat.category} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium capitalize">
                      {cat.category}
                    </span>
                    <span className="text-gray-600">
                      R$ {cat.total.toFixed(2)} ({cat.percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${cat.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
