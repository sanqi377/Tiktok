const axios = require("axios");
const request = require("request");
class Analysis {
    async douyin(url) {
        // 截取分享的 url
        var url = url.match(
            /(https?:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/i
        )[0];
        // 第一次跳转后的 url
        var url1 = "";
        await axios({ url: url, method: "post" }).then((res) => {
            url1 = res.request._redirectable._options.pathname;
            url1 = url1.match(/video\/(.*)\//)[1];
        });
        // 第二次跳转后的url
        var url2 =
            "https://www.iesdouyin.com/web/api/v2/aweme/iteminfo/?item_ids=" +
            url1;
        return new Promise((resolve, reject) => {
            request(url2, (err, rep, body) => {
                resolve(JSON.parse(body));
                reject(err);
            });
        })
    }
}

module.exports = Analysis;
