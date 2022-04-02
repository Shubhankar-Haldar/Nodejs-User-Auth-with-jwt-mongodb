const userModel = require("../model/Userschema");
const bcrypt = require("bcrypt");
const jwtvalidation = require("../middleware/jwt");

class UserService {
  register = async ({ name, email, password }) => {
    try {
      // name validtion
      if (!name) {
        throw { message: "name is required", status: 400 };
      }

      //   email validation
      if (!email) {
        throw { message: "email id required", status: 400 };
      }

      let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!email.match(mailformat)) {
        throw { message: "invlid email format", status: 400 };
      }

      //   password
      if (!password) {
        throw { message: "password required", status: 400 };
      }

      if (password.length < 8) {
        throw { message: "Password atleast 8 charcter long", status: 400 };
      }

      let passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      if (!password.match(passw)) {
        throw { message: "invalid password format", status: 400 };
      }

      const bcryptPass = await bcrypt.hash(password, 10);

      //   if email already exist
      const isEmail = await userModel.find({ email });
      if (isEmail.length) {
        throw { message: "email id already exist", status: 400 };
      }

      await userModel.create({
        name,
        email,
        password: bcryptPass,
      });

      return {
        message: "User register successfully..",
        status: 201,
        error: false,
      };
    } catch (error) {
      return {
        message: error.message,
        status: error.status ? error.status : 400,
        error: true,
      };
    }
  };

  login = async ({ email, password }) => {
    try {
      // email validation
      if (!email) {
        throw { message: "email id required", status: 400 };
      }

      // password validation
      if (!password) {
        throw { message: "password required ", status: 400 };
      }

      const isUser = await userModel.find({ email });
      if (!isUser.length) {
        throw { message: "email id not register", status: 400 };
      }

      const validPass = await bcrypt.compare(password, isUser[0].password);

      if (!validPass) {
        throw { message: "Invalid password", status: 400 };
      }

      const token = jwtvalidation.generateToken(isUser[0].id);
      if (token.error) {
        throw token;
      }

      return {
        message: "Login successfully",
        status: 200,
        error: false,
        data: { token: token.data },
      };
    } catch (error) {
      return {
        message: error.message,
        status: error.status ? error.status : 400,
        error: true,
      };
    }
  };

  update = async ({ id, password, name }) => {
    try {
      if (!password && !name) {
        throw { message: "Data required to update user", status: 400 };
      }

      const updateUser = await userModel
        .findByIdAndUpdate({ _id: id }, { name, password })
        .catch(() => {
          throw { message: "Invalid userId", status: 400 };
        });

      if (!updateUser) {
        throw { message: "user not exist", status: 400 };
      }

      return {
        message: "User update successfully",
        status: 200,
        error: false,
      };
    } catch (error) {
      return {
        message: error.message,
        status: error.status ? error.status : 400,
        error: true,
      };
    }
  };
}

module.exports = new UserService();
