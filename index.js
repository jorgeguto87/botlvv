const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, Buttons, List, MessageMedia, MessageTypes } = require('whatsapp-web.js');
const client = new Client ({
    authStrategy: new LocalAuth()

});

    
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Conectado com sucesso!');
});

client.initialize();

function saudacao() {
    const data = new Date();
    let hora = data.getHours();
    let str = '';
    if (hora >= 8 && hora < 15) {
        str = '*Bom dia!*';
    } else if (hora >= 15 && hora < 21) {
        str = '*Boa tarde!*';
    } else {
        str = '*Boa noite!*';
    }
    return str;
};
function atendente() {
    const data = new Date();
    let hora = data.getHours();
    let strdois = '';
    if (hora >= 11 && hora < 23) {
        strdois = '😃 Aguarde um momento que logo será atendido.';
    } else {
        strdois = 'Humm... \n😒 Já estamos fora do horário de atendimento.\n\n😃 Mas não se preocupe, retornaremos assim que possível!\n\n🕖 _Nosso horário é de segunda a sábado de 08:00hs às 20:00hs._';
        }
    return strdois;
};
function domingo() {
    const data = new Date();
    let dia = data.getDay();
    let strtres = '';
    if (dia === 0) {
        strtres = '🏖️ *Hoje é Domingo!*\n\n😃 Amanhã logo cedo um de nossos atendentes irá falar com você.\n\n🕖 _Nosso horário é de segunda a sábado de 08:00hs às 20:00hs._';
    } else {
        strtres = atendente();
        }
    return strtres;
    };
const delay = ms => new Promise(res => setTimeout(res, ms)); // Função que usamos para criar o delay entre uma ação e outra

// Funil

