import * as github from "octonode";
import * as path from "path";
import * as fs from "fs";
import {pack, unpack} from "tar-pack";

let DownloadProgress: any = require("download-progress");

export class AET {
    public static REPO = 'Serabass/aet-templates';
    public static JSONFILE = '.aet.json';

    private client: any;
    private repo: any;

    public static defaultJson(name: string) {
        return {
            name: name,
            author: "",
            description: ""
        };
    }

    public static get cwd(): string {
        return process.cwd();
    }

    constructor(public path: string, public name: string = null) {
        this.client = github.client();
        this.repo = this.client.repo(AET.REPO);
    }

    public static fromPackage(packagePath: string, destPath: string = AET.cwd): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            var read = require('fs').createReadStream;
            read(packagePath)
                .pipe(unpack(destPath, function(err: any) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve();
                }))
        });
    }

    public static initInCWD(name: string = null): AET {
        let projectPath: string;
        if (name) {
            projectPath = path.join(AET.cwd, name);
            fs.mkdirSync(projectPath);
        } else {
            projectPath = AET.cwd;
        }
        return AET.init(projectPath, name);
    }

    public static init(projectPath: string, name: string = null): AET {
        let jsonFileDestPath = path.join(projectPath, AET.JSONFILE);
        let json = AET.defaultJson(name);
        let jsonString = JSON.stringify(json, null, 2);

        if (!fs.existsSync(projectPath)) {
            fs.mkdirSync(projectPath);
        }

        fs.writeFileSync(jsonFileDestPath, jsonString, {
            flag: 'w+'
        });

        return new AET(projectPath, name);
    }

    public static fromCWD(): AET {
        return new AET(AET.cwd);
    }

    private contents(remotePath: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.repo.contents(remotePath, function(err: any, files: any) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(files);
            });
        });
    }

    private download(files: any[]): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            let download = new DownloadProgress(files, {});
            download.get(function(err: any) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }

    public async use(remotePath: string) {
        let projectRoot = path.join('after-effects', remotePath);
        let data = await this.contents(projectRoot);
        let files = data.map((file: any) => {
            let filePath = file.path;

            if (filePath.replace(/[/\\]/g, '/').startsWith(projectRoot.replace(/[/\\]/g, '/'))) {
                filePath = filePath.substring(projectRoot.length);
            }

            return {
                url: file.download_url,
                dest: path.join(this.path, filePath)
            }
        });
        await this.download(files);
    }

    public package(destroy: boolean = false): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            let write = fs.createWriteStream;
            pack(this.path)
                .pipe(write(path.join(this.path, '/package.tar.gz')))
                .on('error', function(err: any) {
                    reject(err);
                })
                .on('close', function() {
                    reject();
                });
        });
    }

    public destroy(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            fs.unlink(path.join(this.path, AET.JSONFILE), function(err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }
}