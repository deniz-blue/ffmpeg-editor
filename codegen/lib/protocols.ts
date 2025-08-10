import { ffmpeg } from "../sh";

export interface FFmpegProtocolInfo {
    id: string;
    type: "input" | "output";
}

export const getFFmpegProtocols = () => {
    let protocols: FFmpegProtocolInfo[] = [];
    let type: FFmpegProtocolInfo["type"] = "input";

    let lines = ffmpeg("-protocols").split("\n").filter(Boolean);
    lines = lines.slice(1);

    for (let line of lines) {
        if (line == "Input:") {
            type = "input";
            continue;
        };

        if (line == "Output:") {
            type = "output";
            continue;
        }

        let id = line.trim();
        protocols.push({
            id,
            type,
        })
    }

    return protocols;
};
