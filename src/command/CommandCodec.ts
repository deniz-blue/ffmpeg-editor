import { FFmpegCommandOption, stringifyFFmpegCommandOption } from "./CommandOption";
import { FFmpegCommandStreamSpecifier, stringifyFFmpegCommandStreamSpecifier } from "./StreamSpecifier";

export interface FFmpegCommandCodec {
    streams: FFmpegCommandStreamSpecifier;
    name: string;
    options: FFmpegCommandOption[];
};

export const stringifyFFmpegCommandCodec = (codec: FFmpegCommandCodec) => {
    let specifier = stringifyFFmpegCommandStreamSpecifier(codec.streams);
    let opts = codec.options.map(stringifyFFmpegCommandOption).join(" ");

    return [
        "-c",
        specifier && ":",
        specifier,
        " ",
        codec.name,
        opts && " ",
        opts,
    ].filter(Boolean).join("");
};
