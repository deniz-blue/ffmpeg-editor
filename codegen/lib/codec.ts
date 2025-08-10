import { ffmpeg } from "../sh";

export type FFmpegCodecType = "video" | "audio" | "subtitle" | "data";

export interface FFmpegCodecInfo {
    id: string;
    label?: string;
    decode: boolean;
    encode: boolean;
    type: FFmpegCodecType;
    intra: boolean;
    lossy: boolean;
    lossless: boolean;
}

export const parseCodecType = (s: string): FFmpegCodecType => {
    if(s == "V") return "video";
    if(s == "A") return "audio";
    if(s == "S") return "subtitle";
    if(s == "D") return "data";
    throw new Error(`Unknown FFmpeg Codec Type: ${s}`);
};

export const parseCodecLine = (line: string): FFmpegCodecInfo => {
    const [caps, id, ...desc] = line.trim().split(" ").filter(Boolean);
    return {
        id,
        label: desc.join(" "),
        decode: caps[0] == "D",
        encode: caps[1] == "E",
        type: parseCodecType(caps[2]),
        intra: caps[4] == "I",
        lossy: caps[5] == "L",
        lossless: caps[6] == "S",
    };
};

export const getFFmpegCodecs = () => {
    let lines = ffmpeg("-codecs").split("\n").filter(Boolean);
    lines = lines.slice(lines.indexOf(" -------") + 1);
    return lines.map(parseCodecLine);
};
