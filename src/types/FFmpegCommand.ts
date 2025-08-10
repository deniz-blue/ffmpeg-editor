import { FFmpegCommandFile } from "./FFmpegCommandFile";

export interface FFmpegCommand {
    global: Record<string, string>;
    inputs: FFmpegCommandFile[];



    outputs: FFmpegCommandFile[];
};

export const emptyFFmpegCommand: FFmpegCommand = {
    global: {},
    inputs: [],
    outputs: [],
};
