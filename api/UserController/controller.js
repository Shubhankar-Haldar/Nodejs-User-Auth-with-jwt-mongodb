const userService = require("../../services/UserService");

class UserController {
  register = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const registerRes = await userService.register({ name, email, password });

      if (registerRes.error) {
        throw registerRes;
      }

      res
        .status(registerRes.status)
        .send({ message: registerRes.message, error: registerRes.error });
    } catch (error) {
      res
        .status(error.status ? error.status : 400)
        .send({ message: error.message, error: error.error });
    }
  };

  login = async (req, res) => {
    try {
      const { email, password } = req.body;

      const loginRes = await userService.login({ email, password });

      if (loginRes.error) {
        throw loginRes;
      }

      res.status(loginRes.status).send({
        message: loginRes.message,
        error: loginRes.error,
        data: loginRes.data,
      });
    } catch (error) {
      res
        .status(error.status)
        .send({ message: error.message, error: error.error });
    }
  };

  update = async (req, res) => {
    try {
      const id = req.params.id;
      const { password, name } = req.body;
      const updateRes = await userService.update({ id, password, name });

      if (!updateRes.error) {
        throw updateRes;
      }

      res
        .status(updateRes.status)
        .send({ message: updateRes.message, error: updateRes.error });
    } catch (error) {
      res
        .status(error.status ? error.status : 400)
        .send({ message: error.message, error: error.error });
    }
  };
}

module.exports = new UserController();
