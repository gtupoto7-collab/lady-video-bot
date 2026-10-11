const http = require('http');
http.createServer((req, res) => {
  res.write('Lady Video Bot is Online 24/7!');
  res.end();
}).listen(process.env.PORT || 3000);
const { Telegraf, Markup } = require('telegraf');

const BOT_TOKEN = '8747879041:AAFWiAMd7eqcYu2kb3MbQ3ornqGRgfoD9bw';
const bot = new Telegraf(BOT_TOKEN);
const ADMIN_USERNAME = 'ADMIRALERROR'; 

const videoCatalog = [
  {
    id: 'vid_01',
    title: '🔥 Премиум Видео Пакет 1',
    description: 'Ексклузивно видео съдържание в Full HD резолюция.',
    price: '15 BGN / 10 USDT'
  },
  {
    id: 'vid_02',
    title: '🎬 Ексклузивен Клип 2',
    description: 'Специално заснети кадри с високо качество.',
    price: '25 BGN / 15 USDT'
  }
];

bot.start((ctx) => {
  const welcomeText = "👑 Добре дошли в LADY VIDEO BOT 👑\n\nВашият автоматизиран магазин за видео съдържание.\nИзберете опция от менюто по-долу:";
  ctx.reply(welcomeText, Markup.inlineKeyboard([
    [Markup.button.callback('🎬 Разгледай Каталога', 'SHOW_CATALOG')],
    [Markup.button.callback('💎 Инфо & Помощ', 'SHOW_INFO')],
    [Markup.button.callback('📩 Връзка с Админ', 'CONTACT_ADMIN')]
  ]));
});

bot.action('SHOW_CATALOG', (ctx) => {
  ctx.answerCbQuery();
  let catalogMessage = "🛍️ Каталог LADY Store:\n\n";
  const buttons = [];

  videoCatalog.forEach((item) => {
    catalogMessage += `📌 ${item.title}\n💰 Цена: ${item.price}\n📝 ${item.description}\n\n`;
    buttons.push([Markup.button.callback(`Купи: ${item.title}`, `BUY_${item.id}`)]);
  });

  buttons.push([Markup.button.callback('⬅️ Главна страница', 'GO_HOME')]);
  ctx.reply(catalogMessage, Markup.inlineKeyboard(buttons));
});

videoCatalog.forEach((item) => {
  bot.action(`BUY_${item.id}`, (ctx) => {
    ctx.answerCbQuery();
    const paymentText = `🛒 Поръчка: ${item.title}\n💵 Сума: ${item.price}\n\nИзберете метод за плащане:`;
    ctx.reply(paymentText, Markup.inlineKeyboard([
      [Markup.button.callback('💎 Крипто (USDT TRC20)', `PAY_CRYPTO_${item.id}`)],
      [Markup.button.callback('💳 Revolut / Банка', `PAY_REVOLUT_${item.id}`)],
      [Markup.button.callback('⬅️ Назад към Каталога', 'SHOW_CATALOG')]
    ]));
  });

  bot.action(`PAY_CRYPTO_${item.id}`, (ctx) => {
    ctx.answerCbQuery();
    ctx.reply(`⚙️ Плащане с Крипто:\n\nЗа да закупите ${item.title}, изпратете сумата на USDT TRC20 адрес:\n\nTROYA_USDT_TRC20_ADRES\n\nСлед превода изпратете скриншот на админа: @${ADMIN_USERNAME}`);
  });

  bot.action(`PAY_REVOLUT_${item.id}`, (ctx) => {
    ctx.answerCbQuery();
    ctx.reply(`💳 Плащане с Revolut:\n\nЗа да закупите ${item.title}, изпратете сумата на Revolut:\n\n@your_revolut_tag\n\nСлед превода изпратете потвърждение на админа: @${ADMIN_USERNAME}`);
  });
});

bot.action('GO_HOME', (ctx) => {
  ctx.answerCbQuery();
  ctx.start();
});

bot.action('SHOW_INFO', (ctx) => {
  ctx.answerCbQuery();
  ctx.reply('ℹ️ Изберете видео от каталога, извършете плащането и потвърдете с админа за моментален достъп.');
});

bot.action('CONTACT_ADMIN', (ctx) => {
  ctx.answerCbQuery();
  ctx.reply(`📩 За въпроси и ръчни плащания: @${ADMIN_USERNAME}`);
});

bot.launch();
console.log('🚀 Lady Video Bot е онлайн и работи!');

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'))  
