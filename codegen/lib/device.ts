export interface FFmpegDeviceInfo {
    id: string;
    label?: string;
    demux: boolean;
    mux: boolean;
}

export const parseDeviceLine = (line: string): FFmpegDeviceInfo => {
    const [caps, id, ...desc] = line.trim().split(" ").filter(Boolean);
    return {
        id,
        label: desc.join(" "),
        demux: caps.includes("D"),
        mux: caps.includes("E"),
    };
};


