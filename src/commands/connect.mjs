import { ERROR_ICON, ON_ICON } from "../constants.mjs";
import { ensureConnectionStatus } from "../shared/connection-status.mjs";
import { startSpinner } from "../utils/index.mjs";
import { debug } from "../utils/index.mjs";

export async function connect(vpnName) {
  const stop = startSpinner("");
  try {
    debug("Attempt to enable vpn");

    await $`scutil --nc start "${vpnName}"`.quiet();

    const isConnectSuccessful = await ensureConnectionStatus(
      vpnName,
      "Connected",
    );

    if (!isConnectSuccessful) {
      console.error(
        `${ERROR_ICON} Something went wrong. Please check your internet connection`,
      );

      return;
    }

    console.log(`${ON_ICON} ${vpnName} ${chalk.green("(connected)")}`);
  } catch (e) {
    console.error(
      `${ERROR_ICON} Something went wrong \n scutil response: ${chalk.red(e)}`,
    );
  } finally {
    stop();
  }
}
