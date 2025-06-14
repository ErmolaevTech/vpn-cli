import { OFF_ICON, ON_ICON } from "../constants.mjs";
import { vpnModelList } from "./list.mjs";

export async function status() {
  const list = await vpnModelList();

  const activeVpn = list.find((vpn) => vpn.isActive);

  if (activeVpn) {
    console.log(
      `${ON_ICON} You are connected to ${chalk.green(activeVpn.name)}`,
    );
  } else {
    console.log(`${OFF_ICON} You are not connected to a VPN`);
  }
}
