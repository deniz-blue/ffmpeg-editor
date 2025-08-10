import { writeFileSync } from "fs";
import { getFFmpegColors, getFFmpegHwaccels, getFFmpegSampleFmts } from "./lib/other";
import { getFFmpegPixFmts } from "./lib/pix_fmt";
import { getFFmpegLayoutInfo } from "./lib/layout";
import { getFFmpegFilters } from "./lib/filter";
import { getFFmpegFormats } from "./lib/format";
import { getFFmpegCodecs } from "./lib/codec";
import { getFFmpegProtocols } from "./lib/protocols";

const info = {
    colors: getFFmpegColors(),
    hwaccels: getFFmpegHwaccels(),
    sample_fmts: getFFmpegSampleFmts(),
    pix_fmts: getFFmpegPixFmts(),
    layouts: getFFmpegLayoutInfo(),
    filters: getFFmpegFilters(),
    formats: getFFmpegFormats(),
    codecs: getFFmpegCodecs(),
    protocols: getFFmpegProtocols(),
};

writeFileSync("./dump.json", JSON.stringify(info, null, 2));
