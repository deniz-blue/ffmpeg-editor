import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { FFmpegComponent, FFmpegOption } from "./types";

console.log("START");

const sh = (cmd: string) => execSync(cmd, { encoding: "utf8" });

let fullHelpText = readFileSync("./full.log").toString();

let components: FFmpegComponent[] = [];

let component: FFmpegComponent | null = null;
let option: FFmpegOption | null = null;

const flushOption = () => {
    if (!component) return;
    if (option) component.options.push(option);
    option = null;
};

const flushComponent = () => {
    flushOption();
    if (component) components.push(component);
};

for (let line of fullHelpText.split("\n")) {
    if (!line) continue;

    if (line.endsWith("AVOptions:")) {
        flushComponent();

        let sp = line.split(" ");
        sp.pop();
        component = {
            name: sp.join(" "),
            options: [],
        };
    } else {
        if (component) {
            if (line.startsWith("    ")) {
                if (option) {
                    if (option.type == "int") {
                        let [label, value, caps, ...desc] = line.trim().split(" ").filter(Boolean);
                        option.values ||= [];
                        option.values.push({
                            label,
                            value,
                            capabilities: caps.replaceAll(".", "").split("") as any[],
                            description: desc.join(" "),
                        });
                    } else {
                        let [value, caps, ...desc] = line.trim().split(" ").filter(Boolean);
                        option.values ||= [];
                        option.values.push({
                            value,
                            capabilities: caps.replaceAll(".", "").split("") as any[],
                            description: desc.join(" "),
                        });
                    }
                } else {
                    console.log("UNPARSED OPTION VALUE");
                    console.log(line);
                }
            } else if (line.startsWith("  ")) {
                flushOption();
                let [name, type, caps, ...desc] = line.trim().split(" ").filter(Boolean);

                type = type.substring(1, type.length - 1);

                option = {
                    name,
                    type,
                    capabilities: caps.replaceAll(".", "").split("") as any[],
                    description: desc.join(" "),
                };
            } else {
                console.error(line);
            }
        } else {
            // console.log(line);
        }
    }
}



flushComponent();

writeFileSync("./parsed.json", JSON.stringify(components, null, 2));
console.log("DONE");




