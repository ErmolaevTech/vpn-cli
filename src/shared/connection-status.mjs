import { debug } from "../utils/debug.mjs";
import {
  ENSURE_STATUS_TIMEOUT_MS,
  CHECK_STATUS_INTREVAL_MS,
} from "../constants.mjs";

export async function ensureConnectionStatus(vpnName, targetStatus) {
  async function ensure() {
    debug(`Check ${vpnName} status`);
    const status = await $({ quiet: true })`scutil --nc status ${vpnName}`;

    const isConnected = isConnectedByStatusStdout(status.stdout);

    debug(`${vpnName} is connected: ${isConnected}`);

    if (targetStatus === "Connected" && isConnected) {
      return true;
    }

    if (targetStatus === "Disconnected" && !isConnected) {
      return true;
    }

    return false;
  }

  const { promise, resolve } = Promise.withResolvers();

  let timer = setTimeout(() => {
    debug(`Timeout for ${vpnName} checks`);
    resolve(false);
  }, ENSURE_STATUS_TIMEOUT_MS);

  let inteval = setInterval(() => {
    ensure(vpnName).then((result) => {
      if (!result) {
        return;
      }

      debug("Ensure connection");
      resolve(true);
    });
  }, CHECK_STATUS_INTREVAL_MS);

  return promise.finally(() => {
    clearInterval(inteval);
    clearTimeout(timer);
  });
}

function isConnectedByStatusStdout(stdout) {
  return stdout.split("\n")[0] === "Connected";
}
