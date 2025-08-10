import { Button, Group, Stack } from "@mantine/core";
import { FFmpegFile } from "./FFmpegFile";
import { IconFilePlus } from "@tabler/icons-react";

export const FFmpegFilesList = ({
    type,
}: {
    type: "input" | "output";
}) => {
    return (
        <Stack>
            <FFmpegFile />

            <Group>
                <Button
                    variant="light"
                    color="gray"
                    leftSection={<IconFilePlus />}
                >
                    Add {type}
                </Button>
            </Group>
        </Stack>
    );
};
