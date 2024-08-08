import { perpetratorRepo } from "../../Repositories/SWA/perpetratorRepo";

export const perpetratorAction = async (body: any) => {
  try {
    const { name, team, company, badge, position } = body;
    const perpetrator = await perpetratorRepo(body);
    return {
      status: 200,
      message: "perpetrator register success",
      data: perpetrator,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
