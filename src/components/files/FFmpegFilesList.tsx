import { Button, Group, Stack } from "@mantine/core";
import { FFmpegFile } from "./FFmpegFile";
import { IconFilePlus } from "@tabler/icons-react";
import { FFmpegCommandFile } from "../../command/CommandFile";

export const FFmpegFilesList = ({
    files,
    onChange,
    type,
}: {
    files: FFmpegCommandFile[];
    onChange: (files: FFmpegCommandFile[]) => void;
    type: "input" | "output";
}) => {
    return (
        <Stack>
            {files.map((file, i) => (
                <FFmpegFile
                    file={file}
                    index={i}
                    type={type}
                    onChange={(v) => onChange(files.map(old => old == file ? v : old))}
                    key={i}
                />
            ))}

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
