import { vpnModelList } from "./list.mjs";

export async function status() {
  const list = await vpnModelList();

  const activeVpn = list.find((vpn) => vpn.isActive);

  if (activeVpn) {
    console.log("You are connected ", activeVpn.name);
  } else {
    console.log("Not connected");
  }
}
