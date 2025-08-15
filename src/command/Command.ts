import { FFmpegCommandFile, stringifyFFmpegCommandFile } from "./CommandFile";
import { FFmpegCommandOption, stringifyFFmpegCommandOption } from "./CommandOption";

export interface FFmpegCommand {
    global: FFmpegCommandOption[];
    inputs: FFmpegCommandFile[];
    outputs: FFmpegCommandFile[];
};

export const emptyFFmpegCommand: FFmpegCommand = {
    global: [],
    inputs: [],
    outputs: [],
};

export const stringifyFFmpegCommand = (command: FFmpegCommand) => {
    return [
        "ffmpeg",
        ...command.global.map(stringifyFFmpegCommandOption),
        ...command.inputs.map(input => `${stringifyFFmpegCommandFile(input)} -i ${input.url}`.trim()),
        ...command.outputs.map(output => `${stringifyFFmpegCommandFile(output)} ${output.url}`.trim()),
    ].join(" ");
};
