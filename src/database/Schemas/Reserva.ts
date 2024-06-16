import mongoose, { Schema, Document } from 'mongoose';

interface IReserva extends Document {
  user: mongoose.Types.ObjectId;
  car: mongoose.Types.ObjectId;
  startDate: Date;
  endDate: Date;
  status: string;
}

const Reserva = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  car: {
    type: mongoose.Types.ObjectId,
    ref: 'Car',
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'canceled'],
    default: 'pending'
  }
}, {
  timestamps: true
});


const ReservaController = mongoose.model<IReserva>('Reservation', Reserva);
export default ReservaController;
