﻿# Cities: Skylines 2 - Zoning Toolkit

A mod to allow changing the zoning of roads.

- [Requirements](#requirements)
- [Usage](#usage)
- [Renaming your project](#renaming-your-project)
- [Incrementing version number](#incrementing-version-number)
- [CI / GitHub Actions - Setup](#ci-github-actions-setup)
- [Regarding BepInEx version 5 (Stable) VS 6 (Alpha/Unstable/Nightly)](#regarding-bepinex-version-5-stable-vs-6-alphaunstablenightly)
- [Credits](#credits)
- [Community](#community)

# Requirements

- [Cities: Skylines 2](https://store.steampowered.com/app/949230/Cities_Skylines_II/) (duh)
- [BepInEx 5.4.22](https://github.com/BepInEx/BepInEx/releases) or later
- (Optional) [dotnet-script](https://github.com/dotnet-script/dotnet-script) (for `rename.csx` helper script)
    - Installation `dotnet tool install -g dotnet-script`

# Manual Installation
- Depending on your BepInEx version download the relevant file:
    - BepInEx 5: Download build-with-5
    - BepInEx 6: Download build-with-6
- Create a ZoningToolkitMod folder in BepInEx/Plugins folder
- Copy the unzipped files into the plugins folder

# Reporting Issues
If you encounter issues, please open an issue on this repo. It would be greatly appreciated if you could provide a gif of the problem or a video.
Also, a logfile would also be nice to debug any issues.

# Development

## Usage

- Create a new repository based on this one
- Clone your new repository to your computer
- Uncomment and update the `Cities2_Location` variable in `ZoningToolkitModCS2.csproj`
- Run `make build`

After running the last command, the mod should be automatically copied to your game directory,
so launching the game should include running the mod you just started :)

## Incrementing version number

- Update `.csproj` file with new version number
- Update `thunderstore.toml` file with new version number
- Update `CHANGELOG` to describe the changes you've made between this and previous version
- Commit version bump
- Do a git tag with the new version number
    - `git tag -a v0.2.0 -m v0.2.0`
- Push your changes + tags
    - `git push origin master --tags`

## CI / GitHub Actions - Setup

In order to get the CI/GitHub Actions workflow to work, you have to do a couple of things.

- Create a new private repository with all the game DLLs that you require for building your mod
- Create a new GitHub Personal Access Token ("PAT") that has only READ access to the created private repository
- Create a new secret variable in GitHub Actions called `GH_PAT` that has your PAT with read access to the private repository

Now the CI job should work as expected :)

## Regarding BepInEx version 5 (Stable) VS 6 (Alpha/Unstable/Nightly)

Currently, this mod template defaults to building against BepInEx version 6 (unstable pre-release). If you'd like to instead use Stable BepInEx version 5, you can run the build like this:

```
$ make build BEPINEX_VERSION=5
```

In order to run code only for one BepInEx version, you can do something like this:

```
#if BEPINEX_V6
    using BepInEx.Unity.Mono;
#endif
```

That would only run `using BepInEx.Unity.Mono` when you're building the project for BepInEx 6. Add in a `else` if you want to do something different when it's version 5.

# Credits

- Thanks to Cities Skylines 2 Unofficial Modding Discord
- Particular thanks to [@StudioLE](https://github.com/StudioLE) who helped with feedback and improving .csproj setup

# Community

Looking to discuss Cities: Skylines 2 Unofficial modding together with other modders? You're welcome to join our "Cities 2 Modding" Discord, which you can find here: https://discord.gg/vd7HXnpPJf
