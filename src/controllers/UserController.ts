import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../database/Schemas/User";

dotenv.config();

class UserController {
  async find(request: Request, response: Response) {
    try {
      const users = await User.find();
      return response.json(users);
    } catch (error: any) {
      return response.status(500).send({
        error: "search not performed",
        message: error.message, // Use error.message para mostrar a mensagem de erro
      });
    }
  }

  async create(request: Request, response: Response) {
    const {
      name,
      email,
      password,
      cpf,
      logradouro,
      bairro,
      localidade,
      uf,
      cep,
      telefone,
      data_nascimento,
      num,
    } = request.body;

    try {
      const userExists = await User.findOne({ email });

      if (userExists) {
        return response.status(400).json({
          error: "oops",
          message: "user already exist",
        });
      }

      const user = await User.create({
        name,
        email,
        password, // Salvar a senha hashada
        cpf,
        logradouro,
        bairro,
        localidade,
        uf,
        cep,
        telefone,
        data_nascimento,
        num,
      });

      return response.json(user);
    } catch (error: any) {
      return response.status(500).send({
        error: "Nao foi possivel criar usuario",
        message: error.message, // Use error.message para mostrar a mensagem de erro
      });
    }
  }

  async delete(request: Request, response: Response) {
    const id = request.params.id;
    try {
      const user = await User.findById(id);

      console.log(user);
      console.log(id);

      if (!user) {
        return response.status(400).json({
          error: "User does not exist",
        });
      } else {
        await User.findByIdAndDelete(id);

        return response.json({
          message: "User deleted successfully",
        });
      }
    } catch (error: any) {
      return response.status(500).json({
        error: "Deletion error",
        message: error.message,
      });
    }
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const {
      name,
      email,
      password,
      cpf,
      logradouro,
      bairro,
      localidade,
      uf,
      cep,
      telefone,
      data_nascimento,
      num,
    } = request.body;

    try {
      const user = await User.findById(id);

      if (!user) {
        return response.status(404).json({
          error: "Not Found",
          message: "User not found",
        });
      }

      if (name) user.name = name;
      if (email) user.email = email;
      if (password) user.password = password;
      if (cpf) user.cpf = cpf;
      if (logradouro) user.logradouro = logradouro;
      if (bairro) user.bairro = bairro;
      if (localidade) user.localidade = localidade;
      if (uf) user.uf = uf;
      // if (cep) user.cep = cep;
      // if (telefone) user.telefone = telefone;
      // if (data_nascimento) user.data_nascimento = data_nascimento;
      // if (num) user.num = num;

      await user.save();

      return response.json(user);
    } catch (error: any) {
      return response.status(500).send({
        error: "Nao foi possivel atualizar usuario",
        message: error.message,
      });
    }
  }

  async login(request: Request, response: Response) {
    const { email, password } = request.body;
  
    try {
      console.log("Login request received for email:", email);

      const user = await User.findOne({email})
  
      if (!user) {
        console.log("User not found:", email);
        return response.status(400).json({
          error: "oops",
          message: "User does not exist",
        });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        console.log("Password does not match for user:", email);
        return response.status(400).json({
          error: "oops",
          message: "Incorrect password",
        });
      }

      // // Verifique se as variáveis de ambiente estão definidas (opcional, dependendo da sua estratégia)
      // if (!process.env.JWT_SECRET) {
      //   throw new Error("JWT_SECRET is not defined in environment variables");
      // }
  
      // Gerar um token JWT
      const token = jwt.sign({ userId: email }, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      console.log('Segredo', process.env.JWT_SECRET)
  
      console.log("User password (hashed):", user.password);
      console.log("Input password:", password);
      console.log("Password match:", passwordMatch);
      console.log("Generated token:", token);
  
      return response.json({
        message: "Login successful",
        token,
      });
    } catch (error: any) {
      console.error("Login error:", error);
      return response.status(500).json({
        error: "Não foi possível fazer login",
        message: error.message,
      });
    }
  }
}

export default new UserController();
