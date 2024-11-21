const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, Buttons, List, MessageMedia, MessageTypes } = require('whatsapp-web.js');
const client = new Client ({
    authStrategy: new LocalAuth()

});
const cron = require('node-cron');
const fs = require('fs');
const {google} = require('googleapis');
const credentials = JSON.parse(fs.readFileSync('pure-summit-437120-j8-c8c5bda24689.json', 'utf8'));
const auth = new google.auth.GoogleAuth({
    credentials,
    scopes:['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/calendar'],
});
const spreadsheetId = '1XoS32dEclbU1sh-bZl3OtcSi2RW6BET00PCtOx6pBQQ';
const inicioatend = 11;
const fimatend = 23;
const folga = 0;
const jorge = '5521999363578@c.us';
const marcus = '5521994165116@c.us';
const feriados = [
    '01-01', // Ano Novo
    '04-21', // Tiradentes
    '05-01', // Dia do Trabalho
    '09-07', // Independência do Brasil
    '10-12', // Nossa Senhora Aparecida
    '11-02', // Finados
    '11-15', // Proclamação da República
    '12-25'  // Natal
];

const grupos = [
    '120363039621149962@g.us', 
    '5521992884522-1634652354@g.us',
    '120363045569895184@g.us',
    '120363143030407637@g.us',
    '120363029538805156@g.us',
    '120363049713481319@g.us' ];

    const horarios = [
        8,11,13,17,20
    ];
    
    
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});



client.initialize();

client.on('ready', async () => {
    console.log('Conectado com sucesso!');
    await main();
});
let isMainInitialized = false;

async function main() {
    if (isMainInitialized) {
        console.log('O fluxo principal já foi iniciado. Ignorando...');
        return;
    }

    isMainInitialized = true;

    try {
        console.log('Iniciando o fluxo principal...');

        // 1. Inicia o fluxo principal de atendimento
        handleClientMessages();

        // 2. Inicia anúncios programados
        scheduleAdvertisements();

        // 3. Integração com a planilha
        setInterval(() => {
            console.log('Executando integração com a planilha...');
            addDataToSheet();
        }, 60000);

        // 4. Verificação e envio de lembretes
        setInterval(() => {
            console.log('Verificando e enviando lembretes...');
            checkAndSendReminders();
        }, 60000); // Executa a cada 1 minuto

        setInterval(() => {
            console.log('Verificando agendamentos antigos...');
            cleanOldRows();
        },24*60*60*1000);//Executa a cada 24hs

        console.log('Fluxo principal iniciado com sucesso.');
    } catch (error) {
        console.error('Erro no fluxo principal:', error);
    }
}



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
function isFeriado() {
    const hoje = new Date();
    const dataAtual = `${String(hoje.getMonth() + 1).padStart(2, '0')}-${String(hoje.getDate()).padStart(2, '0')}`;
    return feriados.includes(dataAtual);
};

function atendente() {
    const data = new Date();
    let hora = data.getHours();
    let strdois = '';

    if (isFeriado()) {
        strdois = '🏖️ *Aproveite o Feriado*\n\n😃 Assim que retornarmos em nossas atividades, um de nossos atendentes irá falar com você.\n\n🕖 _Nosso horário é de segunda a sábado de 08:00hs às 20:00hs._';
    } else if (hora >= 11 && hora < 23) {
        strdois = '😃 Aguarde um momento que logo será atendido.';
    } else {
        strdois = 'Humm... \n😒 Já estamos fora do horário de atendimento.\n\n😃 Mas não se preocupe, retornaremos assim que possível!\n\n🕖 _Nosso horário é de segunda a sábado de 08:00hs às 20:00hs._';
    }

    return strdois;
}
function domingo() {
    const data = new Date();
    let dia = data.getDay();
    let strtres = '';
    if (dia === 0) {
        strtres = '🏖️ *Aproveite o fim de semana!*\n\n😃 Assim que retornarmos em nossas atividades, um de nossos atendentes irá falar com você.\n\n🕖 _Nosso horário é de segunda a sábado de 08:00hs às 20:00hs._';
    } else {
        strtres = atendente();
        }
    return strtres;
    };

    function convertDateToISOFormat(date) {
        const [day, month, year] = date.split('/');
        return `${year}-${month}-${day}`; // Retorna no formato ISO
    };

    
const data = new Date();
const horaautal = data.getHours();
const diaautal = data.getDay();
const domingao = 0;


const delay = ms => new Promise(res => setTimeout(res, ms)); 

let isMessageHandlerInitialized = false;

