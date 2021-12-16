import express, { NextFunction } from "express";
const connectionRouter = express.Router();
import User from "../data/userSchema";
import { UserItem, RequestsUserItem } from "../Types/backendTypes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const twofactor = require("node-2fa");
require("dotenv").config();

const validateUserExist = async (
  req: express.Request,
  res: express.Response,
  next: Function
) => {
  if (await User.find({ email: req.body.email })) {
    next();
  } else {
    res.status(403).json({ error: "Please Sign Up" });
  }
};

const ganerateNewSecret = (username: String) => {
  const newSecret = twofactor.generateSecret({
    name: "2FA App",
    account: `My Username: ${username}`,
  });
  return newSecret;
};

connectionRouter.get("/", async (_req, res) => {
  try {
    const allUsers: UserItem[] = await User.find({});
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

connectionRouter.post("/signup", async (_req, res) => {
  try {
    const hashedPassword: string = await bcrypt.hash(_req.body.password, 10);
    const userObj = new User({
      username: _req.body.username,
      email: _req.body.email,
      passwordHash: hashedPassword,
      twoFactorAuth: false,
      secret: "inital key",
    });
    const savedUser = await userObj.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res
      .status(403)
      .json({ error: "info is not suitable for our requirements" });
  }
});

connectionRouter.post("/login", validateUserExist, async (_req, res) => {
  try {
    const currentUser = await User.findOne({ email: _req.body.email });
    const passwordValidate = await bcrypt.compare(
      _req.body.password,
      currentUser.passwordHash
    );
    if (passwordValidate) {
      const accessToken = jwt.sign(
        { email: _req.body.email, username: currentUser.username },
        process.env.SECRET!,
        {
          expiresIn: "10m",
        }
      );
      if (currentUser.twoFactorAuth) {
        const returnUserJson: RequestsUserItem = {
          username: currentUser.username,
          twoFactorAuth: currentUser.twoFactorAuth,
          token: accessToken,
          qr: currentUser.qr,
        };
        res.status(200).json(returnUserJson);
      } else {
        res.status(200).json({
          username: currentUser.username,
          twoFactorAuth: currentUser.twoFactorAuth,
          token: accessToken,
        });
      }
    } else {
      res.status(403).json({ message: "wrong Password" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

connectionRouter.patch("/two-factor-auth/:username", async (_req, res) => {
  try {
    const currentUser = await User.findOneAndUpdate(
      { username: _req.params.username },
      [{ $set: { twoFactorAuth: { $not: "$twoFactorAuth" } } }]
    );
    if (!currentUser.twoFactorAuth === true) {
      const { secret, uri, qr } = ganerateNewSecret(currentUser.username);
      await User.update(
        { _id: currentUser["_id"] },
        { $set: { secret: secret } }
      );
      await User.update({ _id: currentUser["_id"] }, { $set: { qr: qr } });
    }
    res.status(200).json({
      message: "success twoFactorAuth: " + !currentUser.twoFactorAuth,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

connectionRouter.post("/authenticate", async (_req, res) => {
  try {
    const currentUser = await User.findOne({ username: _req.body.username });
    const { delta } = twofactor.verifyToken(currentUser.secret, _req.body.code);
    if (delta === 0) {
      res.status(200).json({ message: "success" });
    } else {
      res.status(400).json({ message: "wrong Number" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

connectionRouter.post("/reset", async (_req, res) => {
  await User.deleteMany({});
  res.status(204).end();
});

connectionRouter.post("/verify", async (_req, res) => {
  try {
    const verifiedUser = jwt.verify(_req.body.token, process.env.SECRET!);
    res.status(200).json(verifiedUser);
  } catch (err) {
    res.status(403).json({ message: "invalid token" });
  }
});

export default connectionRouter;
