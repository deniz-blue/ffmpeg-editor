import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { FFmpegCommand } from "../command/Command";
import { FFmpegCommandFile } from "../command/CommandFile";

interface CommandStoreState {
    command: FFmpegCommand;
};

interface CommandStoreActions {
    getFile: (type: "input"|"output", i: number) => FFmpegCommandFile | null;
};

const defaultCommand: FFmpegCommand = {
    global: [
        { name: "hide_banner", value: "" },
        { name: "y", value: "" },
        { name: "loglevel", value: "verbose" },
    ],
    inputs: [
        {
            url: "input.mp4",
            codecs: [],
            filters: [],
            options: [],
        },
    ],
    outputs: [
        {
            url: "output.mp4",
            codecs: [
                {
                    name: "libx264",
                    streams: { streamType: "video" },
                    options: [],
                },
                {
                    name: "copy",
                    streams: { streamType: "audio" },
                    options: [],
                },
            ],
            filters: [],
            options: [],
        },
    ],
};

export const useCommand = create<CommandStoreState & CommandStoreActions>()(
    immer((set, get) => ({
        command: defaultCommand,
        getFile(type, i) {
            return get().command[type == "input" ? "inputs" : "outputs"][i] ?? null;
        },
    }))
);
