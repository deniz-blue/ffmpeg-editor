import { execSync } from "node:child_process";

export const ffmpeg = (args: string) => execSync(`ffmpeg -hide_banner ${args}`, { encoding: "utf8" });
