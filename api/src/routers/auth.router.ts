import { Request, Response, Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { User } from '../models/user.model';
import { loginValidation, registerValidation } from '../validations/auth.validation';
import { verifyToken } from '../validations/token.validation';

const AuthRouter = Router();

/**
 * @route GET /api/auth
 * @desc Get logged in user
 * @access Private
 */
AuthRouter.get('/', verifyToken, async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user.id).select('-password -games');

    if (user) {
      res
        .status(200)
        .json({ message: 'Got user', user });
      console.log('✅ GOT USER');
    }
  } catch(err) {
    console.log('❌ ERROR GETTING USER');
    console.error(err.message);
    res
      .status(500)
      .json({ message: 'Failed to get user' });
  }
})

/**
 * @route POST /api/auth/register
 * @desc Register user
 * @access Public
 */
AuthRouter.post("/register", async (req: Request, res: Response) => {
  const { error } = registerValidation(req.body);

  if (error) {
    return res.status(400).json({ errors: error.details.map(e => ({ 
      field: e.context?.key,
      message: e.message
    })) });
  }

  try {
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

    const user = await newUser.save();

    const payload = {
      user: {
        id: user._id
      }
    }

    jwt.sign(
      payload,
      process.env.TOKEN_SECRET || "",
      {
        expiresIn: 360000
      },
      (err, token) => {
        if (err) throw err;
        res
          .status(200)
          .json({ message: "Registered user", token });
        console.log('✅ REGISTERED USER');
      }
    )
  } catch(err) {
    console.log('❌ ERROR REGISTERING USER');
    console.error(err.message);
    res
      .status(500)
      .json({ message: 'Failed to register user' });
  }
});

/**
 * @route POST /api/auth/login
 * @desc Log in user
 * @access Public
 */
AuthRouter.post('/login', async (req: Request, res: Response) => {
  const { error } = loginValidation(req.body);

  if (error) {
    return res.status(400).json({ errors: error.details.map(e => ({ 
      field: e.context?.key,
      message: e.message
    })) });
  }

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).json({ message: "Email not found" });
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) {
    return res.status(400).json({ message: "Password is wrong" });
  }

  const payload = {
    user: {
      id: user._id
    }
  }

  jwt.sign(
    payload,
    process.env.TOKEN_SECRET || "",
    {
      expiresIn: 360000
    },
    (err, token) => {
      if (err) throw err;
      res
        .status(200)
        .json({ message: "Logged in user", token });
      console.log('✅ LOGGED USER');
    }
  );
    
});

export default AuthRouter;