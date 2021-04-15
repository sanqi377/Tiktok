const express = require("express");
const app = express();
const Analysis = require("./analysis");
const api = new Analysis();
app.get("/", (req, res) => {
    api.douyin(
        "2.5 eb:/ 视频比较长，耐心看完哦 %周慧敏  %刘青云  %郭蔼明  %郑少秋  https://v.douyin.com/eM4rxF8/ 復制此鏈接，打开Douyin搜索，直接观看视频！"
    ).then((val) => {
        // 视频标题
        var title = val["item_list"][0]["share_info"]["share_title"];
        // 无水印视频地址
        var video = val["item_list"][0]["video"]["play_addr"][
            "url_list"
        ][0].replace(/playwm/, "play");
        // 视频封面
        var cover = val["item_list"][0]["video"]["origin_cover"]["url_list"][0];
        // 视频音乐
        var music = val["item_list"][0]["music"]["play_url"]["url_list"][0];
        res.send({
            code: 200,
            msg: "解析成功",
            data: { title: title, video: video, cover: cover, music: music },
        });
    });
});

app.listen(3000);
