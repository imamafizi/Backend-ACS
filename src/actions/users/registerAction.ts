import { registerRepo } from "../../Repositories/users/registerRepo";
import { getUsersRepo } from "../../Repositories/users/getUsersRepo";
import { IUser } from "../../type/type";
import { hashPassword } from "../../helper/bcrypt";

export const registerAction = async (body: IUser) => {
  try {
    const { email, username, password } = body;
    const users = await getUsersRepo(username, email);
    if (users.length) {
      return {
        status: 400,
        message: "email or user already axist!!",
      };
    }

    // const register = await registerRepo(body);

    const register = await hashPassword(password);
    body.password = register;
    await registerRepo(body);

    return {
      status: 200,
      message: "register success",
      data: register,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
