export interface FFmpegCommandStreamSpecifier {
    streamIndex?: number;
    streamType?: "video" | "video-exclusive" | "audio" | "subtitle" | "data" | "attachment";
    streamId?: string;
    group?: string;
    programId?: string;
    usable?: boolean;
    metadataKey?: string;
    metadataValue?: string;
    dispositions?: string[];
};

export const stringifyFFmpegCommandStreamSpecifier = (s: FFmpegCommandStreamSpecifier) => {
    const mapStreamType = (ty: FFmpegCommandStreamSpecifier["streamType"]) => {
        if(ty == "video") return "v";
        if(ty == "video-exclusive") return "V";
        if(ty == "audio") return "a";
        if(ty == "subtitle") return "s";
        if(ty == "data") return "d";
        if(ty == "attachment") return "t";
    };

    return [
        // additional_stream_specifier
        s.streamType ? mapStreamType(s.streamType) : false,
        s.group ? `g:${s.group}` : false,
        s.programId ? `p:` : false,
        s.dispositions?.length ? `disp:${s.dispositions}` : false,

        // units
        s.streamId ? s.streamId : false,
        s.metadataKey ? `m:${s.metadataKey}${s.metadataValue ? (":"+s.metadataValue) : ""}` : false,
        s.streamIndex !== undefined ? s.streamIndex : false,
        s.usable ? "u" : false,
    ].filter(Boolean).join(":");
};
