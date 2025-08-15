import { FFmpegCommandCodec, stringifyFFmpegCommandCodec } from "./CommandCodec";
import { FFmpegCommandOption } from "./CommandOption";
import { FFmpegCommandStreamSpecifier } from "./StreamSpecifier";

export interface FFmpegCommandFile {
    url: string;

    options: FFmpegCommandOption[];
    filters: FFmpegCommandFileFilter[];
    codecs: FFmpegCommandCodec[];
};

export interface FFmpegCommandFileFilter {
    streams: FFmpegCommandStreamSpecifier[];

};

export const stringifyFFmpegCommandFile = (file: FFmpegCommandFile) => {
    return [
        ...file.codecs.map(stringifyFFmpegCommandCodec),
    ].join(" ");
};
