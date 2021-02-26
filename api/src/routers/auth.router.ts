import { Request, Response, Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { User } from '../models/user.model';
import { loginValidation, registerValidation } from '../validations/auth.validation';

const AuthRouter = Router();

AuthRouter.post("/register", async (req: Request, res: Response) => {
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
});

AuthRouter.post('/login', async (req: Request, res: Response) => {
  const { error } = loginValidation(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).json({ message: "Email not found" });
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) {
    return res.status(400).json({ message: "Password is wrong" });
  }

  let token;

  if (process.env.TOKEN_SECRET) {
    token = jwt.sign(
      {
        username: user.username,
        id: user._id
      },
      process.env.TOKEN_SECRET
    );
  } else {
    throw new Error("Jwt secret not set");
  }

  res
    .header("auth-token", token)
    .status(200)
    console.log('✅ LOGGED USER');
});

export default AuthRouter;