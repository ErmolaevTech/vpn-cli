import { CONFIG_DIR, CONFIG_FILE_NAME } from "../constants.mjs";

export function configFilePath() {
  return path.join(os.homedir(), CONFIG_DIR, CONFIG_FILE_NAME);
}

export async function configAsJson() {
  return fs.readJson(configFilePath());
}

export async function defaultVpnNameFromConfig() {
  const config = await configAsJson();

  if (!config.defaultVpnName) {
    throw new Error("Can not get vpn");
  }

  return config.defaultVpnName;
}

export async function writeConfigFile(content) {
  try {
    await fs.outputFile(configFilePath(), content);
  } catch (e) {
    // TODO:
    console.log(e);
  }
}