async function handleClientMessages() {
    if (isMessageHandlerInitialized) {
        console.log('Handler de mensagens já inicializado. Ignorando...');
        return;
    }

    isMessageHandlerInitialized = true;

client.on('message', async msg => {

    if (msg.body.match (/(Oi|Olá)/i) && msg.from.endsWith('@c.us')) {

        const chat = await msg.getChat();
        const logo = MessageMedia.fromFilePath('./logo.jpg');

        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        const contact = await msg.getContact(); //Pegando o contato
        const name = contact.pushname; //Pegando o nome do contato
        await client.sendMessage(msg.from, logo, {caption: '*🙋‍♂️ Olá* '+ name.split(" ")[0] + '! ' + saudacao() + '\n\n*Sou o Vitor, assistente virtual da La Vita Planejados!*\n_Como posso ajudar?_\n\n➡️ Por favor, digite o *NÚMERO* de uma das opções abaixo:\n\n1️⃣ - Realizar projeto\n2️⃣ - Catálogos\n3️⃣ - Assistência técnica\n4️⃣ - Acompanhar entrega\n5️⃣ - Outros assuntos'}); //Primeira mensagem de texto

    } else if (msg.body === "Opa") {

        const chat = await msg.getChat();
        const logo = MessageMedia.fromFilePath('./logo.jpg');

        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        const contact = await msg.getContact(); //Pegando o contato
        const name = contact.pushname; //Pegando o nome do contato
        await client.sendMessage(msg.from, logo, {caption: '*🙋‍♂️ Olá* '+ name.split(" ")[0] + '! ' + saudacao() + '\n\n*Sou o Vitor, assistente virtual da La Vita Planejados!*\n_Como posso ajudar?_\n\n➡️ Por favor, digite o *NÚMERO* de uma das opções abaixo:\n\n1️⃣ - Realizar projeto\n2️⃣ - Catálogos\n3️⃣ - Assistência técnica\n4️⃣ - Acompanhar entrega\n5️⃣ - Outros assuntos'}); //Primeira mensagem de texto
        
    
        
    }else if (msg.body === "Opa!") {

        const chat = await msg.getChat();
        const logo = MessageMedia.fromFilePath('./logo.jpg');

        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        const contact = await msg.getContact(); //Pegando o contato
        const name = contact.pushname; //Pegando o nome do contato
        await client.sendMessage(msg.from, logo, {caption: '*🙋‍♂️ Olá* '+ name.split(" ")[0] + '! ' + saudacao() + '\n\n*Sou o Vitor, assistente virtual da La Vita Planejados!*\n_Como posso ajudar?_\n\n➡️ Por favor, digite o *NÚMERO* de uma das opções abaixo:\n\n1️⃣ - Realizar projeto\n2️⃣ - Catálogos\n3️⃣ - Assistência técnica\n4️⃣ - Acompanhar entrega\n5️⃣ - Outros assuntos'}); //Primeira mensagem de texto
        
    
        
    }

    else if (msg.body === "1") {
        const chat = await msg.getChat();
        const audio = MessageMedia.fromFilePath('./audio_vitor.mp3');

        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, '*😃 Maravilha!* \nVou pedir para que digite os ambientes que gostaria de planejar.\n\n➡️ Se for sua primeira experiência com planejados ou a primeira empresa que está realizando sua cotação, não se preocupe pois iremos dar o suporte que for preciso.');
        await delay(20000);
        await chat.sendStateRecording();
        await delay(10000);
        await client.sendMessage(msg.from, audio, {sendAudioAsVoice: true});
        await delay(100000);
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
    
    }    
    
        

})
}

let isAdvertisementsScheduled = false;

function scheduleAdvertisements() {
    if (isAdvertisementsScheduled) {
        console.log('Tarefas de anúncios já foram agendadas.');
        return;
    }

    isAdvertisementsScheduled = true;

    cron.schedule('0 * * * *', async () => { 
        const agora = new Date();
        const horaUTC = agora.getUTCHours();
        const horaAtual = (horaUTC + 3) % 24; 
        const diaAtual = agora.getDay(); 
    
        if (diaAtual >= 1 && diaAtual <= 6 && horarios.includes(horaAtual)) {
            const imagens = [
                './diaum.jpg',   // Segunda-feira
                './diadois.jpg', // Terça-feira
                './diatres.jpg', // Quarta-feira
                './diaquatro.jpg', // Quinta-feira
                './diacinco.jpg', // Sexta-feira
                './diaseis.jpg'   // Sábado
            ];
    
            const caminhoImagem = imagens[diaAtual - 1];
    
            if (!fs.existsSync(caminhoImagem)) {
                console.error(`Arquivo de imagem não encontrado: ${caminhoImagem}`);
                return;
            }
    
            const anuncio = MessageMedia.fromFilePath(caminhoImagem);
            const mensagem = 'Saiba mais clicando no *LINK ABAIXO!* 👇\nhttps://wa.me/message/VJJVS66FP3CTI1';
    
            for (const grupo of grupos) {
                try {
                    await client.sendMessage(grupo, anuncio, { caption: mensagem });
                    console.log(`Mensagem enviada para o grupo: ${grupo}`);
                } catch (error) {
                    console.error(`Erro ao enviar mensagem para o grupo ${grupo}:`, error);
                }
            }
        }
    });
}


