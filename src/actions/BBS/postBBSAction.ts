import { postBBSRepo } from "../../Repositories/BBS/postBBSRepo";

export const postBBSAction = async (body: any, userId: number) => {
  try {
    const bbs = await postBBSRepo(body, userId);
    return {
      status: 200,
      message: "Input success",
      data: bbs,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
