# Simple Fluid/Liquid template renderer

Simple web app to render [Fluid](https://github.com/sebastienros/fluid) .NET
templates with the provided JSON context.

## Usage

Consists of the simplest API to render a template with the context provided as
JSON payload in format:

```
POST /api/render:

{
  "template": "foo {{bar}}",
  "context": {
    "bar": "biz"
  }
}
```

will return:

```
{
  "success": true,
  "data": "foo biz",
  "error": null
}
```

A simple solidjs frontend is provided for posting this data through a web form.

## Deploy with docker

App can be launched with the provided docker file:

```sh
docker build . -t fluidrenderer

docker run -p 5005:8080 fluidrenderer
```
