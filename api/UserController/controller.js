const userService = require("../../services/UserService");

class UserController {
  register = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const registerRes = await userService.register({ name, email, password });

      if (registerRes.error) {
        throw registerRes;
      }

      res.status(registerRes.status).send({
        message: registerRes.message,
        status: registerRes.status,
        error: registerRes.error,
      });
    } catch (error) {
      res.status(error.status ? error.status : 400).send({
        message: error.message,
        status: error.status,
        error: error.error,
      });
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
        status: loginRes.status,
        data: loginRes.data,
      });
    } catch (error) {
      res.status(error.status).send({
        message: error.message,
        status: error.status,
        error: error.error,
      });
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

      res.status(updateRes.status).send({
        message: updateRes.message,
        status: updateRes.status,
        error: updateRes.error,
      });
    } catch (error) {
      res.status(error.status ? error.status : 400).send({
        message: error.message,
        status: error.status,
        error: error.error,
      });
    }
  };

  delete = async (req, res) => {
    try {
      const id = req.params.id;
      const deleteRes = await userService.delete(id);

      if (deleteRes.error) {
        throw deleteRes;
      }

      res.status(deleteRes.status).send({
        message: deleteRes.message,
        status: deleteRes.status,
        error: deleteRes.error,
      });
    } catch (error) {
      res.status(error.status ? error.status : 400).send({
        message: error.message,
        status: error.status,
        error: error.error,
      });
    }
  };

  findById = async (req, res) => {
    try {
      const id = req.params.id;
      if (!id) {
        throw { message: "id required", status: 400 };
      }

      const findRes = await userService.findById(id);

      if (findRes.error) {
        throw findRes;
      }

      res.status(findRes.status).send({
        message: findRes.message,
        status: findRes.status,
        error: findRes.error,
        data: findRes.data,
      });
    } catch (error) {
      res.status(error.status ? error.status : 400).send({
        message: error.message,
        status: error.status,
        error: error.error,
      });
    }
  };
}

module.exports = new UserController();
