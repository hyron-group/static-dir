const fs = require("fs");
const node_path = require("path");

function verifyPrefix(cfg, url) {
    var prefix = cfg.prefix;

    if (prefix == null) return url;


    if (!url.startsWith(prefix)) {
        return;
    } else {
        return url.substr(prefix.length);
    }
}

function verifyPath(cfg, url) {
    var staticPath = cfg.path || "./public";

    if (staticPath == null) return url;

    return node_path.join(process.cwd(), staticPath, url);
}

/**
 * @param {object} cfg config of this addons
 * @param {string} cfg.path static path from root. default is "./public"  
 * @param {string} cfg.prefix parent path to indicates that this is a static path
 */
function readStaticFile(cfg = {}) {
    
    this.app.on("request", (req, res) => {
        // res.pending = true;
        var url = req.url;
        
        url = verifyPrefix(cfg, url);
        if (url == null) return;
        url = verifyPath(cfg, url);
        
        res.finished = true;
        fs.exists(url, (isExist) => {
            if (isExist) {
                res.finished = false;
                var fileReader = fs.createReadStream(url, {});
                fileReader.pipe(res);
            } else {
                res.writeHead(404, "file is not exist");
                res.end();
            }
        })
    })
}


module.exports = readStaticFile;