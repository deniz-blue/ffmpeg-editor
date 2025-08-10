import { Fieldset, Paper, Stack, TextInput } from "@mantine/core";
import { FFmpegFilesList } from "../files/FFmpegFilesList";
import { FFmpegExecutor } from "../exec/FFmpegExecutor";

export const MainView = () => {
    return (
        <Stack>
            <TextInput
                label="Command"
                readOnly
            />

            <Fieldset bg="dark" legend="Global Options">

            </Fieldset>

            <Fieldset bg="dark" legend="Inputs">
                <FFmpegFilesList
                    type="input"
                />
            </Fieldset>

            <Fieldset bg="dark" legend="Complex Filtergraph">

            </Fieldset>

            <Fieldset bg="dark" legend="Outputs">
                <FFmpegFilesList
                    type="output"
                />
            </Fieldset>

            <FFmpegExecutor />
        </Stack>
    )
};
