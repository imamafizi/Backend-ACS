import { postImplementorRepo } from "../../Repositories/SWA/postImplementor";

export const postImplementorAction = async (body: any) => {
  try {
    const { name, team, company, badge, position } = body;
    const implementor = await postImplementorRepo(body);
    return {
      status: 200,
      message: "Implementor register success",
      data: implementor,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
