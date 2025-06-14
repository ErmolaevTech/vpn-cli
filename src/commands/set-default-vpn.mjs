import { writeConfigFile } from "../utils/index.mjs";

export async function setDefaultVpn(vpnName) {
  await writeConfigFile(JSON.stringify({ defaultVpnName: vpnName }, null, 2));
}
