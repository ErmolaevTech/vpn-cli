import { writeConfigFile } from "../config-utils.mjs";

export async function setDefaultVpn(vpnName) {
  await writeConfigFile(JSON.stringify({ defaultVpnName: vpnName }, null, 2));
}
