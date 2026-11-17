const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

async function main() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/watshapp");
        console.log("Connected to MongoDB");

        let allchats = [
            {
                from: "Jitu",
                to: "Ma",
                msg: "Send me your Sheet",
                created_at: new Date(),
            },
            {
                from: "Ma",
                to: "Jitu",
                msg: "Ok",
                created_at: new Date(),
            },
            {
                from: "Jitu",
                to: "Ma",
                msg: "Send me your Sheet",
                created_at: new Date(),
            },
        ];

        await Chat.insertMany(allchats);
        console.log("Sample chats inserted successfully");
    } catch (err) {
        console.log(err);
    } finally {
        await mongoose.connection.close();
    }
}

main();
