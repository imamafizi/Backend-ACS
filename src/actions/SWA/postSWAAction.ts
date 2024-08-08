import { postSWARepo } from "../../Repositories/SWA/postSWARepo";

export const postSWAAction = async (body: any, userId: number) => {
  try {
    const swa = await postSWARepo(body, userId);
    return {
      status: 200,
      message: "Input success",
      data: swa,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
