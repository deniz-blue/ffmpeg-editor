import { ffmpeg } from "../sh";

export interface FFmpegFormatInfo {
    id: string;
    label?: string;
    demux: boolean;
    mux: boolean;
}

export const parseFormatLine = (line: string): FFmpegFormatInfo => {
    const [caps, id, ...desc] = line.trim().split(" ").filter(Boolean);
    return {
        id,
        label: desc.join(" "),
        demux: caps.includes("D"),
        mux: caps.includes("E"),
    };
};

export const getFFmpegFormats = () => {
    let lines = ffmpeg("-formats").split("\n").filter(Boolean);
    lines = lines.slice(4);
    return lines.map(parseFormatLine);
};
