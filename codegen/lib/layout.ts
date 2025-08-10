import { ffmpeg } from "../sh";

export interface FFmpegLayoutInfo {
    channels: FFmpegLayoutChannel[];
    aliases: FFmpegLayoutStandard[];
}

export interface FFmpegLayoutChannel {
    id: string;
    label?: string;
};

export interface FFmpegLayoutStandard {
    id: string;
    value: string;
}

export const getFFmpegLayoutInfo = (): FFmpegLayoutInfo => {
    let channels: FFmpegLayoutChannel[] = [];
    let aliases: FFmpegLayoutStandard[] = [];

    let lines = ffmpeg("-layouts")
        .split("\n")
        .slice(2);

    let bool = false;
    for(let line of lines) {
        if(!line) {
            bool = true;
            continue;
        };

        if(line.startsWith("NAME") || line.endsWith(":")) continue;

        if(bool) {
            let [id, value] = line.split(" ").filter(Boolean);
            aliases.push({ id, value });
        } else {
            let [id, ...label] = line.split(" ").filter(Boolean);
            channels.push({ id, label: label.join(" ") });
        }
    }

    return {
        channels,
        aliases,
    };
};
