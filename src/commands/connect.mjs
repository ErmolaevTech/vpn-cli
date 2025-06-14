import { ERROR_ICON, ON_ICON } from "../constants.mjs";

export async function connect(vpnName) {
  try {
    // add timeout about error and loadin
    await $`scutil --nc start "${vpnName}"`.quiet();

    console.log(`${ON_ICON} ${vpnName} ${chalk.green("(connected)")}`);
  } catch (e) {
    console.error(
      `${ERROR_ICON} Something went wrong \n scutil response: ${chalk.red(e)}`,
    );
  }
}
