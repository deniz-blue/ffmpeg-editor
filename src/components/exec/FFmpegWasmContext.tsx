import { FFmpeg } from "@ffmpeg/ffmpeg";
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from "react";
import { useForceUpdate } from "@mantine/hooks";
import coreURL from "@ffmpeg/core?url"
import wasmURL from "@ffmpeg/core/wasm?url"

export const FFmpegWasmContext = createContext<{
    ffmpeg: FFmpeg;
    load: () => void;
    execSync: (args: string[]) => Promise<{ code: number; stdout: string; }>;
    error: any;
}>({
    ffmpeg: new FFmpeg(),
    load: () => { },
    execSync: () => { throw new Error("unimplemented") },
    error: null,
});

export const useFFmpeg = () => useContext(FFmpegWasmContext);

export const FFmpegWasmProvider = ({ children }: PropsWithChildren) => {
    const [ffmpeg] = useState(() => {
        const ffmpeg = new FFmpeg();
        ffmpeg.on("log", ({ message }) => console.log(message));
        return ffmpeg;
    });

    const [error, setError] = useState<any>(null);
    const update = useForceUpdate();

    const load = useCallback(async () => {
        try {
            await ffmpeg.load({
                coreURL,
                wasmURL,
            });
            update();
        } catch (e) {
            console.error(e);
            setError(e);
        }
    }, []);

    const execSync = useCallback(async (args: string[], probe?: boolean) => {
        if (!ffmpeg.loaded) return;

        let stdout: string[] = [];
        let cb = ({ type, message }) => {
            console.log({ type, message })
            stdout.push(message);
        };

        ffmpeg.on("log", cb);
        let code = await (probe ? ffmpeg.ffprobe(args) : ffmpeg.exec(args));
        ffmpeg.off("log", cb);

        return {
            code,
            stdout: stdout.join("\n"),
        };
    }, []);

    useEffect(() => void load(), []);

    return (
        <FFmpegWasmContext value={{
            ffmpeg,
            load,
            execSync,
            error,
        }}>
            {children}
        </FFmpegWasmContext>
    )
};
