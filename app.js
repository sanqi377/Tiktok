const express = require("express");
const app = express();
const Analysis = require("./analysis");
const api = new Analysis();
app.get("/", (req, res) => {
    let data = req.query;
    if (data.url) {
        api.douyin(data.url).then((val) => {
            res.send({
                code: 200,
                msg: "解析成功",
                data: val,
            });
        });
    } else {
        res.send({ code: 201, msg: "解析失败" });
    }
});

app.listen(3000);
