const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

class JwtValidation {
  generateToken = (id) => {
    try {
      // id validation
      if (!id) {
        throw { message: "Id required to create token", status: 400 };
      }

      const token = jwt.sign({ id }, SECRET, { expiresIn: "10h" });
      if (!token) {
        throw { message: "Token  not generated", status: 400 };
      }

      return {
        message: "Token  generate successfully",
        status: 201,
        error: false,
        data: token,
      };
    } catch (error) {
      return {
        message: error.message,
        status: error.status ? error.status : 400,
        error: true,
      };
    }
  };

  verifyToken = (req, res, next) => {
    try {
      const token = req.headers["authorization"];
      const data = jwt.verify(token, SECRET);
      req.id = data.id;
      next();
    } catch (error) {
      res.status(400).send({
        message: "Failed to verify Token",
        status: 400,
        error: true,
      });
    }
  };
}

module.exports = new JwtValidation();
