import { Fieldset, Paper, Stack, TextInput } from "@mantine/core";
import { FFmpegFilesList } from "../files/FFmpegFilesList";
import { useState } from "react";
import { FFmpegCommand, stringifyFFmpegCommand } from "../../command/Command";
import { LogLevel } from "../options/LogLevel";

export const MainView = () => {
    const [command, setCommand] = useState<FFmpegCommand>({
        global: [
            { name: "hide_banner", value: "" },
            { name: "y", value: "" },
            { name: "loglevel", value: "verbose" },
        ],
        inputs: [
            {
                url: "input.mp4",
                codecs: [],
                filters: [],
                options: [],
            },
        ],
        outputs: [
            {
                url: "output.mp4",
                codecs: [
                    {
                        name: "libx264",
                        streams: { streamType: "video" },
                        options: [],
                    },
                    {
                        name: "copy",
                        streams: { streamType: "audio" },
                        options: [],
                    },
                ],
                filters: [],
                options: [],
            },
        ],
    });

    return (
        <Stack>
            <TextInput
                label="Command"
                readOnly
                value={stringifyFFmpegCommand(command)}
            />

            <Fieldset bg="dark" legend="Global Options">
                <Stack>
                    <LogLevel
                        value={command.global.find(x => x.name == "loglevel")?.value || ""}
                    />
                </Stack>
            </Fieldset>

            <Fieldset bg="dark" legend="Inputs">
                <FFmpegFilesList
                    files={command.inputs}
                    onChange={inputs => setCommand({ ...command, inputs })}
                    type="input"
                />
            </Fieldset>

            <Fieldset bg="dark" legend="Simple Filtergraph">
                
            </Fieldset>

            <Fieldset bg="dark" legend="Complex Filtergraph">

            </Fieldset>

            <Fieldset bg="dark" legend="Outputs">
                <FFmpegFilesList
                    files={command.outputs}
                    onChange={outputs => setCommand({ ...command, outputs })}
                    type="output"
                />
            </Fieldset>
        </Stack>
    )
};
