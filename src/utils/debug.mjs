import { DEBUG_ICON } from "../constants.mjs";

export const debugFlag = { isOn: false };

export function debug(msg) {
  if (!debugFlag.isOn) {
    return;
  }

  console.info(`${DEBUG_ICON}: ${msg}`);
}
