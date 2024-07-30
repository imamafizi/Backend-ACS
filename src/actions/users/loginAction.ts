import { getEmailRepo } from "../../Repositories/users/getEmailRepo";
import { getPasswordRepo } from "../../Repositories/users/getPasswordRepo";
import { getUsernameRepo } from "../../Repositories/users/getUsernameRepo";
import { comparePassword } from "../../helper/bcrypt";
import { excludeFields } from "../../helper/excludeFields";
import { createToken } from "../../helper/jwt";

export const loginAction = async (
  usernameOrEmail: string,
  password: string
) => {
  try {
    let user;
    if (usernameOrEmail.includes("@")) {
      const userByEmail = await getEmailRepo(usernameOrEmail);

      if (userByEmail.length === 0) {
        return {
          status: 400,
          message: "Account not Found",
        };
      }

      user = userByEmail[0];
    } else {
      const userByUsername = await getUsernameRepo(usernameOrEmail);

      if (userByUsername.length === 0) {
        return {
          status: 400,
          message: "Account Not Found",
        };
      }

      user = userByUsername[0];
    }

    if (user.isDeleted) {
      return {
        status: 400,
        message: "Account deleted",
      };
    }

    const matchesPassword = await comparePassword(password, user.password);

    if (!matchesPassword) {
      return {
        status: 400,
        message: "Wrong Password",
      };
    }

    const dataWtihoutPassword = excludeFields(user, ["password"]);

    const token = createToken({ id: user.id });

    return {
      status: 200,
      message: "Login Success",
      data: dataWtihoutPassword,
      token,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
