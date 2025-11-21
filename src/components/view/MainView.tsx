import { Fieldset, Paper, Stack, TextInput } from "@mantine/core";
import { FFmpegFilesList } from "../files/FFmpegFilesList";
import { useState } from "react";
import { FFmpegCommand, stringifyFFmpegCommand } from "../../command/Command";
import { LogLevel } from "../options/LogLevel";
import { useCommand } from "../../store/useCommand";

export const MainView = () => {
    const command = useCommand(store => store.command);

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
                        onChange={value => {
                            useCommand.setState(state => {
                                const arg = state.command.global.find(x => x.name == "loglevel");
                                if (!arg) return;
                                arg.value = value;
                            })
                        }}
                    />
                </Stack>
            </Fieldset>

            <Fieldset bg="dark" legend="Inputs">
                <FFmpegFilesList
                    files={command.inputs}
                    onChange={inputs => ({ ...command, inputs })}
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
                    onChange={outputs => ({ ...command, outputs })}
                    type="output"
                />
            </Fieldset>
        </Stack>
    )
};
