import { vpnModelList } from "../shared/index.mjs";

export async function list() {
  const models = await vpnModelList();
  console.log(models.join("\n"));
}
