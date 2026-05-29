const TelegramBot = require('node-telegram-bot-api');

// =========================
// CẤU HÌNH
// =========================

const token = '8983444821:AAGTT2MbGRESht8zbe9vks6aHVHocX78qCo';
const adminId = 8548576912;
const startPhoto = 'https://i.imgur.com/Ktckzxs.jpeg';
const channelUrl = 'https://t.me/+Y0TODq6QhU84NDll';

// =========================

const bot = new TelegramBot(token, {
polling: true
});

const messageMap = new Map();

console.log('Bot đang hoạt động...');

// =========================
// START
// =========================

bot.onText(//start/, async (msg) => {

const name = msg.from.first_name || 'Bạn';

try {

    await bot.sendPhoto(
        msg.chat.id,
        startPhoto,
        {
            caption: `👋 Xin chào ${name}!

✨ Chào mừng đến với Bot Support

📩 Hãy gửi tin nhắn, ảnh, video, sticker hoặc file để liên hệ admin.

⏰ Admin sẽ phản hồi sớm nhất có thể.

🔥 Cảm ơn bạn đã sử dụng bot!`,
reply_markup: {
inline_keyboard: [
[
{
text: '📢 Kênh Telegram',
url: channelUrl
}
]
]
}
}
);

} catch {

    await bot.sendMessage(
        msg.chat.id,
        `👋 Xin chào ${name}!

✨ Chào mừng đến với Bot Support

📩 Hãy gửi tin nhắn để liên hệ admin.`
);

}

});

// USER -> ADMIN

bot.on('message', async (msg) => {

const chatId = msg.chat.id;

if (chatId === adminId) return;
if (msg.text === '/start') return;

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

    if (sentMessage) {
        messageMap.set(sentMessage.message_id, chatId);
    }

} catch (err) {

    console.error(err);

}

});

// ADMIN REPLY

bot.on('message', async (msg) => {

if (msg.chat.id !== adminId) return;
if (!msg.reply_to_message) return;

const userId = messageMap.get(
    msg.reply_to_message.message_id
);

if (!userId) return;

try {

    await bot.sendMessage(
        userId,
        `📩 Admin:

${msg.text}`
);

} catch (err) {

    console.error(err);

}

});
