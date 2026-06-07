const TelegramBot = require('node-telegram-bot-api');

// ===== TOKEN BOT =====
const token = '8873280492:AAHzAjd34XghpbGck0sIrsaGHCWYcDdCabQ';

// =====================

const bot = new TelegramBot(token, {
    polling: true
});

console.log('🤖 Bot đang chạy...');

// Khi người dùng nhấn /start
bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const name = msg.from.first_name || 'Bạn';

    try {
        await bot.sendVideo(
            chatId,
            'https://www.image2url.com/r2/default/videos/1780843370785-6fae0758-ea7e-4b82-8cb6-0cb4be9be971.mp4', // Thay bằng link video của bạn
            {
                caption: `👋 Xin chào ${name}!

🤖 Chào mừng bạn đến với bot.

📌 Nhấn nút bên dưới để tiếp tục.`,
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: '📢 Kênh Telegram',
                                url: 'https://t.me/tenkenh'
                            }
                        ]
                    ]
                }
            }
        );
    } catch (error) {
        console.log(error);
    }
});

// Tự động phản hồi tin nhắn
bot.on('message', async (msg) => {
    if (msg.text === '/start') return;

    await bot.sendMessage(
        msg.chat.id,
        '📩 Mình đã nhận được tin nhắn của bạn!'
    );
});
