const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));


main()
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/watshapp");
}

//index route
app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    res.render("index", {chats});
});


let chat1 = new Chat({
    from: "Jitu",
    to: "Ma",
    msg: "Send me your Sheet",
    created_at: new Date(),
});
chat1.save().then((res) => {
    console.log(res);
});

app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/chats", async (req, res) => {
    let {from, to, msg} = req.body;
    let newchat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date(),
    });

    newchat
    .save()
    .then((res) => {
        console.log("Chat Save");
    })
    .catch((err) => {
        console.log(err);
    });    
    res.redirect("/chats");
});

app.get("/chats/:id/edit", async(req,res)=> {
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", {chat});
});

app.put("/chats/:id",async(req,res) => {
    let {id} = req.params;
    let{msg: newmsg} = req.body;
    console.log(newmsg);
    let updatedchat = await Chat.findByIdAndUpdate(
        id,
        {msg: newmsg},
        {runValidators: true, new: true}
    );
    console.log(updatedchat);
    res.redirect("/chats");
});

app.delete("/chats/:id", async(req,res) => {
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
});

app.get("/", (req,res) => {
    res.send("Root is Working");
});

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});