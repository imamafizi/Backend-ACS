import { getUserByIdRepo } from "../../Repositories/users/getUserByIdRepo";
import { excludeFields } from "../../helper/excludeFields";

export const keepLoginAction = async (id: number) => {
  try {
    const user = await getUserByIdRepo(id);

    if (!user) {
      return {
        status: 404,
        message: `user with id: ${id} not found`,
      };
    }

    const dataWtihoutPassword = excludeFields(user, ["password"]);

    return {
      status: 200,
      message: "success",
      data: dataWtihoutPassword,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
