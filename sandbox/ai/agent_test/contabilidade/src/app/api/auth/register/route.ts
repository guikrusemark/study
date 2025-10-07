import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/lib/models/User";
import { userRegistrationSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validation = userRegistrationSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Dados inválidos", details: validation.error.errors },
        { status: 400 },
      );
    }

    await connectDB();

    const existingUser = await User.findOne({ email: validation.data.email });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email já cadastrado" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(validation.data.password, 10);

    const user = await User.create({
      name: validation.data.name,
      email: validation.data.email,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        message: "Usuário criado com sucesso",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Erro ao criar usuário" },
      { status: 500 },
    );
  }
}
