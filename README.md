# Default sound changer

Toggle between your Headphones or Speakers as Default Playbe Device with a simple terminal command or executable file.

### Requirements

1. Bun, Windows 11 (and maybe 10)
2. Set names "Speakers" & "Headphones" in both devices
3. Powershell Update https://www.powershellgallery.com/packages/AudioDeviceCmdlets/3.0.0.4
4. Install dependencies with:

```bash
cd defaultSoundToggler
bun install
```

### Run the project

To run through Terminal:

```bash
bun run index.ts
```

Or create executable with

```bash
bun build --compile --target=bun-windows-x64 ./index.ts --outfile soundChanger
```
