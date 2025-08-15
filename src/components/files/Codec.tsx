import { Stack, Text } from "@mantine/core";
import { FFmpegCommandCodec } from "../../command/CommandCodec";
import { FFMPEG_DATA } from "../../data";

export const Codec = ({
    codec,
    type,
}: {
    codec: FFmpegCommandCodec;
    type: "input" | "output";
}) => {
    let codecData = FFMPEG_DATA.codecs.find(c => (
        c[type == "input" ? "decode" : "encode"] && c.id == codec.name
    ));

    if(!codecData) return (
        <Text c="red">
            {`<unknown ${type == "input" ? "decoder" : "encoder"}: ${codec.name}>`}
        </Text>
    );

    return (
        <Stack>
            <Text>
                {codecData.type}
                {" "}
                {codecData.id}
            </Text>
        </Stack>
    )
};
