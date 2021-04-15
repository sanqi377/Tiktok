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
                var val = JSON.parse(body);
                // 视频标题
                var title = val["item_list"][0]["share_info"]["share_title"];
                // 无水印视频地址
                var video = val["item_list"][0]["video"]["play_addr"][
                    "url_list"
                ][0].replace(/playwm/, "play");
                // 视频封面
                var cover =
                    val["item_list"][0]["video"]["origin_cover"]["url_list"][0];
                // 视频音乐
                var music =
                    val["item_list"][0]["music"]["play_url"]["url_list"][0];
                axios({ url: video, method: "post" }).then((res) => {
                    video = res.headers.location.replace(/http/, "https");
                    var data = {
                        title: title,
                        video: video,
                        cover: cover,
                        music: music,
                    };
                    resolve(data);
                    reject(err);
                });
            });
        });
    }
}

module.exports = Analysis;
