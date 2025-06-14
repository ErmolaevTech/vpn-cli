import { OFF_ICON, ERROR_ICON, WARNING_ICON } from "../constants.mjs";
import { startSpinner } from "../utils/spinner.mjs";
import { debug } from "../utils/index.mjs";
import { ensureConnectionStatus, vpnModelList } from "../shared/index.mjs";

export async function disconnect() {
  const stop = startSpinner("");
  try {
    debug("Try to find active vpn");

    const activeVpn = (await vpnModelList()).find((vpn) => vpn.isActive);

    if (!activeVpn) {
      console.log(`${WARNING_ICON} You don't have a VPN enabled`);

      return;
    }

    const name = activeVpn.name;

    debug(`Found ${name}`);

    await $`scutil --nc stop "${name}"`.quiet();

    const isDisconnectSuccessful = await ensureConnectionStatus(
      name,
      "Disconnected",
    );

    if (!isDisconnectSuccessful) {
      console.error(
        `${ERROR_ICON} Something went wrong. Please check your internet connection`,
      );

      return;
    }

    console.log(`${OFF_ICON} ${name} ${chalk.green("(disconnected)")}`);
  } catch (e) {
    console.error(
      `${ERROR_ICON} Something went wrong \n scutil response: ${chalk.red(e)}`,
    );
  } finally {
    stop();
  }
}
