import { getAllusers } from "../../Repositories/users/getAllUsers";

export const cekusers = async () => {
  try {
    const tweet = await getAllusers();
    return {
      status: 200,
      message: "success",
      data: tweet,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
