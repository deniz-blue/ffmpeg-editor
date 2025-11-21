import { ActionIcon, Badge, Checkbox, Divider, Group, Modal, Pill, Select, Stack, Text, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
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

export interface LogLevelValue {
    enabled: string[];
    disabled: string[];
    level: number | null;
};

export const parseLogLevel = (value: string): LogLevelValue => {
    let enabled: string[] = [];
    let disabled: string[] = [];
    let level: number | null = null;

    if ((value[0] == "+" || value[0] == "-") && value[1] != "8") {
        let sp = value.split(/(?=\+|\-)/);
        for (let s of sp) {
            if (s[0] == "+") enabled.push(s.slice(1));
            if (s[0] == "-") disabled.push(s.slice(1));
        }
    } else {
        let sp = value.split(/(?=\+|\-)/);
        const levelStr = sp.pop().replace(/\+|\-/, "");
        level = isNaN(Number(levelStr)) ? (FFMPEG_LOG_LEVEL_DATA.levels.find(x => x.string == levelStr)?.number ?? null) : Number(levelStr);
        for (let s of sp) {
            if (s[0] == "-") disabled.push(s.slice(1));
            else if (s[0] == "+") enabled.push(s.slice(1));
            else enabled.push(s);
        }
    }

    return {
        enabled,
        disabled,
        level,
    };
};

export const stringifyLogLevel = (data: LogLevelValue) => {
    return [
        data.enabled.map(x => "+"+x).join(""),
        data.disabled.map(x => "-"+x).join(""),
        (((data.disabled.length || data.enabled.length) && data.level !== null) ? "+" : ""),
        ((data.level !== null) ? FFMPEG_LOG_LEVEL_DATA.levels.find(x => x.number == data.level).string : ""),
    ].join("");
};

export const LogLevel = ({
    value,
    onChange,
}: {
    value: string;
    onChange?: (v: string) => void;
}) => {
    const [editing, { close, open }] = useDisclosure();
    const data = parseLogLevel(value);
    const { enabled, disabled, level } = data;

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
                        onClick={open}
                    >
                        <IconPencil />
                    </ActionIcon>
                </Tooltip>

                <Modal opened={editing} onClose={close}>
                    <LogLevelModal
                        value={data}
                        onChange={v => onChange(stringifyLogLevel({
                            ...data,
                            ...v,
                        }))}
                    />
                </Modal>

                {!enabled.length && !disabled.length && (level === null) && (
                    <Text c="dimmed">
                        {"<empty>"}
                    </Text>
                )}

                {enabled.map(flag => (
                    <Tooltip label={FFMPEG_LOG_LEVEL_DATA.flags.find(x => x.value == flag)?.desc ?? ""}>
                        <Badge
                            key={flag}
                            color="green"
                            leftSection={<IconPlus size={16} />}
                            tt="unset"
                        >
                            {flag}
                        </Badge>
                    </Tooltip>
                ))}

                {disabled.map(flag => (
                    <Tooltip label={FFMPEG_LOG_LEVEL_DATA.flags.find(x => x.value == flag)?.desc ?? ""}>
                        <Badge
                            key={flag}
                            color="red"
                            leftSection={<IconMinus size={16} />}
                            tt="unset"
                        >
                            {flag}
                        </Badge>
                    </Tooltip>
                ))}

                {(level !== null) && (
                    <Tooltip label={FFMPEG_LOG_LEVEL_DATA.levels.find(x => x.number == level)?.desc ?? ""}>
                        <Badge
                            color="gray"
                            tt="unset"
                        >
                            {FFMPEG_LOG_LEVEL_DATA.levels.find(x => x.number == level)?.string ?? ""}
                        </Badge>
                    </Tooltip>
                )}
            </Group>
        </Stack>
    )
};

export const LogLevelModal = ({
    value,
    onChange,
}: {
    value: LogLevelValue;
    onChange: (v: Partial<LogLevelValue>) => void;
}) => {
    return (
        <Stack>
            <Select
                label="Log Level"
                data={FFMPEG_LOG_LEVEL_DATA.levels.map(level => ({
                    value: level.number.toString(),
                    label: level.string,
                }))}

                value={value.level?.toString()}
                onChange={v => onChange({
                    level: v ? Number(v) : null,
                })}
            />

            <Divider
                label="Flags"
            />

            {FFMPEG_LOG_LEVEL_DATA.flags.map(flag => (
                <Checkbox
                    key={flag.value}
                    label={flag.value}
                    description={flag.desc}
                    disabled
                />
            ))}
        </Stack>
    );
};
