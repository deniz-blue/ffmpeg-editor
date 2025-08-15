import { Code, Group, Paper, Stack, Text } from "@mantine/core";
import { IconFile } from "@tabler/icons-react";
import { FFmpegCommandFile } from "../../command/CommandFile";

export const FFmpegFile = ({
    file,
    index,
    onChange,
}: {
    file: FFmpegCommandFile;
    index: number;
    type: "input" | "output";
    onChange: (v: FFmpegCommandFile) => void;
}) => {
    return (
        <Paper p="xs" w="100%">
            <Stack>
                <Group align="center" gap="xs">
                    <Text fw="bold" ff="monospace">
                        #{index}
                    </Text>

                    <Paper bg="grape">
                        <Stack>
                            <IconFile />
                        </Stack>
                    </Paper>

                    <Code>
                        {file.url}
                    </Code>
                </Group>


            </Stack>
        </Paper>
    )
};
