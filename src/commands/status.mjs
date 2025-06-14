import { ON_ICON, WARNING_ICON } from "../constants.mjs";
import { vpnModelList } from "../shared/index.mjs";

export async function status() {
  const list = await vpnModelList();

  const activeVpn = list.find((vpn) => vpn.isActive);

  if (activeVpn) {
    console.log(
      `${ON_ICON} You are connected to ${chalk.green(activeVpn.name)}`,
    );
  } else {
    console.log(`${WARNING_ICON} You are not connected to a VPN`);
  }
}
