import { ffmpeg } from "../sh";

export interface FFmpegPixFmtInfo {
    id: string;
    input: boolean;
    output: boolean;
    hardware: boolean;
    palette: boolean;
    bitstream: boolean;
    nbComponents: number;
    bitsPerPixel: number;
}

export const parseFormatLine = (line: string): FFmpegPixFmtInfo => {
    const [flags, id, nbc, bpp] = line.trim().split(" ").filter(Boolean);
    return {
        id,
        input: flags[0] == "I",
        output: flags[1] == "O",
        hardware: flags[2] == "H",
        palette: flags[3] == "P",
        bitstream: flags[4] == "B",
        nbComponents: Number(nbc),
        bitsPerPixel: Number(bpp),
    };
};

export const getFFmpegPixFmts = () => {
    let lines = ffmpeg("-pix_fmts").split("\n");
    lines = lines.slice(lines.indexOf("-----") + 1).filter(Boolean);
    return lines.map(parseFormatLine);
};
