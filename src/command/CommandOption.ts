export interface FFmpegCommandOption {
    name: string;
    value: string;
};

export const stringifyFFmpegCommandOption = (o: FFmpegCommandOption) => {
    return [
        "-",
        o.name,
        o.value && " ",
        o.value,
    ].join("");
};
