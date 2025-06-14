import { CONFIG_DIR, CONFIG_FILE_NAME, WARNING_ICON } from "../constants.mjs";
import { vpnModelList } from "../shared/index.mjs";

export function configFilePath() {
  return path.join(os.homedir(), CONFIG_DIR, CONFIG_FILE_NAME);
}

export async function configAsJson() {
  try {
    const json = await fs.readJson(configFilePath());
    return json;
  } catch (e) {
    throw new Error(
      `The configuration file is unavailable or contains invalid content.\n Please run ${chalk.blue("'vpn setDefault [name]'")} to create a valid config file`,
      { cause: e },
    );
  }
}

export async function defaultVpnNameFromConfig() {
  const config = await configAsJson();

  if (config.defaultVpnName) {
    return config.defaultVpnName;
  }

  const firstVpnInList = (await vpnModelList())[0];

  if (!firstVpnInList) {
    throw new Error(`${WARNING_ICON} You don't have a VPN configured`);
  }

  console.log(
    `You don't have a default VPN configured. To configure it run ${chalk.blue("'vpn setDefault [name]'")} command.\n${chalk.green(`${firstVpnInList.name}`)} is currently selected for activation`,
  );

  return firstVpnInList.name;
}

export async function writeConfigFile(content) {
  await fs.outputFile(configFilePath(), content);
}
