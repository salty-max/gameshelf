import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import { User } from '../models/user.model';
import { registerValidation } from '../validations/auth.validation';

export class AuthService {
  public async register(req: Request, res: Response) {
    const { error } = registerValidation(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message })
    }

    const isEmailExist = await User.findOne({ email: req.body.email });

    if (isEmailExist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password, // hashed password
    });

    try {
      const user = await newUser.save();
      if (user) {
        res
          .status(201)
          .json({ message: 'Saved user', data: { userId: newUser._id } });
        console.log('✅ REGISTERED USER');
      }
    } catch(err) {
      console.log('❌ ERROR REGISTERING USER');
      console.error(err.message);
      res
        .status(500)
        .json({ message: 'Failed to register user' });
    }
  }
}