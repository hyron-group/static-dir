`static-dir` is an **addons** to allow returning a client file to a folder on the server side


# Usage
## **1. Install**
```bash
npm i @hyron/static-dir
```

## **2. Declare addons to target instance**
#### server/app.json
```json
{
    "base_url" : "http://localhost:3000",
    "addons" : {
        "static-dir" : "@hyron/static-dir"
    }
}
```

# Config
Below are the settings of static-dir addons that you can declare when using

|properties|type|description|
|---|---|---|
|path|string|indicates the path to the static directory on the server. The default is `/public`|
|prefix|string|Specifies the path on the url that will be used to access static files|


## Examle
#### appcfg.yaml
```yaml
static-dir:
  path: /public
  prefix: /file
```