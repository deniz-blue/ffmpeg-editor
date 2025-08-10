import { ffmpeg } from "../sh";
import { FFmpegAVOption, getFFmpegAVOptions, parseAVOptionBlock } from "./AVOptions";

export interface FFmpegFilterInfo {
    id: string;
    label: string;

    timeline: boolean;
    slice: boolean;
    command: boolean;
};

export interface FFmpegFilterIO {
    type: "video" | "audio" | "dynamic";
    name?: string;
};

export interface FFmpegFilter extends FFmpegFilterInfo {
    options: FFmpegAVOption[];
    inputs: FFmpegFilterIO[];
    outputs: FFmpegFilterIO[];
};

export const parseFilterLine = (line: string): FFmpegFilterInfo => {
    const [caps, id, io, ...desc] = line.trim().split(" ").filter(Boolean);

    // const [inputStr, outputStr] = io.split("->");
    // const parseIOList = (x: string) => x.split("").map(parseIO).filter(x => x !== null);
    // const parseIO = (x: string): FFmpegFilterIO | null => {
    //     if(x == "A") return "audio";
    //     if(x == "V") return "video";
    //     if(x == "N") return "dynamic";
    //     if(x == "|") return null;
    //     throw new Error(`Unknown FFmpegFilterIO: ${x}`);
    // };

    return {
        id,
        label: desc.join(" "),

        timeline: caps.includes("T"),
        slice: caps.includes("S"),
        command: caps.includes("C"),

        // input: parseIOList(inputStr),
        // output: parseIOList(outputStr),
    };
};

export const parseFilterIOLine = (line: string): FFmpegFilterIO => {
    if (line.trim() == "dynamic (depending on the options)") return {
        type: "dynamic",
    };

    let [idx, name, ptype] = line.split(" ").filter(Boolean);
    let type = ptype.substring(1, ptype.length - 1);
    if (type !== "audio" && type !== "video") throw new Error(`Unknown IO type: ${type}`);

    return {
        type,
        name,
    };
};

export const getFFmpegFilters = (): FFmpegFilter[] => {
    let lines = ffmpeg("-filters").split("\n").filter(Boolean);
    lines = lines.slice(8);
    return lines.map(line => {
        let info = parseFilterLine(line);
        let inputs: FFmpegFilterIO[] = [];
        let outputs: FFmpegFilterIO[] = [];

        const avoptHeader = `${info.id} AVOptions:`;

        let lines = ffmpeg(`-h filter=${info.id}`).split("\n").filter(Boolean);
        let atInput = true;
        for (let line of lines) {
            if (line == avoptHeader) break;
            if (line == "    Inputs:") continue;
            if (line == "    Outputs:") {
                atInput = false;
                continue;
            };

            if (line.startsWith("       ")) {
                if (line.trim() == "none (source filter)") continue;
                if (line.trim() == "none (sink filter)") continue;
                let io = parseFilterIOLine(line);
                if (atInput)
                    inputs.push(io)
                else
                    outputs.push(io)
            }
        }

        let options = lines.includes(avoptHeader) ? (
            parseAVOptionBlock(
                lines.slice(lines.indexOf(avoptHeader) + 1)
                .filter(x => !x.endsWith("AVOptions:"))
            )
        ) : [];

        return {
            ...info,
            options,
            inputs,
            outputs,
        };
    });
};
