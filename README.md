AET is a NPM-style project manager for Adobe After Effects

`aet init` - place `.aet.json` to cwd (if it will be)

`aet use nofuture/60sec` - install template named 60sec

`aet use nofuture/60sec --init` - install template named 60sec with init

`aet package` - pack into tar/zip package for sharing

`aet destroy` - destroy project

# .aet.json structure:

`"name" : "my-project"`,

`"author" : "..."`,

`"author" : "..."`,

`"version": "1.0.0"`,

`"description": ""`

In the future I planned to create `aet install <package>` command, but I don't worked with it yet.
