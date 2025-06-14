#!/usr/bin/env zx
import * as commands from "./commands/index.mjs";
import { defaultVpnNameFromConfig } from "./config-utils.mjs";
import { isNotEmpty } from "./utils.mjs";

async function run() {
  const argv = minimist(process.argv.slice(2), {});
  const command = argv._[1];
  const vpnName = isNotEmpty(argv._[2])
    ? argv._[2]
    : await defaultVpnNameFromConfig();

  switch (command) {
    case "connect":
    case "conn":
    case "on": {
      await commands.connect(vpnName);
      break;
    }
    case "disconnect":
    case "off": {
      await commands.disconnect(vpnName);
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
      await commands.setDefaultVpn(vpnName);
      break;
    }
    default:
      console.error("Unknown command: " + command);
  }
}

run();
