import { CONFIG_DIR, CONFIG_FILE_NAME } from "../constants.mjs";

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

  if (!config.defaultVpnName) {
    throw new Error(
      `The configuration file does not contain the ${chalk.blue("'defaultVpnName'")} field.\n Please run ${chalk.blue("'vpn setDefault [name]'")} to create a valid config file`,
    );
  }

  return config.defaultVpnName;
}

export async function writeConfigFile(content) {
  await fs.outputFile(configFilePath(), content);
}
