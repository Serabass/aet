AET is a NPM-style project manager for Adobe After Effects

`aet init [--name=<name>]` - place `.aet.json` to cwd (if it will be)
`aet use nf/60s [<path>] [--init|-i]` - install template named 60sec
`aet package [<path>] [--destroy|-d]` - pack into tar/zip package for sharing and destroy if --destroy passed
`aet destroy` - destroy project

# .aet.json structure:

`"name" : "my-project"`,
`"author" : "..."`,
`"author" : "..."`,
`"version": "1.0.0"`,
`"description": ""`

In the future I planned to create `aet install <package>` command, but I don't worked with it yet.
