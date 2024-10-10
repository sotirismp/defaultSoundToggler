import { $ } from "bun";
const HEADPHONES = "Headphones";
const SPEAKERS = "Speakers";

const data = (await $`powershell Get-AudioDevice -List`).text();
const rawDevices = data.split("Index");

const devices = rawDevices
  .map((rawDevice) => {
    const tmp_arr = rawDevice.split(`\n`);
    if (!tmp_arr[4]) return;

    const id = tmp_arr[0].trim().split(":")[1].trim();
    const defaultSoundString = tmp_arr[1].replace(/\s/g, "").split(":")[1];
    let defaultSound = false;
    if (defaultSoundString === "True") defaultSound = true;
    const type = tmp_arr[3].replace(/\s/g, "").split(":")[1];
    const name = tmp_arr[4].replace(/\s/g, "").split(":")[1];
    if (!![SPEAKERS, HEADPHONES].find((device) => name.startsWith(device))) {
      return { id, name, type, defaultSound };
    }
  })
  .filter((device) => !!device);

const speakerDevice = devices.find((device) =>
  device.name.startsWith(SPEAKERS)
);
const headphoneDevice = devices.find((device) =>
  device.name.startsWith(HEADPHONES)
);

if (!!headphoneDevice && !!speakerDevice) {
  if (speakerDevice.defaultSound) {
    await $`powershell Set-AudioDevice -index ${+headphoneDevice.id}`;
  } else {
    await $`powershell Set-AudioDevice -index ${+speakerDevice.id}`;
  }
}
