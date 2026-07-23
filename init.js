const mongoose = require( "mongoose" );
const Chat = require( "./models/chat.js" );

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/watshapp");
}

main()
    .then(() => {
        console.log( "Connected to MongoDB" );
    })
    .catch(( err ) => console.log( err ));

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

    Chat.insertMany(allchats);