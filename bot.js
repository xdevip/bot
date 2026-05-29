const TelegramBot = require('node-telegram-bot-api');

const token = process.env.8983444821:AAFiqXNfZmotL_2zKzWYIEz0lw9whBiVe4c;
const adminId = Number(process.env.8548576912);

const bot = new TelegramBot(token, { polling: true });

// Lưu mapping giữa message admin nhận và user gửi
const messageMap = new Map();

// =======================
// USER -> ADMIN
// =======================

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;

    // Bỏ qua tin nhắn admin (xử lý riêng bên dưới)
    if (chatId === adminId) return;

    try {
        let sentMessage;

        if (msg.text) {
            sentMessage = await bot.sendMessage(
                adminId,
                `📩 Tin nhắn mới\n\n👤 User ID: ${chatId}\n\n${msg.text}`
            );
        }

        else if (msg.photo) {
            const photo = msg.photo[msg.photo.length - 1].file_id;

            sentMessage = await bot.sendPhoto(
                adminId,
                photo,
                {
                    caption: `👤 User ID: ${chatId}\n\n${msg.caption || ''}`
                }
            );
        }

        else if (msg.video) {
            sentMessage = await bot.sendVideo(
                adminId,
                msg.video.file_id,
                {
                    caption: `👤 User ID: ${chatId}\n\n${msg.caption || ''}`
                }
            );
        }

        else if (msg.document) {
            sentMessage = await bot.sendDocument(
                adminId,
                msg.document.file_id,
                {
                    caption: `👤 User ID: ${chatId}\n\n${msg.caption || ''}`
                }
            );
        }

        if (sentMessage) {
            messageMap.set(sentMessage.message_id, chatId);
        }

    } catch (err) {
        console.error(err);
    }
});

// =======================
// ADMIN REPLY -> USER
// =======================

bot.on('message', async (msg) => {

    if (msg.chat.id !== adminId) return;

    if (!msg.reply_to_message) return;

    const originalMessageId = msg.reply_to_message.message_id;

    const userId = messageMap.get(originalMessageId);

    if (!userId) return;

    try {

        // Text
        if (msg.text) {
            await bot.sendMessage(userId, msg.text);
        }

        // Ảnh
        else if (msg.photo) {
            const photo = msg.photo[msg.photo.length - 1].file_id;

            await bot.sendPhoto(
                userId,
                photo,
                {
                    caption: msg.caption || ''
                }
            );
        }

        // Video
        else if (msg.video) {
            await bot.sendVideo(
                userId,
                msg.video.file_id,
                {
                    caption: msg.caption || ''
                }
            );
        }

        // File
        else if (msg.document) {
            await bot.sendDocument(
                userId,
                msg.document.file_id,
                {
                    caption: msg.caption || ''
                }
            );
        }

    } catch (err) {
        console.error(err);
    }
});