client.on('message', async msg => {

    if (msg.body.match (/Oi|Olá/i)) {

        const chat = await msg.getChat();

        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        const contact = await msg.getContact(); //Pegando o contato
        const name = contact.pushname; //Pegando o nome do contato
        await client.sendMessage(msg.from, '*🙋‍♂️ Olá* '+ name.split(" ")[0] + '! ' + saudacao() + '\n\n*Sou o Vitor, assistente virtual da La Vita Planejados!*\n_Como posso ajudar?_\n\n➡️ Por favor, digite o *NÚMERO* de uma das opções abaixo:\n\n1️⃣ - Realizar projeto\n2️⃣ - Catálogos\n3️⃣ - Assistência técnica\n4️⃣ - Acompanhar entrega\n5️⃣ - Outros assuntos'); //Primeira mensagem de texto
        
    
        
    }else if (msg.body === 'Olá') {

        const chat = await msg.getChat();

        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        const contact = await msg.getContact(); //Pegando o contato
        const name = contact.pushname; //Pegando o nome do contato
        await client.sendMessage(msg.from, '*🙋‍♂️ Olá* '+ name.split(" ")[0] + '! ' + saudacao() + '\n\n*Sou o Vitor, assistente virtual da La Vita Planejados!*\n_Como posso ajudar?_\n\n➡️ Por favor, digite o *NÚMERO* de uma das opções abaixo:\n\n1️⃣ - Realizar projeto\n2️⃣ - Catálogos\n3️⃣ - Assistência técnica\n4️⃣ - Acompanhar entrega\n5️⃣ - Outros assuntos'); //Primeira mensagem de texto
        
    
        
    }else if (msg.body === 'Olá!') {

        const chat = await msg.getChat();

        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        const contact = await msg.getContact(); //Pegando o contato
        const name = contact.pushname; //Pegando o nome do contato
        await client.sendMessage(msg.from, '*🙋‍♂️ Olá* '+ name.split(" ")[0] + '! ' + saudacao() + '\n\n*Sou o Vitor, assistente virtual da La Vita Planejados!*\n_Como posso ajudar?_\n\n➡️ Por favor, digite o *NÚMERO* de uma das opções abaixo:\n\n1️⃣ - Realizar projeto\n2️⃣ - Catálogos\n3️⃣ - Assistência técnica\n4️⃣ - Acompanhar entrega\n5️⃣ - Outros assuntos'); //Primeira mensagem de texto
        
    
        
    }else if (msg.body === 'Oi!') {

        const chat = await msg.getChat();

        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        const contact = await msg.getContact(); //Pegando o contato
        const name = contact.pushname; //Pegando o nome do contato
        await client.sendMessage(msg.from, '*🙋‍♂️ Olá* '+ name.split(" ")[0] + '! ' + saudacao() + '\n\n*Sou o Vitor, assistente virtual da La Vita Planejados!*\n_Como posso ajudar?_\n\n➡️ Por favor, digite o *NÚMERO* de uma das opções abaixo:\n\n1️⃣ - Realizar projeto\n2️⃣ - Catálogos\n3️⃣ - Assistência técnica\n4️⃣ - Acompanhar entrega\n5️⃣ - Outros assuntos'); //Primeira mensagem de texto
        
    
        
    }else if (msg.body === "Opa") {

        const chat = await msg.getChat();

        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        const contact = await msg.getContact(); //Pegando o contato
        const name = contact.pushname; //Pegando o nome do contato
        await client.sendMessage(msg.from, '*🙋‍♂️ Olá* '+ name.split(" ")[0] + '! ' + saudacao() + '\n\n*Sou o Vitor, assistente virtual da La Vita Planejados!*\n_Como posso ajudar?_\n\n➡️ Por favor, digite o *NÚMERO* de uma das opções abaixo:\n\n1️⃣ - Realizar projeto\n2️⃣ - Catálogos\n3️⃣ - Assistência técnica\n4️⃣ - Acompanhar entrega\n5️⃣ - Outros assuntos'); //Primeira mensagem de texto
        
    
        
    }else if (msg.body === "Opa!") {

        const chat = await msg.getChat();

        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        const contact = await msg.getContact(); //Pegando o contato
        const name = contact.pushname; //Pegando o nome do contato
        await client.sendMessage(msg.from, '*🙋‍♂️ Olá* '+ name.split(" ")[0] + '! ' + saudacao() + '\n\n*Sou o Vitor, assistente virtual da La Vita Planejados!*\n_Como posso ajudar?_\n\n➡️ Por favor, digite o *NÚMERO* de uma das opções abaixo:\n\n1️⃣ - Realizar projeto\n2️⃣ - Catálogos\n3️⃣ - Assistência técnica\n4️⃣ - Acompanhar entrega\n5️⃣ - Outros assuntos'); //Primeira mensagem de texto
        
    
        
    }

    else if (msg.body === "1") {
        const chat = await msg.getChat();


        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, '*😃 Maravilha!* \nVou pedir para que digite os ambientes que gostaria de planejar.\n\n➡️ Se for sua primeira experiência com planejados ou a primeira empresa que está realizando sua cotação, não se preocupe pois iremos dar o suporte que for preciso.');
        await delay(30000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, '😃 Toda informação é muito útil além de importante na hora de construir o seu projeto.\n\n➡️ Caso possua a planta do ambiente, medidas ou imagens, vai nos ajudar muito.');
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'Você teria como nos enviar algum conteúdo mencionado acima?\n\n6️⃣ - *SIM*\n7️⃣ - *NÃO*');
    
    } else if (msg.body === "0") {
        const chat = await msg.getChat();


        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, '*😃 Maravilha!* \nVou pedir para que digite os ambientes que gostaria de planejar.\n\n➡️ Se for sua primeira experiência com planejados ou a primeira empresa que está realizando sua cotação, não se preocupe pois iremos dar o suporte que for preciso.');
        await delay(30000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, '😃 Toda informação é muito útil além de importante na hora de construir o seu projeto.\n\n➡️ Caso possua a planta do ambiente, medidas ou imagens, vai nos ajudar muito.');
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'Você teria como nos enviar algum conteúdo mencionado acima?\n\n6️⃣ - *SIM*\n7️⃣ - *NÃO*');
    
    
    } else if (msg.body === "6") {
        const chat = await msg.getChat();
        await delay (3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, '🥳 *Perfeito!*\n\nVou aguardar um minuto para que nos envie os conteúdos que possuir com calma.\nEm seguida irei prosseguir com o seu atendimento. 😉');
        await delay(60000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, '*Vamos dar continuidade com o seu atendimento?*\n\nEnquanto aguarda, vou deixar o link do nosso instagram abaixo para conhecer um pouco mais sobre nosso trabalho. 👇\n\nhttps://www.instagram.com/la_vita_planejados?igsh=b3VweXg2bHVxYm50&utm_source=qr');
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, domingo());
    
    } else if (msg.body === "7") {
        const chat = await msg.getChat();
        await delay (3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, '😉 *Não tem problema!*\n Tenho certeza que nossos especialistas irão encontrar a melhor forma de desenvolver um projeto perfeito para o seu ambiente.');
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, '*Vamos dar continuidade com o seu atendimento.*\n\nEnquanto aguarda, vou deixar o link do nosso instagram abaixo para conhecer um pouco mais sobre nosso trabalho. 👇\n\nhttps://www.instagram.com/la_vita_planejados?igsh=b3VweXg2bHVxYm50&utm_source=qr');
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, domingo());

    
    
    
    } else if (msg.body === "Cozinha") {
        msg.react('👍');
        
      
    }else if (msg.body === "Sala") {
        msg.react('👍');
        
      
    }else if (msg.body === "Banheiro") {
        msg.react('👍');
        
      
    }else if (msg.body === "Quarto") {
        msg.react('👍');
        
      
    }else if (msg.body === "Quartos") {
        msg.react('👍');
        
      
    }else if (msg.body === "Banheiros") {
        msg.react('👍');
        
      
    }else if (msg.body === "Lavanderia") {
        msg.react('👍');
        
      
    }else if (msg.body === "Escritório") {
        msg.react('👍');
        
      
    }

    else if (msg.body === "2") {
        const chat = await msg.getChat();

        await delay (3000);
        await chat.sendStateTyping();
        await delay (3000);
        const contact = await msg.getContact();
        const name = contact.pushname;
        await client.sendMessage(msg.from, '*😃 Maravilha* '+ name.split(" ")[0] + '!\n\nVocê fez uma excelente escolha!\nNós criamos um catálogo com projetos prontos de cozinha usando como base a maioria das plantas dos empreendimentos de hoje em dia');

        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, '😎 São vários modelos incríveis para você escolher o que mais combina com seu apê!\n\n🥳 E os preços irão te surpreender.');

        await delay (3000);
        await chat.sendStateTyping();
        await delay (3000);
        await client.sendMessage(msg.from, '😉 Eu vou encaminhar o link do nosso catálogo abaixo para você conferir.\n\n➡️ Caso se interesse por algum é só clicar em *SAIBA MAIS* em nosso catálogo que estarei te esperando para lhe orientar nos próximos passos.\n\nhttps://lavitaplanejados.wixsite.com/catalogos');

        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, '*👋 Até logo!*');

        await delay(300000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, '🙋‍♂️ Olá ' + name.split(" ")[0] + ', sou eu aqui de novo!');

        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'O que achou do nosso catálogo?');
        
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, '😉 Caso não tenha encontrado o que precisa, podemos fazer um projeto personalizado para você.\n\nBasta digitar 0️⃣ a qualquer momento e logo um de nossos atendentes irá falar com você.');

        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'O que acha?');
    }
    


    else if (msg.body === "3") {
        const chat = await msg.getChat();


        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, '*😃 Perfeito, logo um de nossos atendentes dará continuidade para lhe auxiliar em sua assistência técnica.*\n\n➡️ Enquanto isso pode ficar à vontade para decrever o problema apresentado.\n\n➡️ Caso consiga nos enviar fotos ou vídeos, ficamos gratos, pois irá nos auxiliar a entender melhor o ocorrido.');


        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, domingo());


    }

    else if (msg.body === "4") {
        const chat = await msg.getChat();


        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, '😉 Você já está muito perto de ver seu sonho realizado.\n\n*Logo um de nossos atendentes dará continuidade ao seu atendimento.*');
        
        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, domingo());

    }

    else if (msg.body === "5") {
        const chat = await msg.getChat();

        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, '*😃 Não tem problema, logo um de nossos atendentes dará continuidade ao seu atendimento.*\n\n➡️ Caso ainda não conheça nosso instagram, irei deixar o *link abaixo* enquanto aguarda o seu atendimento. 👇');


        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'https://www.instagram.com/la_vita_planejados?igsh=b3VweXg2bHVxYm50&utm_source=qr');


        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, domingo());



    }

    else if (msg.body === "Versatile") {

        const chat = await msg.getChat();

        await delay(3000);
        await chat.sendStateTyping();
        await delay (3000);
        const contact = await msg.getContact();
        const name = contact.pushname;
        await client.sendMessage(msg.from, '*😃 Que bom você ter voltado* '+ name.split(" ")[0] + '!\n\nFez uma excelente escolha, este modelo vai ficar lindo na sua cozinha.\n\n*Parabéns!🥳*');

        await delay (3000);
        await chat.sendStateTyping();
        await delay (3000);
        await client.sendMessage(msg.from, '➡️ Será necessário uma visita técnica ao local para a conferência das medidas\n\n➡️ Caso tenha a planta e fotos do local pode nos encaminhar pois irá ajudar no seu atendimento.');

        await delay (3000);
        await chat.sendStateTyping();
        await delay (3000);
        await client.sendMessage(msg.from, '*😃 Logo um de nossos atendentes irá falar com você pra te guiar nos próximos passos.*');

        await delay (3000);
        await chat.sendStateTyping();
        await delay (3000);
        await client.sendMessage(msg.from, domingo());


    }else if (msg.body === "Vigneto") {

        const chat = await msg.getChat();

        await delay(3000);
        await chat.sendStateTyping();
        await delay (3000);
        const contact = await msg.getContact();
        const name = contact.pushname;
        await client.sendMessage(msg.from, '*😃 Que bom você ter voltado* '+ name.split(" ")[0] + '!\n\nFez uma excelente escolha, este modelo vai ficar lindo na sua cozinha.\n\n*Parabéns!🥳*');

        await delay (3000);
        await chat.sendStateTyping();
        await delay (3000);
        await client.sendMessage(msg.from, '➡️ Será necessário uma visita técnica ao local para a conferência das medidas\n\n➡️ Caso tenha a planta e fotos do local pode nos encaminhar pois irá ajudar no seu atendimento.');

        await delay (3000);
        await chat.sendStateTyping();
        await delay (3000);
        await client.sendMessage(msg.from, '*😃 Logo um de nossos atendentes irá falar com você pra te guiar nos próximos passos.*');

        await delay (3000);
        await chat.sendStateTyping();
        await delay (3000);
        await client.sendMessage(msg.from, domingo());


    }else if (msg.body === "Sicilia") {

        const chat = await msg.getChat();

        await delay(3000);
        await chat.sendStateTyping();
        await delay (3000);
        const contact = await msg.getContact();
        const name = contact.pushname;
        await client.sendMessage(msg.from, '*😃 Que bom você ter voltado* '+ name.split(" ")[0] + '!\n\nFez uma excelente escolha, este modelo vai ficar lindo na sua cozinha.\n\n*Parabéns!🥳*');

        await delay (3000);
        await chat.sendStateTyping();
        await delay (3000);
        await client.sendMessage(msg.from, '➡️ Será necessário uma visita técnica ao local para a conferência das medidas\n\n➡️ Caso tenha a planta e fotos do local pode nos encaminhar pois irá ajudar no seu atendimento.');

        await delay (3000);
        await chat.sendStateTyping();
        await delay (3000);
        await client.sendMessage(msg.from, '*😃 Logo um de nossos atendentes irá falar com você pra te guiar nos próximos passos.*');

        await delay (3000);
        await chat.sendStateTyping();
        await delay (3000);
        await client.sendMessage(msg.from, domingo());


    }else if (msg.body === "Venezia") {

        const chat = await msg.getChat();

        await delay(3000);
        await chat.sendStateTyping();
        await delay (3000);
        const contact = await msg.getContact();
        const name = contact.pushname;
        await client.sendMessage(msg.from, '*😃 Que bom você ter voltado* '+ name.split(" ")[0] + '!\n\nFez uma excelente escolha, este modelo vai ficar lindo na sua cozinha.\n\n*Parabéns!🥳*');

        await delay (3000);
        await chat.sendStateTyping();
        await delay (3000);
        await client.sendMessage(msg.from, '➡️ Será necessário uma visita técnica ao local para a conferência das medidas\n\n➡️ Caso tenha a planta e fotos do local pode nos encaminhar pois irá ajudar no seu atendimento.');

        await delay (3000);
        await chat.sendStateTyping();
        await delay (3000);
        await client.sendMessage(msg.from, '*😃 Logo um de nossos atendentes irá falar com você pra te guiar nos próximos passos.*');

        await delay (3000);
        await chat.sendStateTyping();
        await delay (3000);
        await client.sendMessage(msg.from, domingo());


    }else if (msg.body === "Toscana") {

        const chat = await msg.getChat();

        await delay(3000);
        await chat.sendStateTyping();
        await delay (3000);
        const contact = await msg.getContact();
        const name = contact.pushname;
        await client.sendMessage(msg.from, '*😃 Que bom você ter voltado* '+ name.split(" ")[0] + '!\n\nFez uma excelente escolha, este modelo vai ficar lindo na sua cozinha.\n\n*Parabéns!🥳*');

        await delay (3000);
        await chat.sendStateTyping();
        await delay (3000);
        await client.sendMessage(msg.from, '➡️ Será necessário uma visita técnica ao local para a conferência das medidas\n\n➡️ Caso tenha a planta e fotos do local pode nos encaminhar pois irá ajudar no seu atendimento.');

        await delay (3000);
        await chat.sendStateTyping();
        await delay (3000);
        await client.sendMessage(msg.from, '*😃 Logo um de nossos atendentes irá falar com você pra te guiar nos próximos passos.*');

        await delay (3000);
        await chat.sendStateTyping();
        await delay (3000);
        await client.sendMessage(msg.from, domingo());


    }else if (msg.body === "Vita") {

        const chat = await msg.getChat();

        await delay(3000);
        await chat.sendStateTyping();
        await delay (3000);
        const contact = await msg.getContact();
        const name = contact.pushname;
        await client.sendMessage(msg.from, '*😃 Que bom você ter voltado* '+ name.split(" ")[0] + '!\n\nFez uma excelente escolha, este modelo vai ficar lindo na sua cozinha.\n\n*Parabéns!🥳*');

        await delay (3000);
        await chat.sendStateTyping();
        await delay (3000);
        await client.sendMessage(msg.from, '➡️ Será necessário uma visita técnica ao local para a conferência das medidas\n\n➡️ Caso tenha a planta e fotos do local pode nos encaminhar pois irá ajudar no seu atendimento.');

        await delay (3000);
        await chat.sendStateTyping();
        await delay (3000);
        await client.sendMessage(msg.from, '*😃 Logo um de nossos atendentes irá falar com você pra te guiar nos próximos passos.*');

        await delay (3000);
        await chat.sendStateTyping();
        await delay (3000);
        await client.sendMessage(msg.from, domingo());


    }else if (msg.body === "Nuvole") {

        const chat = await msg.getChat();

        await delay(3000);
        await chat.sendStateTyping();
        await delay (3000);
        const contact = await msg.getContact();
        const name = contact.pushname;
        await client.sendMessage(msg.from, '*😃 Que bom você ter voltado* '+ name.split(" ")[0] + '!\n\nFez uma excelente escolha, este modelo vai ficar lindo na sua cozinha.\n\n*Parabéns!🥳*');

        await delay (3000);
        await chat.sendStateTyping();
        await delay (3000);
        await client.sendMessage(msg.from, '➡️ Será necessário uma visita técnica ao local para a conferência das medidas\n\n➡️ Caso tenha a planta e fotos do local pode nos encaminhar pois irá ajudar no seu atendimento.');

        await delay (3000);
        await chat.sendStateTyping();
        await delay (3000);
        await client.sendMessage(msg.from, '*😃 Logo um de nossos atendentes irá falar com você pra te guiar nos próximos passos.*');

        await delay (3000);
        await chat.sendStateTyping();
        await delay (3000);
        await client.sendMessage(msg.from, domingo());


    }else if (msg.body === "Firenze") {

        const chat = await msg.getChat();

        await delay(3000);
        await chat.sendStateTyping();
        await delay (3000);
        const contact = await msg.getContact();
        const name = contact.pushname;
        await client.sendMessage(msg.from, '*😃 Que bom você ter voltado* '+ name.split(" ")[0] + '!\n\nFez uma excelente escolha, este modelo vai ficar lindo na sua cozinha.\n\n*Parabéns!🥳*');

        await delay (3000);
        await chat.sendStateTyping();
        await delay (3000);
        await client.sendMessage(msg.from, '➡️ Será necessário uma visita técnica ao local para a conferência das medidas\n\n➡️ Caso tenha a planta e fotos do local pode nos encaminhar pois irá ajudar no seu atendimento.');

        await delay (3000);
        await chat.sendStateTyping();
        await delay (3000);
        await client.sendMessage(msg.from, '*😃 Logo um de nossos atendentes irá falar com você pra te guiar nos próximos passos.*');

        await delay (3000);
        await chat.sendStateTyping();
        await delay (3000);
        await client.sendMessage(msg.from, domingo());


    }else if (msg.body === "Eleganza") {

        const chat = await msg.getChat();

        await delay(3000);
        await chat.sendStateTyping();
        await delay (3000);
        const contact = await msg.getContact();
        const name = contact.pushname;
        await client.sendMessage(msg.from, '*😃 Que bom você ter voltado* '+ name.split(" ")[0] + '!\n\nFez uma excelente escolha, este modelo vai ficar lindo na sua cozinha.\n\n*Parabéns!🥳*');

        await delay (3000);
        await chat.sendStateTyping();
        await delay (3000);
        await client.sendMessage(msg.from, '➡️ Será necessário uma visita técnica ao local para a conferência das medidas\n\n➡️ Caso tenha a planta e fotos do local pode nos encaminhar pois irá ajudar no seu atendimento.');

        await delay (3000);
        await chat.sendStateTyping();
        await delay (3000);
        await client.sendMessage(msg.from, '*😃 Logo um de nossos atendentes irá falar com você pra te guiar nos próximos passos.*');

        await delay (3000);
        await chat.sendStateTyping();
        await delay (3000);
        await client.sendMessage(msg.from, domingo());


    }else if (msg.body === "Sofisticato") {

        const chat = await msg.getChat();

        await delay(3000);
        await chat.sendStateTyping();
        await delay (3000);
        const contact = await msg.getContact();
        const name = contact.pushname;
        await client.sendMessage(msg.from, '*😃 Que bom você ter voltado* '+ name.split(" ")[0] + '!\n\nFez uma excelente escolha, este modelo vai ficar lindo na sua cozinha.\n\n*Parabéns!🥳*');

        await delay (3000);
        await chat.sendStateTyping();
        await delay (3000);
        await client.sendMessage(msg.from, '➡️ Será necessário uma visita técnica ao local para a conferência das medidas\n\n➡️ Caso tenha a planta e fotos do local pode nos encaminhar pois irá ajudar no seu atendimento.');

        await delay (3000);
        await chat.sendStateTyping();
        await delay (3000);
        await client.sendMessage(msg.from, '*😃 Logo um de nossos atendentes irá falar com você pra te guiar nos próximos passos.*');

        await delay (3000);
        await chat.sendStateTyping();
        await delay (3000);
        await client.sendMessage(msg.from, domingo());


    };








});




