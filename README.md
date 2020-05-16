# Attention!
**This project has been discontinued.**

@quasar/wizard
===
![official icon](https://img.shields.io/badge/Quasar%201.0-Official%20App%20Extension-blue.svg)
![npm (scoped)](https://img.shields.io/npm/v/@quasar/quasar-app-extension-wizard.svg)
[![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/quasarframework/app-extension-wizard.svg)]()
[![GitHub repo size in bytes](https://img.shields.io/github/repo-size/quasarframework/app-extension-wizard.svg)]()
[![npm](https://img.shields.io/npm/dt/@quasar/quasar-app-extension-wizard.svg)](https://www.npmjs.com/package/@quasar/quasar-app-extension-wizard)


> The Wizard helps you discover App Extensions, painlessly install collections of them and keep your Quasar environment up to date.

To find out more about App Extensions, please visit:
- https://quasar.dev/app-extensions/introduction

# Install
```bash
$ quasar ext add @quasar/wizard
```
Quasar CLI will retrieve the app extension from NPM and install it. You can (add) this extension as many times as you want, and is only a meta App Extension.

You can only install this inside of a project built and managed by the Quasar CLI v1.0.0 or greater. 

## Prompts

### Upgrade Strategy
```bash
? Choose Upgrade Strategy
❯ Never upgrade during dev [skip upgrade] 
  Notify about upgrades during dev [quasar upgrade] 
  Force upgrades during dev [quasar upgrade -i]
```
The Upgrade feature hooks `quasar upgrade` every time you run `quasar dev`. This will add several seconds to the time to first load of the dev server, but guarantees that you are always notified if there are upgrades - and if you choose to force upgrades, it will upgrade Quasar core packages and App Extensions. Obviously it will exit the dev process and you will have to manually restart the devserver.

### Install Extensions
```bash
? Choose Wizard Methodology
❯ Exit now, I just want upgrades 
  Choose from Collections 
  Pick from Official Catalog 
  Pick from all Known App Extensions 
  Search for App Extensions
```

Wizard brings you a number of ways to discover and install groups of (or individual) App Extensions. 

> Please note: If Wizard detects that an app extension is already installed, it will not attempt to add the extension again.

#### Collections
The Quasar team manages collections of curated App Extensions, and if you select the `Choose from Collections` options, you will be presented with the titles of the available collections. If you choose one, you will then be presented with the list of app extensions that will be installed, and you can choose to deselect any you do not want. 

> The collections are sourced from the [cdn.quasar.dev](https://cdn.quasar.dev/lists/wizard/collections.json)

#### Official Catalog
Quasar App Extensions are extremely powerful, and we carefully audit and maintain all official app extensions. If you `Pick from Official Catalog`, you will be presented with a list of all official app extensions, their versions and descriptions. You can choose one or many.

#### All Extensions
If you `Pick from all Known App Extensions`, all properly constructed and registered app extensions will be presented to you in a list. Please note: Quasar is not responsible for the quality or security of third party App Extensions.

#### Search [Experimental]
You can `Search for App Extensions` by entering a search term. At the time of writing, we are currently using the NPM search API, which tends not to return all expected results. 






# Uninstall
```bash
quasar ext remove @quasar/wizard
```

# Info
> Add longer information here that will help the user of your app extension.

# Other Info
> Add other information that's not as important to know

# Donate
If you appreciate the work that went into this App Extension, please consider [donating to Quasar](https://donate.quasar.dev).

# License
(c) 2019 Daniel Thompson-Yvetot & Razvan Stoenescu
MIT
