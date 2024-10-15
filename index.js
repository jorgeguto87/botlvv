const qrcode = require('qrcode-terminal');
const { Client, Buttons, List, MessageMedia, MessageTypes } = require('whatsapp-web.js');
const client = new Client ();
    
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Conectado com sucesso!');
});

client.initialize();

const delay = ms => new Promise(res => setTimeout(res, ms)); // Função que usamos para criar o delay entre uma ação e outra

// Funil

client.on('message', async msg => {

    if (msg.body.match(/(Olá!|Olá|olá|ola|Ola|Oi|oi)/i) && msg.from.endsWith('@c.us')) {

        const chat = await msg.getChat();

        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        const contact = await msg.getContact(); //Pegando o contato
        const name = contact.pushname; //Pegando o nome do contato
        await client.sendMessage(msg.from,'*Olá* '+ name.split(" ")[0] + '!\n\n*Sou o Vitor, assistente virtual da La Vita Planejados!*\n_Como posso ajudar?_\n\n*Por favor, digite uma das opções abaixo:*\n\n1 - Realizar projeto\n2 - Cozinha pronta\n3 - Assistência técnica\n4 - Acompanhar entrega\n5 - Outros assuntos'); //Primeira mensagem de texto
        
    
        
    }




    if (msg.body !== null && msg.body === '1' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();


        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, '*Maravilha!* Vou pedir para que digite os ambientes que gostaria de planejar.\n\nCaso possua a planta do imóvel, pode nos encaminhar pois irá auxiliar na construção do seu projeto.\n\nSe for sua primeira experiência com planejados ou a primeira empresa que está realizando sua cotação, não se preocupe pois iremos dar o suporte que for preciso.');

        await delay(120000); //delay de 120 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, '*Logo um de nossos atendentes dará continuidade ao seu atendimento.*\n\nCaso ainda não conheça nosso instagram, irei deixar o *link abaixo* enquanto aguarda o seu atendimento.');

        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'https://www.instagram.com/la_vita_planejados?igsh=b3VweXg2bHVxYm50&utm_source=qr');


        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, '_Gostaria de lembrar que nosso atendimento funciona de segunda à sábado das 08:00hs às 20:00hs._');



    }

    if (msg.body !==null && msg.body === '2' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();

        await delay (3000);
        await chat.sendStateTyping();
        await delay (3000);
        const contact = await msg.getContact();
        const name = contact.pushname;
        await client.sendMessage(msg.from, '*Maravilha* '+ name.split(" ")[0] + '!\n\nVocê fez uma excelente escolha!\nNós criamos um projeto de cozinha pronta com base na planta da maioria dos apartamentos de hoje em dia');

        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'São 10 modelos incríveis para você escolher o que mais combina com seu apê!\nE os preços irão te surpreender.');

        await delay (3000);
        await chat.sendStateTyping();
        await delay (3000);
        await client.sendMessage(msg.from, 'Eu vou encaminhar o link do nosso catálogo abaixo para você conferir.\nCaso se interesse por algum é só clicar em comprar que estarei te esperando para te orientar nos próximos passos.\n\nhttps://lavitaplanejados.wixsite.com/cozinhapronta');

        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, '*Até logo ;)!*');
    }
    


    if (msg.body !== null && msg.body === '3' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();


        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, '*Perfeito, logo um de nossos atendentes dará continuidade para lhe auxiliar em sua assistência técnica.*\n\nEnquanto isso pode ficar à vontade para decrever o problema apresentado.\n\nCaso consiga nos enviar fotos ou vídeos, ficamos gratos, pois irá nos auxiliar a entender melhor o ocorrido.');


        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, '_Gostaria de lembrar que nosso atendimento funciona de segunda à sábado das 08:00hs às 20:00hs._');


    }

    if (msg.body !== null && msg.body === '4' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();


        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Você já está muito perto de ver seu sonho realizado.\n\n*Logo um de nossos atendentes dará continuidade ao seu atendimento.*');
        
        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, '_Gostaria de lembrar que nosso atendimento funciona de segunda à sábado das 08:00hs às 20:00hs._');

    }

    if (msg.body !== null && msg.body === '5' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();

        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, '*Não tem problema, logo um de nossos atendentes dará continuidade ao seu atendimento.*\n\nCaso ainda não conheça nosso instagram, irei deixar o *link abaixo* enquanto aguarda o seu atendimento.');


        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'https://www.instagram.com/la_vita_planejados?igsh=b3VweXg2bHVxYm50&utm_source=qr');


        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, '_Gostaria de lembrar que nosso atendimento funciona de segunda à sábado das 08:00hs às 20:00hs._');



    }

    if (msg.body.match(/Versatile|Vigneto|Sicilia|Venezia|Toscana|Vita|Nuvole|Firenze|Eleganza|Sofisticato/i) && msg.from.endsWith('@c.us')) {

        const chat = await msg.getChat();

        await delay(3000);
        await chat.sendStateTyping();
        await delay (3000);
        const contact = await msg.getContact();
        const name = contact.pushname;
        await client.sendMessage(msg.from, '*Que bom você ter voltado* '+ name.split(" ")[0] + '!\n\nFez uma excelente escolha, este modelo vai ficar lindo na sua cozinha.\n\n*Parabéns!*');

        await delay (3000);
        await chat.sendStateTyping();
        await delay (3000);
        await client.sendMessage(msg.from, 'Será necessário uma visita técnica ao local para a conferência das medidas\nCaso tenha a planta e fotos do local pode nos encaminhar pois irá ajudar no seu atendimento.');

        await delay (3000);
        await chat.sendStateTyping();
        await delay (3000);
        await client.sendMessage(msg.from, '*Logo um de nossos atendentes irá falar com você pra te guiar nos próximos passos.*');

        await delay (3000);
        await chat.sendStateTyping();
        await delay (3000);
        await client.sendMessage(msg.from, '_Gostaria de lembrar que nosso atendimento funciona de segunda à sábado das 08:00hs às 20:00hs._');


    }








});





