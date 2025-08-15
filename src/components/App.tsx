import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { Layout } from "./layout/Layout";
import { MainView } from "./view/MainView";

export const App = () => {
    return (
        <MantineProvider forceColorScheme="dark">
            <Notifications />
            {/* <FFmpegWasmProvider> */}
                <ModalsProvider>
                    <Layout>
                        <MainView />
                    </Layout>
                </ModalsProvider>
            {/* </FFmpegWasmProvider> */}
        </MantineProvider>
    );
};
