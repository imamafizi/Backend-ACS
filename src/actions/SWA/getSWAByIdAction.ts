import { getSWAByIdRepo } from "../../Repositories/SWA/getSWAByIdRepo";

export const getSWAByIdAction = async (id: number) => {
  try {
    const swa = await getSWAByIdRepo(id);
    if (swa) {
      return {
        status: 200,
        data: swa,
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
