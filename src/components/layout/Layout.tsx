import { ActionIcon, Anchor, AppShell, Container, Group, Paper, Space, Stack, Text, Title, Tooltip } from "@mantine/core";
import { IconCommand, IconExternalLink, IconTerminal } from "@tabler/icons-react";
import { PropsWithChildren } from "react";

export const Layout = ({ children }: PropsWithChildren) => {
    return (
        <AppShell
            padding="sm"
        >
            <AppShell.Main pt={0}>
                <Container>
                    <Stack gap="sm">
                        <Paper
                            bg="dark"
                            withBorder
                            radius="lg"
                            style={{
                                borderTop: "unset",
                                borderTopLeftRadius: "unset",
                                borderTopRightRadius: "unset",
                            }}
                        >
                            <Group gap={0} justify="space-between" p="xs">
                                <Group gap="xs">
                                    <IconTerminal />
                                    <Title order={4}>
                                        FFmpeg Editor
                                    </Title>
                                    <Text inline c="dimmed">
                                        Edit FFmpeg Commands
                                    </Text>
                                </Group>
                                <Tooltip label="Developer">
                                    <Anchor
                                        href="https://deniz.blue/"
                                    >
                                        <Group gap={4}>
                                            <Text inherit>deniz.blue</Text>
                                            <IconExternalLink size={16} />
                                        </Group>
                                    </Anchor>
                                </Tooltip>
                            </Group>
                        </Paper>

                        {children}
                    </Stack>
                </Container>
                <Space h="50vh" />
            </AppShell.Main>
        </AppShell>
    )
};
