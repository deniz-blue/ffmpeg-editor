import { ActionIcon, Badge, Group, Pill, Stack, Text, Tooltip } from "@mantine/core";
import { IconMinus, IconPencil, IconPlus } from "@tabler/icons-react";

export const FFMPEG_LOG_LEVEL_DATA = {
    flags: [
        {
            value: "repeat",
            desc: "Indicates that repeated log output should not be compressed to the first line and the \"Last message repeated n times\" line will be omitted.",
        },
        {
            value: "level",
            desc: "Indicates that log output should add a [level] prefix to each message line. This can be used as an alternative to log coloring, e.g. when dumping the log to file.",
        },
        {
            value: "time",
            desc: "Indicates that log lines should be prefixed with time information.",
        },
        {
            value: "datetime",
            desc: "Indicates that log lines should be prefixed with date and time information.",
        },
    ],
    levels: [
        {
            number: -8,
            string: "quiet",
            desc: "Show nothing at all; be silent.",
        },
        {
            number: 0,
            string: "panic",
            desc: "Only show fatal errors which could lead the process to crash, such as an assertion failure. This is not currently used for anything.",
        },
        {
            number: 8,
            string: "fatal",
            desc: "Only show fatal errors. These are errors after which the process absolutely cannot continue.",
        },
        {
            number: 16,
            string: "error",
            desc: "Show all errors, including ones which can be recovered from.",
        },
        {
            number: 24,
            string: "warning",
            desc: "Show all warnings and errors. Any message related to possibly incorrect or unexpected events will be shown.",
        },
        {
            number: 32,
            string: "info",
            desc: "Show informative messages during processing. This is in addition to warnings and errors. This is the default value.",
        },
        {
            number: 40,
            string: "verbose",
            desc: "Same as info, except more verbose.",
        },
        {
            number: 48,
            string: "debug",
            desc: "Show everything, including debugging information.",
        },
        {
            number: 56,
            string: "trace",
            desc: "",
        },
    ],
};

export const LogLevel = ({
    value,
    onChange,
}: {
    value: string;
    onChange?: string;
}) => {

    let enabledFlags: string[] = [];
    let disabledFlags: string[] = [];
    let setLevel: string | null = null;

    if (value[0] == "+" || value[0] == "-") {
        let sp = value.split(/(?=\+|\-)/);
        for(let s of sp) {
            if(s[0] == "+") enabledFlags.push(s.slice(1));
            if(s[0] == "-") disabledFlags.push(s.slice(1));
        }
    } else {
        let sp = value.split(/(?=\+|\-)/);
        setLevel = sp.pop().replace(/\+|\-/, "");
        for(let s of sp) {
            if(s[0] == "-") disabledFlags.push(s.slice(1));
            else if(s[0] == "+") enabledFlags.push(s.slice(1));
            else enabledFlags.push(s);
        }
    }

    return (
        <Stack gap={4}>
            <Text inline fz="xs" fw="bold">
                LOGLEVEL
            </Text>
            <Group gap={4}>
                <Tooltip label="Edit">
                    <ActionIcon
                        variant="subtle"
                        color="gray"
                        size="sm"
                    >
                        <IconPencil />
                    </ActionIcon>
                </Tooltip>

                {!enabledFlags.length && !disabledFlags.length && !setLevel && (
                    <Text c="dimmed">
                        {"<empty>"}
                    </Text>
                )}

                {enabledFlags.map(flag => (
                    <Badge
                        key={flag}
                        color="green"
                        leftSection={<IconPlus size={16} />}
                        tt="unset"
                    >
                        {flag}
                    </Badge>
                ))}

                {disabledFlags.map(flag => (
                    <Badge
                        key={flag}
                        color="red"
                        leftSection={<IconMinus size={16} />}
                        tt="unset"
                    >
                        {flag}
                    </Badge>
                ))}

                {setLevel && (
                    <Badge
                        color="gray"
                        tt="unset"
                    >
                        {setLevel}
                    </Badge>
                )}
            </Group>
        </Stack>
    )
};
