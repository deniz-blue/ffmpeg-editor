import { ffmpeg } from "../sh";

export interface FFmpegSampleFmt {
    id: string;
    depth: number;
}

export const getFFmpegSampleFmts = (): FFmpegSampleFmt[] => {
    return ffmpeg("-sample_fmts")
        .split("\n")
        .filter(Boolean)
        .slice(1)
        .map(x => {
            let [id, d] = x.split(" ").filter(Boolean);
            return { id, depth: Number(d) };
        })
};

export interface FFmpegColor {
    id: string;
    color: string;
}

export const getFFmpegColors = (): FFmpegColor[] => {
    return ffmpeg("-colors")
        .split("\n")
        .filter(Boolean)
        .slice(1)
        .map(x => {
            let [id, color] = x.split(" ").filter(Boolean);
            return { id, color };
        })
};

export const getFFmpegHwaccels = (): string[] => {
    return ffmpeg("-hwaccels")
        .split("\n")
        .filter(Boolean)
        .slice(1)
};
