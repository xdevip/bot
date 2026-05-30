const TelegramBot = require('node-telegram-bot-api');

// =========================
// THAY THÔNG TIN Ở ĐÂY
// =========================
const token = '8983444821:AAGTT2MbGRESht8zbe9vks6aHVHocX78qCo';
const adminId = 8548576912;
// Ví dụ:
// const token = '1234567890:AAxxxxxxxxxxxxxxxxxxxx';
// const adminId = 8548576912;
// =========================

const bot = new TelegramBot(token, {
polling: true
});

const messageMap = new Map();

console.log('Bot đang hoạt động...');

// =========================
// USER -> ADMIN
// =========================

bot.on('message', async (msg) => {

const chatId = msg.chat.id;

if (chatId === adminId) return;

try {

    let sentMessage = null;

    if (msg.text) {

        sentMessage = await bot.sendMessage(
            adminId,
            `📩 Tin nhắn mới

👤 User ID: ${chatId}

💬 ${msg.text}`
);

    }

    else if (msg.photo) {

        const photo =
            msg.photo[msg.photo.length - 1].file_id;

        sentMessage = await bot.sendPhoto(
            adminId,
            photo,
            {
                caption: `📷 Ảnh mới

👤 User ID: ${chatId}

${msg.caption || ''}`
}
);

    }

    else if (msg.video) {

        sentMessage = await bot.sendVideo(
            adminId,
            msg.video.file_id,
            {
                caption: `🎥 Video mới

👤 User ID: ${chatId}

${msg.caption || ''}`
}
);

    }

    else if (msg.document) {

        sentMessage = await bot.sendDocument(
            adminId,
            msg.document.file_id,
            {
                caption: `📁 File mới

👤 User ID: ${chatId}

${msg.caption || ''}`
}
);

    }

    else if (msg.sticker) {

        sentMessage = await bot.sendSticker(
            adminId,
            msg.sticker.file_id
        );

    }

    else if (msg.voice) {

        sentMessage = await bot.sendVoice(
            adminId,
            msg.voice.file_id
        );

    }

    if (sentMessage) {

        messageMap.set(
            sentMessage.message_id,
            chatId
        );

    }

} catch (error) {

    console.error(error);

}

});

// =========================
// ADMIN REPLY -> USER
// =========================

bot.on('message', async (msg) => {

if (msg.chat.id !== adminId) return;

if (!msg.reply_to_message) return;

const userId = messageMap.get(
    msg.reply_to_message.message_id
);

if (!userId) return;

try {

    if (msg.text) {

        await bot.sendMessage(
            userId,
            msg.text
        );

    }

    else if (msg.photo) {

        const photo =
            msg.photo[msg.photo.length - 1].file_id;

        await bot.sendPhoto(
            userId,
            photo,
            {
                caption: msg.caption || ''
            }
        );

    }

    else if (msg.video) {

        await bot.sendVideo(
            userId,
            msg.video.file_id,
            {
                caption: msg.caption || ''
            }
        );

    }

    else if (msg.document) {

        await bot.sendDocument(
            userId,
            msg.document.file_id,
            {
                caption: msg.caption || ''
            }
        );

    }

    else if (msg.sticker) {

        await bot.sendSticker(
            userId,
            msg.sticker.file_id
        );

    }

    else if (msg.voice) {

        await bot.sendVoice(
            userId,
            msg.voice.file_id
        );

    }

} catch (error) {

    console.error(error);

}

});
