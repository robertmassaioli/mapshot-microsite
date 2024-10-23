import * as fs from 'fs';
import * as path from 'path';
import { Command } from 'commander';

interface MapshotData {
    savename: string;
    unique_id: string;
    ticks_played: number;
}

function traverseDirectory(rootDir: string): Record<string, MapshotData[]> {
    const saveData: Record<string, MapshotData[]> = {};

    const saveDirs = fs.readdirSync(rootDir).filter(dir => {
        return fs.statSync(path.join(rootDir, dir)).isDirectory();
    });

    for (const saveDir of saveDirs) {
        const savePath = path.join(rootDir, saveDir);
        const mapshotDirs = fs.readdirSync(savePath).filter(dir => {
            return fs.statSync(path.join(savePath, dir)).isDirectory();
        });

        for (const mapshotDir of mapshotDirs) {
            const mapshotPath = path.join(savePath, mapshotDir, 'mapshot.json');
            if (fs.existsSync(mapshotPath)) {
                const mapshotData: MapshotData = JSON.parse(fs.readFileSync(mapshotPath, 'utf8'));
                if (!saveData[saveDir]) {
                    saveData[saveDir] = [];
                }
                saveData[saveDir].push({
                    savename: mapshotData.savename,
                    unique_id: mapshotData.unique_id,
                    ticks_played: mapshotData.ticks_played
                });
            }
        }
    }

    return saveData;
}

function writeSavesJson(rootDir: string): void {
    const saveData = traverseDirectory(rootDir);
    const savesJsonPath = path.join(rootDir, 'saves.json');
    fs.writeFileSync(savesJsonPath, JSON.stringify(saveData, null, 4));
}

const program = new Command();

program
    .name('mapshot-manager')
    .description('CLI to manage mapshot generated images.')
    .version('1.0.0');

program
    .command('generate-index')
    .description('Generate an index of Factorio saves')
    .requiredOption('--root-dir <path>', 'Root directory containing Factorio saves')
    .action((options) => {
        writeSavesJson(options.rootDir);
        console.log(`saves.json has been created in ${options.rootDir}`);
    });

program.parse(process.argv);