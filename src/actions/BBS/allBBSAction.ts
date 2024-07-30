import { getAllBBSRepo } from "../../Repositories/BBS/getAllBBSRepo";

export const allBBSAction = async () => {
  try {
    const bbs = await getAllBBSRepo();
    return {
      status: 200,
      message: "success",
      data: bbs,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
