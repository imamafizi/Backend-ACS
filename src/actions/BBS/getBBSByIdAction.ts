import { getBBSByIdRepo } from "../../Repositories/BBS/getBBSByIdRepo";

export const getBBSByIdAction = async (id: number) => {
  try {
    const bbs = await getBBSByIdRepo(id);
    if (bbs) {
      return {
        status: 200,
        data: bbs,
      };
    } else {
      return {
        status: 400,
        message: "Data not Found!!",
      };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
