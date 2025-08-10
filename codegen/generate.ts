import { writeFileSync } from "fs";
import { getFFmpegColors, getFFmpegHwaccels, getFFmpegSampleFmts } from "./lib/other";
import { getFFmpegPixFmts } from "./lib/pix_fmt";
import { getFFmpegLayoutInfo } from "./lib/layout";
import { getFFmpegFilters } from "./lib/filter";
import { getFFmpegFormats } from "./lib/format";
import { getFFmpegCodecs } from "./lib/codec";
import { getFFmpegProtocols } from "./lib/protocols";
import { getFFmpegGlobalOptions } from "./manual/globalOptions";

const info = {
    options: getFFmpegGlobalOptions(),

    formats: getFFmpegFormats(),
    // muxers
    // demuxers
    // devices
    codecs: getFFmpegCodecs(),
    // decoders
    // encoders
    // bsfs
    protocols: getFFmpegProtocols(),
    filters: getFFmpegFilters(),
    pix_fmts: getFFmpegPixFmts(),
    layouts: getFFmpegLayoutInfo(),
    sample_fmts: getFFmpegSampleFmts(),
    colors: getFFmpegColors(),
    // sources <device>
    // sinks <device>
    hwaccels: getFFmpegHwaccels(),
};

writeFileSync("./data.json", JSON.stringify(info, null, 2));
console.log("Done");