const clientStates = {}; 

async function addDataToSheet() {
    try {
        const authClient = await auth.getClient();
        const sheets = google.sheets({ version: 'v4', auth: authClient });

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: 'A:H',
        });

        const rows = response.data.values || [];
        if (rows.length) {
            for (const [index, row] of rows.entries()) {
                const [name, phone, status, date, hour1, hour2, hour3, hourok] = row;

                const whatsappId = `55${phone}@c.us`; 

                if (status === 'Pronto' && !clientStates[whatsappId]) {
                    clientStates[whatsappId] = { row: index + 1, name, date, hour1, hour2, hour3 };

                    const message = `🙋‍♂️ *Olá, ${name}, tenho uma ótima notícia para você!*\n\n😃 Seu projeto está pronto!\n_Vamos marcar a apresentação?_\n\nPor favor escolha um dos horários abaixo para a apresentação no dia ${date}:\n*A*. ${hour1}\n*B*. ${hour2}\n*C*. ${hour3}\n\n_Obs: Informar a opção em letra *MAIÚSCULA!*_`;
                    await client.sendMessage(whatsappId, message);

                    console.log(`Mensagem enviada para ${whatsappId}`);

                    await sheets.spreadsheets.values.update({
                        spreadsheetId,
                        range: `C${index + 1}`,
                        valueInputOption: 'RAW',
                        resource: { values: [['Notificado']] },
                    });
                }
            }
        }
    } catch (error) {
        console.error('Erro ao processar planilha:', error);
    }
}


client.on('message', async (message) => {
    const clientResponse = message.body.trim();
    const phone = message.from;

    if (clientStates[phone]) {
        const { row, name, date, hour1, hour2, hour3 } = clientStates[phone];

        if (['A', 'B', 'C'].includes(clientResponse)) {
            const chosenHour = clientResponse === 'A' ? hour1 : clientResponse === 'B' ? hour2 : hour3;

            await client.sendMessage(
                phone,
                `😃 *Maravilha, ${name}!* Você escolheu o horário ${chosenHour}. Por favor, confirme com: \n\n*Sim* ou *Não*.`
            );

            // Atualizar horário temporário na planilha
            const authClient = await auth.getClient();
            const sheets = google.sheets({ version: 'v4', auth: authClient });
            await sheets.spreadsheets.values.update({
                spreadsheetId,
                range: `H${row}`,
                valueInputOption: 'RAW',
                resource: { values: [[chosenHour]] },
            });

            // Atualizar estado temporário
            clientStates[phone].chosenHour = chosenHour;

        } else if (clientResponse.toLowerCase() === 'sim') {
            // Confirmar apresentação
            const authClient = await auth.getClient();
            const sheets = google.sheets({ version: 'v4', auth: authClient });
            await sheets.spreadsheets.values.update({
                spreadsheetId,
                range: `C${row}`,
                valueInputOption: 'RAW',
                resource: { values: [['Confirmada']] },
            });
            const calendarLink = await createGoogleCalendarEvent(name, date, clientStates[phone].chosenHour,phone);

            await client.sendMessage(
                phone,
                `😃 *Ótimo, ${name}!* Sua apresentação está confirmada para:\n\n ${date} às ${clientStates[phone].chosenHour}.`
            );

            // Remover cliente do estado temporário
            delete clientStates[phone];

        } else if (clientResponse.toLowerCase() === 'não') {
            // Reenviar opções de horários
            await client.sendMessage(
                phone,
                `Por favor, escolha novamente o horário:\n*A*. ${hour1}\n*B*. ${hour2}\n*C*. ${hour3}`
            );
        } 
    }
});



// Chamando a função de forma periódica
setInterval(() => {
    addDataToSheet();
}, 60000); // Executa a cada 1 minuto

const moment = require('moment-timezone');
const sentReminders = {};

