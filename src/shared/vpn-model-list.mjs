export async function vpnModelList() {
  // '* (Connected) XXXXX VPN (...) "Name"'
  const processOutput = await $`scutil --nc list`;
  // ignore first row
  const rows = processOutput.stdout.split("\n").slice(1);

  const models = rows.map(rowToVpnModel).filter(onlyWithName);

  return models;
}

function rowToVpnModel(row) {
  const splitted = row.split(/\s+/);
  const isActive = splitted[1] === "(Connected)";
  const name = splitted[5]?.replaceAll('"', "")?.replaceAll("'", "");

  return {
    isActive,
    name,
    toString() {
      return `${this.isActive ? "\u{1F7E2}" : "\u{1F534}"} ${this.name}`;
    },
  };
}

function onlyWithName(model) {
  return !!model.name;
}
