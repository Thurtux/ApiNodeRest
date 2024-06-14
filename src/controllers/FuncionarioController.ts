import { Request, Response } from "express";
import Funcionario from '../database/Schemas/Funcionario'

class FuncionarioController {

    async create(request: Request, response: Response) {
        const { name, email, cargo, salario} = request.body;
    
        try {
          const FuncionarioExists = await Funcionario.findOne({ email });
    
          if (FuncionarioExists) {
            return response.status(400).json({
              error: "oops",
              message: "Funcionario already exist",
            });
          }
    
          const funcionario = await Funcionario.create({
            name,
            email,
            cargo, 
            salario
          });
    
          return response.json(funcionario);
        } catch (error: any) {
          return response.status(500).send({
            error: "Nao foi possivel criar funcionario",
            message: error.message, // Use error.message para mostrar a mensagem de erro
          });
        }
      } 

      async delete(request: Request, response: Response) {
        const id = request.params._id;
        try {
          const funcionario = await Funcionario.findById(id);
          if (!funcionario) {
            return response.status(400).json({
              error: "Funcionário não encontrado",
            });
          } else {
            await Funcionario.deleteOne({ id });
      
            return response.json({
              message: "Funcionário deletado com sucesso",
            });
          }
        } catch (error: any) {
          return response.status(500).json({
            error: "Erro na deleção",
            message: error.message, // Use error.message para mostrar a mensagem de erro
          });
        }
      }

      async find(request: Request, response: Response) {
        try {
          const funcionarios = await Funcionario.find();
          return response.json(funcionarios);
        } catch (error: any) {
          return response.status(500).json({
            error: "Busca não realizada",
            message: error.message, // Use error.message para mostrar a mensagem de erro
          });
        }
      }
}

export default new FuncionarioController();
