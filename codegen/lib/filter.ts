import { ffmpeg } from "../sh";

export type FFmpegFilterIO = "audio" | "video" | "dynamic";

export interface FFmpegFilterInfo {
    id: string;
    label?: string;

    timeline: boolean;
    slice: boolean;
    command: boolean;

    input: FFmpegFilterIO[];
    output: FFmpegFilterIO[];
};

export const parseFilterLine = (line: string): FFmpegFilterInfo => {
    const [caps, id, io, ...desc] = line.trim().split(" ").filter(Boolean);

    const [inputStr, outputStr] = io.split("->");
    const parseIOList = (x: string) => x.split("").map(parseIO).filter(x => x !== null);
    const parseIO = (x: string): FFmpegFilterIO | null => {
        if(x == "A") return "audio";
        if(x == "V") return "video";
        if(x == "N") return "dynamic";
        if(x == "|") return null;
        throw new Error(`Unknown FFmpegFilterIO: ${x}`);
    };

    return {
        id,
        label: desc.join(" "),
        
        timeline: caps.includes("T"),
        slice: caps.includes("S"),
        command: caps.includes("C"),

        input: parseIOList(inputStr),
        output: parseIOList(outputStr),
    };
};

export const getFFmpegFilters = () => {
    let lines = ffmpeg("-filters").split("\n").filter(Boolean);
    lines = lines.slice(8);
    return lines.map(line => {
        let info = parseFilterLine(line)
        return info;
    });
};
