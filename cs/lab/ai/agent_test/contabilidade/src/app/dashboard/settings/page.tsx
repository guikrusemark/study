"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  User,
  Mail,
  Lock,
  Bell,
  Palette,
  Shield,
  Download,
} from "lucide-react";

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "Usuário",
    email: "usuario@email.com",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weekly: true,
    monthly: true,
  });

  const [theme, setTheme] = useState("light");

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Perfil atualizado com sucesso!");
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Senha alterada com sucesso!");
  };

  const handleExportData = () => {
    alert("Seus dados estão sendo preparados para download...");
  };

  const handleDeleteAccount = () => {
    if (
      confirm(
        "Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.",
      )
    ) {
      alert("Conta excluída com sucesso!");
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Configurações</h1>
        <p className="text-gray-600">Gerencie suas preferências e conta</p>
      </div>

      <div className="space-y-6 max-w-4xl">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Perfil
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <Input
                label="Nome Completo"
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
              />

              <Input
                type="email"
                label="Email"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
              />

              <Button type="submit">Salvar Alterações</Button>
            </form>
          </CardContent>
        </Card>

        {/* Password Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Segurança
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <Input
                type="password"
                label="Senha Atual"
                placeholder="••••••••"
              />

              <Input
                type="password"
                label="Nova Senha"
                placeholder="••••••••"
              />

              <Input
                type="password"
                label="Confirmar Nova Senha"
                placeholder="••••••••"
              />

              <Button type="submit">Alterar Senha</Button>
            </form>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notificações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <label className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Notificações por Email</p>
                  <p className="text-sm text-gray-500">
                    Receba atualizações por email
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="w-5 h-5"
                  checked={notifications.email}
                  onChange={(e) =>
                    setNotifications({
                      ...notifications,
                      email: e.target.checked,
                    })
                  }
                />
              </label>

              <label className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Notificações Push</p>
                  <p className="text-sm text-gray-500">
                    Receba notificações no navegador
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="w-5 h-5"
                  checked={notifications.push}
                  onChange={(e) =>
                    setNotifications({
                      ...notifications,
                      push: e.target.checked,
                    })
                  }
                />
              </label>

              <label className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Resumo Semanal</p>
                  <p className="text-sm text-gray-500">
                    Receba um resumo semanal das suas finanças
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="w-5 h-5"
                  checked={notifications.weekly}
                  onChange={(e) =>
                    setNotifications({
                      ...notifications,
                      weekly: e.target.checked,
                    })
                  }
                />
              </label>

              <label className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Relatório Mensal</p>
                  <p className="text-sm text-gray-500">
                    Receba um relatório completo no fim do mês
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="w-5 h-5"
                  checked={notifications.monthly}
                  onChange={(e) =>
                    setNotifications({
                      ...notifications,
                      monthly: e.target.checked,
                    })
                  }
                />
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Theme Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Aparência
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Escolha o tema da interface
              </p>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setTheme("light")}
                  className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
                    theme === "light"
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white border-2 border-gray-300 rounded-lg mx-auto mb-2" />
                    <p className="font-medium">Claro</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setTheme("dark")}
                  className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
                    theme === "dark"
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gray-800 border-2 border-gray-600 rounded-lg mx-auto mb-2" />
                    <p className="font-medium">Escuro</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setTheme("auto")}
                  className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
                    theme === "auto"
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-white to-gray-800 border-2 border-gray-400 rounded-lg mx-auto mb-2" />
                    <p className="font-medium">Automático</p>
                  </div>
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data & Privacy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Dados e Privacidade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Exportar Dados</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Baixe uma cópia de todos os seus dados
                </p>
                <Button variant="outline" onClick={handleExportData}>
                  <Download className="w-4 h-4 mr-2" />
                  Exportar Dados
                </Button>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-medium mb-2 text-red-600">
                  Zona de Perigo
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Uma vez excluída, sua conta não poderá ser recuperada
                </p>
                <Button variant="danger" onClick={handleDeleteAccount}>
                  Excluir Conta
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
