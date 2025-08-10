import { AppShell, Space } from "@mantine/core";
import { PropsWithChildren } from "react";

export const Layout = ({ children }: PropsWithChildren) => {
    return (
        <AppShell
            padding="sm"
        >
            <AppShell.Main>
                {children}
                <Space h="50vh" />
            </AppShell.Main>
        </AppShell>
    )
};
