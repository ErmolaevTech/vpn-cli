import { ON_ICON } from "../constants.mjs";

export async function connect(vpnName) {
  try {
    const res = await $`scutil --nc start "${vpnName}"`;

    // add timeout about error and loadin

    if (res.exitCode !== 0 || res.stderr !== "") {
      console.error("Something went wrong (1): \n");
      console.error(res.stderr);
    } else {
      console.log(`${ON_ICON} ${vpnName} (connected)`);
    }
  } catch (e) {
    console.error("Something went wront (2): \n");
    console.error(res);
  }
}
