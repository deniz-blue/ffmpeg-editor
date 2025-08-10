export type FFmpegCapability = "E"|"D"|"F"|"V"|"A"|"S"|"X"|"R"|"B"|"T"|"P";

export interface FFmpegComponent {
    name: string;
    options: FFmpegOption[];
}

export interface FFmpegOption {
    name: string;
    type: string;
    description?: string;
    capabilities?: FFmpegCapability[];
    values?: FFmpegOptionValue[];
    default?: string | number;
}

export interface FFmpegOptionValue {
    value: string | number;
    label?: string;
    capabilities?: FFmpegCapability[];
    description?: string;
}

