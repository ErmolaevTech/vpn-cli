# VPN CLI
CLI for VPN control on macOS

## Example
``` bash
vpn list # [vpnName1, vpnName2]
v on # Runs vpnName1

vpn off
vpn on vpnName1 # Runs vpnName1

v setDefault vpnName2
v on # Runs vpnName2

v status # Connected to vpnName2
```

## Installation
Install [node (>=20) and npm](https://nodejs.org/en)

Then, install this package globally
``` bash
npm i vpn-cli -g
```

Now you can use it.
``` bash
vpn list
```

## Usage
Available commands:
- on [name?] - turn on vpn by name. The name is optional (see [Default VPN](#default-vpn))
- off - turn off the currently active vpn
- list - view available VPNs
- status - current vpn connection status
- setDefault [name] - see [Default VPN](#default-vpn) section

You can use both `vpn` and just `v`

### Default VPN
To ensure the `vpn on` command works, you must have a standard VPN installed
``` bash
vpn list # See the available VPNs

vpn setDefault [name]

vpn on # [name] vpn runs
```
