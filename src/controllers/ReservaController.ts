import { Request, Response } from "express";
import Reserva from "../database/Schemas/Reserva";
import Car from "../database/Schemas/Car";
import User from "../database/Schemas/User";


class ReservaController {
  async create(request: Request, response: Response) {
    const { userId, carId, startDate, endDate, status } = request.body;

    console.log('carId recebido:', carId); 

    try {
      
      const car = await Car.findById(carId);
      if (!car) {
        return response.status(404).json({ error: 'Car is not found' });
      }

      const user = await User.findById(userId);
      if (!user) {
        return response.status(404).json({ error: 'User is not found' });
      }

      const reserva = new Reserva({
        user: user._id,
        car: car._id,
        startDate,
        endDate,
        status: status || 'pending'
      });

      await reserva.save();

      return response.status(201).json({
        _id: reserva._id,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          cpf: user.cpf
        },
        car: {
          mark: car.mark,
          model: car.model,
          plate: car.plate
        },
        startDate: reserva.startDate,
        endDate: reserva.endDate,
      });
    } catch (error: any) {
      console.error('Erro ao criar reserva:', error);
      return response.status(500).send({
        error: 'Não foi possível criar a reserva',
        message: error.message
      });
    }
  }

  async find(request: Request, response: Response) {
    try {
      const reservas = await Reserva.find()
        .populate('user', 'name email cpf')
        .populate('car', 'mark model plate');

      return response.status(200).json(reservas);
    } catch (error: any) {
      console.error('Erro ao buscar reservas:', error);
      return response.status(500).send({
        error: 'Não foi possível buscar as reservas',
        message: error.message
      });
    }
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const reserva = await Reserva.findByIdAndDelete(id);

      if (!reserva) {
        return response.status(404).json({ error: 'Reserva not found' });
      }

      return response.status(200).json({ message: 'Reserva deleted successfully' });
    } catch (error: any) {
      console.error('Erro ao deletar reserva:', error);
      return response.status(500).send({
        error: 'Não foi possível deletar a reserva',
        message: error.message
      });
    }
  }


  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { userId, carId, startDate, endDate, status } = request.body;

    try {
      const reserva = await Reserva.findById(id);
      if (!reserva) {
        return response.status(404).json({ error: 'Reserva not found' });
      }

      if (userId) {
        const user = await User.findById(userId);
        if (!user) {
          return response.status(404).json({ error: 'User is not found' });
        }
        reserva.user = user._id;
      }

      if (carId) {
        const car = await Car.findById(carId);
        if (!car) {
          return response.status(404).json({ error: 'Car is not found' });
        }
        reserva.car = car._id;
      }

      if (startDate) reserva.startDate = startDate;
      if (endDate) reserva.endDate = endDate;
      if (status) reserva.status = status;

      await reserva.save();

      const updatedReserva = await Reserva.findById(id)
        .populate('user', 'name email cpf')
        .populate('car', 'mark model plate');

      return response.status(200).json(updatedReserva);
    } catch (error: any) {
      console.error('Erro ao atualizar reserva:', error);
      return response.status(500).send({
        error: 'Não foi possível atualizar a reserva',
        message: error.message
      });
    }
  }

}


export default new ReservaController();