async function checkAndSendReminders() {
    try {
        const authClient = await auth.getClient();
        const sheets = google.sheets({ version: 'v4', auth: authClient });

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: 'A:H', // Corrigido o ponto e vírgula
        });

        const rows = response.data.values || [];
        const now = moment().tz('America/Sao_Paulo'); // Hora atual no fuso horário de São Paulo

        if (rows.length) {
            for (const row of rows) {
                const [name, phone, status, date, hour1, hour2, hour3, hourok] = row;

                if (status !== 'Confirmada') continue;

                const formattedDate = convertDateToISOFormat(date);
                const eventDateTime = moment.tz(`${formattedDate} ${hourok}`, 'YYYY-MM-DD HH:mm', 'America/Sao_Paulo');

                const timeDifference = eventDateTime.diff(now); // Diferença entre evento e agora

                const whatsappId = `55${phone}@c.us`;

                const reminderTime1 = eventDateTime.clone().subtract(1, 'days').set({ hour: 10, minute: 0, second: 0, millisecond: 0 });

                if (
                    now.isBetween(reminderTime1.clone().subtract(30, 'seconds'), reminderTime1) && 
                    !sentReminders[`${whatsappId}-1`]
                ) {
                    await client.sendMessage(
                        whatsappId,
                        `🙋‍♂️ *Olá, ${name}!*\n\n Passando para lembrar que sua apresentação é amanhã às ${hourok}!\n\n👋 *Até amanhã!*`
                    );
                    console.log(`Lembrete 1 enviado para ${whatsappId}`);
                    sentReminders[`${whatsappId}-1`] = true;
                }

                const reminderTime2 = eventDateTime.clone().subtract(1, 'hours');

                if (
                    now.isBetween(reminderTime2.clone().subtract(60, 'seconds'), reminderTime2) &&
                    !sentReminders[`${whatsappId}-2`]
                ) {
                    await client.sendMessage(
                        whatsappId,
                        `🙋‍♂️ *Olá, ${name}!*\n\n Passando para lembrar que sua apresentação é daqui uma hora!\n\n👋 *Te vejo lá!*`
                    );
                    console.log(`Lembrete 2 enviado para ${whatsappId}`);
                    sentReminders[`${whatsappId}-2`] = true;
                }
            }
        }
    } catch (error) {
        console.error('Erro ao enviar lembrete:', error);
    }
}

setInterval(() => {
    checkAndSendReminders();
}, 60000);



const moment = require('moment-timezone');

async function createGoogleCalendarEvent(name, date, time, phone) {
    try {
        const authClient = await auth.getClient();
        const calendar = google.calendar({ version: 'v3', auth: authClient });

        const dataFormatada = convertDateToISOFormat(date);

        const eventStartDateTime = moment.tz(`${dataFormatada} ${time}`, 'YYYY-MM-DD HH:mm', 'America/Sao_Paulo').toDate();
        const eventEndDateTime = moment(eventStartDateTime).add(1, 'hours').toDate();

        console.log('Data formatada:', dataFormatada); // YYYY-MM-DD
        console.log('Hora enviada:', time); // HH:mm
        console.log('Data e Hora Inicial (ISO):', eventStartDateTime.toISOString());
        console.log('Data e Hora Final (ISO):', eventEndDateTime.toISOString());

        const event = {
            summary: `Apresentação de Projeto - ${name}`,
            description: `Apresentação de projeto para ${name}.`,
            start: {
                dateTime: eventStartDateTime.toISOString(),
                timeZone: 'America/Sao_Paulo',
            },
            end: {
                dateTime: eventEndDateTime.toISOString(),
                timeZone: 'America/Sao_Paulo',
            },
        };

        const createdEvent = await calendar.events.insert({
            calendarId: 'lavitaplanejados@gmail.com',
            resource: event,
        });

        console.log(`Adicionado com sucesso: ${createdEvent.data.htmlLink}`);
        return createdEvent.data.htmlLink;

    } catch (error) {
        console.error('Erro ao adicionar na agenda da empresa:', error);
    }
}



async function cleanOldRows() {
    try {
        const authClient = await auth.getClient();
        const sheets = google.sheets({ version: 'v4', auth: authClient });

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: 'A:H',
        });
        const rows = response.data.values || [];
        const now = new Date();

        if (rows.length) {
            const updates = [];
            for (let i = 0; i < rows.length; i++) {
                const row = rows[i];
                const [name, phone, status, date, hour1, hour2, hour3] = row;

                if (!date) continue; // Ignorar linhas sem data

                // Converter a data para o formato ISO antes de criar o objeto Date
                const isoFormattedDate = convertDateToISOFormat(date);
                const scheduledDate = new Date(isoFormattedDate);

                // Verificar se a data está há mais de 15 dias no passado
                if (now - scheduledDate > 15 * 24 * 60 * 60 * 1000) {
                    console.log(`Limpando linha ${i + 1} - Nome: ${name}`);

                    updates.push({
                        range: `A${i + 1}:G${i + 1}`,
                        values: [['', '', 'Andamento', '', '', '', '']],
                    });
                }
            }

            if (updates.length > 0) {
                await sheets.spreadsheets.values.batchUpdate({
                    spreadsheetId,
                    resource: { data: updates, valueInputOption: 'RAW' },
                });
                console.log('Linhas limpas e status retornado para Andamento');
            } else {
                console.log('Ainda não foi preciso limpar a planilha');
            }
        }
    } catch (error) {
        console.error('Ocorreu um erro ao limpar a planilha', error);
    }
}


main();