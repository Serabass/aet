AET is a NPM-style project manager for Adobe After Effects

`aet init [--name=<name>]` - place `.aet.json` to cwd (if it will be)
`aet use nf/60s [<path>] [--init|-i]` - install template named nf/60s
`aet package [<path>] [--destroy|-d]` - pack into tar/zip package for sharing and destroy if --destroy passed
`aet destroy` - destroy project

# .aet.json structure:

`"name" : "my-project"`,
`"author" : "..."`,
`"version": "1.0.0"`,
`"description": ""`
`"dependencies": {...}`

In the future I planned to create `aet install/add <package>` command, but I don't worked with it yet.

My idea is to rename project to ART (or another) and use it everywhere but After Effects.
For example it may be a repo with templates for Photoshop, AE, Premiere, Corel, 3D Max etc.

Variations of name:
Art
Abt - Art Boilerplate Templates

