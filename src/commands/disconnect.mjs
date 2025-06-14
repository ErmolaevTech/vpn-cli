import { OFF_ICON } from "../constants.mjs";

export async function disconnect(name) {
  try {
    const res = await $`scutil --nc stop "${name}"`;

    if (res.exitCode !== 0 || res.stderr !== "") {
      console.error("Something went wrong (1): \n");
      console.error(res.stderr);
    } else {
      console.log(`${OFF_ICON} ${name} (disconnected)`);
    }
  } catch (e) {
    console.error("Something went wront (2): \n");
    console.error(res);
  }
}
