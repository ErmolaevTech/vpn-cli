#!/usr/bin/env zx
import * as commands from "./commands/index.mjs";
import {
  debugFlag,
  isNotEmpty,
  defaultVpnNameFromConfig,
} from "./utils/index.mjs";
import { ERROR_ICON } from "./constants.mjs";

process.on("uncaughtException", function (err) {
  console.error(`${ERROR_ICON} Something went wrong`);
  console.error(err);
});

async function run() {
  const argv = minimist(process.argv.slice(2), {});
  const command = argv._[1];

  if (argv.debug) {
    debugFlag.isOn = true;
  }

  switch (command) {
    case "connect":
    case "conn":
    case "on": {
      const vpnName = isNotEmpty(argv._[2])
        ? argv._[2]
        : await defaultVpnNameFromConfig();

      await commands.connect(vpnName);
      break;
    }
    case "disconnect":
    case "disconn":
    case "off": {
      await commands.disconnect();
      break;
    }
    case "list": {
      await commands.list();
      break;
    }
    case "status": {
      await commands.status();
      break;
    }
    case "setDefault": {
      const vpnName = isNotEmpty(argv._[2])
        ? argv._[2]
        : await defaultVpnNameFromConfig();

      await commands.setDefaultVpn(vpnName);
      break;
    }
    default:
      console.error("Unknown command: " + command);
  }
}

run();
