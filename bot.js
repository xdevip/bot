const TelegramBot = require('node-telegram-bot-api');

const token = '8983444821:AAFiqXNfZmotL_2zKzWYIEz0lw9whBiVe4c';
const adminId = 8548576912; // ID Telegram của bạn

const bot = new TelegramBot(token, { polling: true });

// User nhắn bot
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;

    // Không forward tin của admin
    if (chatId == adminId) return;

    // Gửi tin nhắn user cho admin
    bot.sendMessage(adminId,
        `📩 Tin nhắn mới\n\n👤 ID: ${chatId}\n💬 ${msg.text}`
    );

    // Reply tự động
    bot.sendMessage(chatId,
        '✅ Tin nhắn của bạn đã được gửi tới admin.'
    );
});

// Admin trả lời
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;

    // Chỉ admin mới dùng
    if (chatId != adminId) return;

    // Format:
    // /reply ID nội_dung

    if (msg.text.startsWith('/reply')) {
        const args = msg.text.split(' ');

        const userId = args[1];
        const text = args.slice(2).join(' ');

        bot.sendMessage(userId,
            `📨 Admin:\n${text}`
        );

        bot.sendMessage(adminId,
            '✅ Đã gửi.'
        );
    }
});
