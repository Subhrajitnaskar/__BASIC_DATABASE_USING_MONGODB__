const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const Chat = require("./models/chat.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/watshapp");
}

//index route
app.get("/chats", async (req, res) => {
    try {
        let chats = await Chat.find();
        res.render("index.ejs", { chats });
    } catch (err) {
        console.log(err);
        res.status(500).send("Unable to load chats");
    }
});

app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/chats", async (req, res) => {
    try {
        let { from, to, msg } = req.body;
        let newchat = new Chat({
            from: from,
            to: to,
            msg: msg,
            created_at: new Date(),
        });

        await newchat.save();
        console.log("Chat Save");
        res.redirect("/chats");
    } catch (err) {
        console.log(err);
        res.status(400).send("Unable to save chat. Please check the entered details.");
    }
});

app.get("/chats/:id/edit", async (req, res) => {
    try {
        let { id } = req.params;
        let chat = await Chat.findById(id);
        if (!chat) return res.status(404).send("Chat not found");
        res.render("edit.ejs", { chat });
    } catch (err) {
        console.log(err);
        res.status(400).send("Invalid chat ID");
    }
});

app.put("/chats/:id", async (req, res) => {
    try {
        let { id } = req.params;
        let { msg: newmsg } = req.body;
        console.log(newmsg);
        let updatedchat = await Chat.findByIdAndUpdate(
            id,
            { msg: newmsg },
            { runValidators: true, new: true }
        );
        if (!updatedchat) return res.status(404).send("Chat not found");
        console.log(updatedchat);
        res.redirect("/chats");
    } catch (err) {
        console.log(err);
        res.status(400).send("Unable to update chat");
    }
});

app.delete("/chats/:id", async (req, res) => {
    try {
        let { id } = req.params;
        let deletedChat = await Chat.findByIdAndDelete(id);
        if (!deletedChat) return res.status(404).send("Chat not found");
        console.log(deletedChat);
        res.redirect("/chats");
    } catch (err) {
        console.log(err);
        res.status(400).send("Unable to delete chat");
    }
});

app.get("/", (req, res) => {
    res.send("Root is Working");
});

main()
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(8080, () => {
            console.log("Server is running on port 8080");
        });
    })
    .catch((err) => {
        console.log("MongoDB connection error:", err);
        process.exit(1);
    });
