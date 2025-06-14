import { ON_ICON } from "../constants.mjs";
import { writeConfigFile } from "../utils/index.mjs";

export async function setDefaultVpn(vpnName) {
  try {
    await writeConfigFile(JSON.stringify({ defaultVpnName: vpnName }, null, 2));
    console.log(
      `${ON_ICON} Successfully installed ${chalk.green(vpnName)} as a default VPN`,
    );
  } catch (e) {
    throw new Error("Cannot write config file", { cause: e });
  }
}
