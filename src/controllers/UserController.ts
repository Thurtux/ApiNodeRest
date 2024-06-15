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
    const { name, email, password, cpf, logradouro, bairro, localidade, uf } = request.body;

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
        password,
        cpf,
        logradouro, 
        bairro,
        localidade,
        uf // Salvar a senha hashada
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
  
      console.log(user)
      console.log(id)

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
    const { name, email, password, cpf, logradouro, bairro, localidade, uf } = request.body;
  
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
      if (password) user.password = await bcrypt.hash(password, 10); // Hash da nova senha
      if (cpf) user.cpf = cpf;
      if (logradouro) user.logradouro = logradouro;
      if (bairro) user.bairro = bairro;
      if (localidade) user.localidade = localidade;
      if (uf) user.uf = uf;
  
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
    const { _id, email, password } = request.body;

    try {
      const user = await User.findOne({ email });
      console.log(user);

      if (!user) {
        return response.status(400).json({
          error: "oops",
          message: "User does not exist",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      const match = bcrypt.compareSync(password, user.password)
       
      console.log(match)
      console.log(password);
      console.log(user.password);
      console.log(isMatch);

      if (!isMatch) {
        return response.status(400).json({
          error: "oops",
          message: "Incorrect password",
          
        });
      }

      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      console.log("User password:", user.password);
      console.log("Input password:", password);

      return response.json({
        message: "Login successful",
        token,
        _id: user._id
      });
    } catch (error: any) {
      console.error("Login error:", error); // Adicione este log para depuração
      return response.status(500).json({
        error: "Nao foi possivel fazer login",
        message: error.message, // Use error.message para mostrar a mensagem de erro
      });
    }
  }
}

export default new UserController();
