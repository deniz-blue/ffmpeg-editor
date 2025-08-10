import { Code, Group, Paper, Stack, Text } from "@mantine/core";
import { IconFile } from "@tabler/icons-react";

export const FFmpegFile = () => {
    return (
        <Paper p="xs" w="100%">
            <Group align="center" gap="xs">
                <Text fw="bold" ff="monospace">
                    #0
                </Text>

                <Paper bg="grape">
                    <Stack>
                        <IconFile />
                    </Stack>
                </Paper>

                <Code>
                    filename
                </Code>
            </Group>
        </Paper>
    )
};
