"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { UserPlus } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: "Senhas não coincidem" });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.details) {
          const errorMap: Record<string, string> = {};
          for (const issue of data.details) {
            errorMap[issue.path[0]] = issue.message;
          }
          setErrors(errorMap);
        } else {
          setErrors({ general: data.error || "Erro ao criar conta" });
        }
      } else {
        router.push("/auth/signin?registered=true");
      }
    } catch (error) {
      setErrors({ general: "Erro ao criar conta. Tente novamente." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-4xl">💰</span>
              <h1 className="text-3xl font-bold text-gray-900">ContaFácil</h1>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Crie sua conta
            </h2>
            <p className="text-gray-600">
              Comece a controlar suas finanças hoje mesmo
            </p>
          </div>

          {errors.general && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              label="Nome Completo"
              placeholder="João Silva"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              error={errors.name}
              required
            />

            <Input
              type="email"
              label="Email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              error={errors.email}
              required
            />

            <Input
              type="password"
              label="Senha"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              error={errors.password}
              required
            />

            <Input
              type="password"
              label="Confirmar Senha"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              error={errors.confirmPassword}
              required
            />

            <div className="text-xs text-gray-600">
              Ao criar uma conta, você concorda com nossos{" "}
              <Link href="#" className="text-blue-600 hover:text-blue-700">
                Termos de Uso
              </Link>{" "}
              e{" "}
              <Link href="#" className="text-blue-600 hover:text-blue-700">
                Política de Privacidade
              </Link>
              .
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              isLoading={isLoading}
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Criar Conta
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Já tem uma conta?{" "}
            <Link
              href="/auth/signin"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Fazer login
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm">
            ← Voltar para página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}
