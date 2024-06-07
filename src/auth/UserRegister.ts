// src/routes/auth.ts
import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../database/Schemas/User';


/*Nova instancia do router */
const router = Router();

/*Metodo Registro*/
router.post('/register', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'Usuário já existe' });
    }

    user = new User({ email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.status(201).json({ msg: 'Usuário registrado com sucesso' });
  } catch (err) {
    
    res.status(500).send('Erro no servidor');
  }
});



/*Metodo Login*/
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Credenciais inválidas' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciais inválidas' });
    }

    const payload = { userId: user.id };
    const token = jwt.sign(payload, 'YourJwt', { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    
    res.status(500).send('Erro no servidor');
  }
});

export default router;
