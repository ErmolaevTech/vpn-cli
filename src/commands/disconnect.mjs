import { OFF_ICON, ERROR_ICON } from "../constants.mjs";
import { startSpinner } from "../utils/spinner.mjs";
import { debug } from "../utils/index.mjs";
import { ensureConnectionStatus } from "../shared/connection-status.mjs";

export async function disconnect(name) {
  const stop = startSpinner("");
  try {
    debug("Attempt to disable vpn");

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
