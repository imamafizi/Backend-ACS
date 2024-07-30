import { getAllSWARepo } from "../../Repositories/SWA/getAllSWARepo";

export const allSWAAction = async () => {
  try {
    const swa = await getAllSWARepo();
    return {
      status: 200,
      message: "All SWA",
      data: swa,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
