const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const userSchema = require("../schemas/userSchema");
const bcrypt = require("bcryptjs");
const {
  createTable,
  checkRecordExists,
  insertRecord,
} = require("../utils/sqlFunctions");
const profileSchema = require("../schemas/profileSchema");

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const register = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res
      .status(400)
      .json({ error: "Los campos de correo electrónico o contraseña no pueden estar vacíos!" });
    return;
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = {
    userId: uuidv4(),
    email,
    password: hashedPassword,
  };

  const profile = {
    profileId: uuidv4(),
    userId: user.userId,
    email: user.email,
  };

  try {
    await createTable(userSchema);
    await createTable(profileSchema);

    const userAlreadyExists = await checkRecordExists("users", "email", email);
    if (userAlreadyExists) {
      res.status(409).json({ error: "El correo electrónico ya existe" });
    } else {
      await insertRecord("users", user);
      await insertRecord("profiles", profile);

      res.status(201).json({ message: "Usuario creada con éxito!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res
      .status(400)
      .json({ error: "Los campos de correo electrónico o contraseña no pueden estar vacíos!" });
    return;
  }

  try {
    const existingUser = await checkRecordExists("users", "email", email);

    if (existingUser) {
      if (!existingUser.password) {
        res.status(401).json({ error: "Datos Invalidos" });
        return;
      }

      const passwordMatch = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (passwordMatch) {
        res.status(200).json({
          userId: existingUser.userId,
          email: existingUser.email,
          access_token: generateAccessToken(existingUser.userId),
        });
      } else {
        res.status(401).json({ error: "Datos Invalidos"  });
      }
    } else {
      res.status(401).json({ error: "Datos Invalidos"  });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
};
