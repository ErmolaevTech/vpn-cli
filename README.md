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
v s # Connected to vpnName2
```

## Installation
Install [node (>=20), npm](https://nodejs.org/en) and [zx](https://google.github.io/zx/setup)

The easiest way to install zx
``` bash
npm i zx -g
# or
brew install zx
```

Then, install this package globally
``` bash
npm i @ermolaev/vpn-cli -g
```

Now you can use it.
``` bash
vpn list
```

## Usage
Available commands:
- on [name?] - turn on vpn by name. The name is optional (see [Default VPN](#default-vpn))
``` bash
v on someName
v on

# Available aliases: connect, conn
v connect
v conn
```
- off - turn off the currently active vpn
``` bash
v off

# Available aliases: disconnect, disconn
v disconnect
v disconn
```
- list - view available VPNs
``` bash
v list

# Available aliases: l
v l
```
- status - current vpn connection status
``` bash
v status

# Available aliases: s
v s
```
- setDefault [name] - see [Default VPN](#default-vpn) section
``` bash
v setDefault someName
```

You can use both `vpn` and just `v`

### Default VPN
To ensure the `vpn on` command works, you must have a standard VPN installed
``` bash
vpn list # See the available VPNs

vpn setDefault [name]

vpn on # [name] vpn runs
```

## Contribute
First create an issue.

Then install [node (>=20) and npm](https://nodejs.org/en), clone this repository. Run:
``` bash
npm i
```
Then run follow command:
``` bash
npm run build
```
Then run:
``` bash
npm link
```
Now the `vpn` command will proxy to the local build. After every change you need to run `npm run build`.

Create a MR and send it
