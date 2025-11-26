import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Senha", type: "password" }
      },
      async authorize(credentials) {
        await dbConnect();
        
        // 1. Buscar usuário
        // O .select("+password") força o retorno do campo oculto
        const user = await User.findOne({ email: credentials?.email }).select("+password");
        if (!user) throw new Error("Usuário não encontrado");

        // 2. Verificar senha
        const isValid = await bcrypt.compare(credentials!.password, user.password);
        if (!isValid) throw new Error("Senha incorreta");

        // 3. Retornar usuário para sessão
        return { id: user._id.toString(), email: user.email, name: user.name };
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.sub; // Adiciona ID na sessão
      }
      return session;
    }
  }
};
