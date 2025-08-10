import { ffmpeg } from "../sh";
import { FFmpegAVOption, getFFmpegAVOptions } from "./AVOptions";

export interface FFmpegProtocolInfo {
    id: string;
    input: boolean;
    output: boolean;
    options: FFmpegAVOption[];
}

export const getFFmpegProtocols = () => {
    let protocols: FFmpegProtocolInfo[] = [];
    let atInput = true;

    let lines = ffmpeg("-protocols").split("\n").filter(Boolean);
    lines = lines.slice(1);

    for (let line of lines) {
        if (line == "Input:") continue
        if (line == "Output:") {
            atInput = false;
            continue;
        }

        let id = line.trim();

        if(!protocols.some(x => x.id == id))
            protocols.push({
                id,
                input: false,
                output: false,
                options: [],
            })

        let p = protocols.find(x => x.id == id)!;
        p[atInput ? "input" : "output"] = true;
    }

    for(let p of protocols) {
        p.options.push(...getFFmpegAVOptions("protocol", p.id));
    }

    return protocols;
};
