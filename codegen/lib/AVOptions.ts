import { ffmpeg } from "../sh";

export type FFmpegAVOptionCapability = "E" | "D" | "F" | "V" | "A" | "S" | "X" | "R" | "B" | "T" | "P";

export interface FFmpegAVOption {
    name: string;
    type: string;
    ctx?: FFmpegAVOptionCapability[];
    desc: string;
    values?: FFmpegAVOptionValue[];
    advanced?: boolean;
};

export interface FFmpegAVOptionValue {
    name: string;
    value?: string;
    desc: string;
    ctx: FFmpegAVOptionCapability[];
};

export const parseAVOptionCapabilities = (s: string) => s.replaceAll(".", "").split("") as FFmpegAVOptionCapability[];

export const parseAVOptionBlock = (lines: string[]) => {
    let options: FFmpegAVOption[] = [];
    for (let line of lines) {
        if (line.startsWith("    ")) {
            let option = options[options.length-1];
            if(!option) throw new Error("AVOptions block invalid");
            
            const sp = line.trim().split(" ").filter(Boolean);
            option.values ||= [];

            if (option.type == "int") {
                option.values.push({
                    name: sp[0],
                    value: sp[1],
                    ctx: parseAVOptionCapabilities(sp[2]),
                    desc: sp.slice(3).join(" "),
                });
            } else if(option.type == "flags" || option.type == "string") {
                option.values.push({
                    name: sp[0],
                    ctx: parseAVOptionCapabilities(sp[1]),
                    desc: sp.slice(2).join(" "),
                });
            } else throw new Error("Invalid AVOptions block");
        } else if (line.startsWith("  ")) {
            let [name, type, caps, ...desc] = line.trim().split(" ").filter(Boolean);

            type = type.substring(1, type.length - 1);

            options.push({
                name,
                type,
                ctx: parseAVOptionCapabilities(caps),
                desc: desc.join(" "),
            });
        }
    }
    return options;
};

export const getFFmpegAVOptions = (type: string, component: string) => {
    let lines = ffmpeg(`-h ${type}=${component}`).split("\n").filter(Boolean);
    lines = lines.slice(1);
    return parseAVOptionBlock(lines);
};
