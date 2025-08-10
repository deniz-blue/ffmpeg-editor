import { Code, Loader, Stack, Text } from "@mantine/core";
import { useFFmpeg } from "./FFmpegWasmContext";
import { useEffect, useState } from "react";

export const FFmpegExecutor = () => {
    const { ffmpeg, execSync } = useFFmpeg();

    const [text, setText] = useState("");

    useEffect(() => {
        if(ffmpeg.loaded) execSync(["-h"]).then(out => setText(out.stdout));
    }, [ffmpeg.loaded]);

    return (
        <Stack align="center">
            {!ffmpeg.loaded ? (
                <Stack align="center">
                    <Loader />
                    <Text>
                        Loading FFMPEG WASM...
                    </Text>
                </Stack>
            ) : (
                <Stack>
                    <Code block style={{ textWrap: "wrap" }}>
                        {text}
                    </Code>
                </Stack>
            )}
        </Stack>
    )
};
