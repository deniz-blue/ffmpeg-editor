import { FFmpegAVOption } from "../lib/AVOptions";
import { ffmpeg } from "../sh";

type FFmpegGlobalOptCat = "global" | "file" | "audio" | "video" | "subtitle";

type MapperMode = [FFmpegGlobalOptCat, boolean] | null;
const mapping: Partial<Record<string, MapperMode>> = {
    "Hyper fast Audio and Video encoder": null,
    "usage: ffmpeg [options] [[infile options] -i infile]... {[outfile options] outfile}...": null,
    "Getting help:": null,

    "Global options (affect whole program instead of just one file):": ["global", false],
    "Advanced global options:": ["global", true],
    "Per-file main options:": ["file", false],
    "Advanced per-file options:": ["file", true],
    "Video options:": ["video", false],
    "Advanced Video options:": ["video", true],
    "Audio options:": ["audio", false],
    "Advanced Audio options:": ["audio", true],
    "Subtitle options:": ["subtitle", false],
};

export const getFFmpegGlobalOptions = () => {
    let mapperMode: MapperMode = null;

    let opt: Record<FFmpegGlobalOptCat, FFmpegAVOption[]> = {
        audio: [],
        file: [],
        global: [],
        subtitle: [],
        video: [],
    };

    ffmpeg("-h").trim().split("\n").filter(Boolean).map(line => {
        if (line[0] == "-") {
            if(!mapperMode) return;
            let [cat, advanced] = mapperMode;
            
            let [x, desc] = line.split("  ").filter(Boolean);
            let [name, type] = x.split(" ");
            
            opt[cat].push({
                name,
                type: type || "boolean",
                advanced,
                desc,
            })
        } else {
            if (mapping[line]) mapperMode = mapping[line]
            else console.error(line);
        }
    });

    return opt;
};


