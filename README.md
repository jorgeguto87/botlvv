# botlvv

* CHATBOT voltado para empresa de móveis planejados, porém pode ser utilizado para outras áreas.

* CONSTRUÇÃO:
- NodeJS, utilizando a api whatsapp-web.js;

* FUNCIONALIDADES:
- Bom Dia, Boa Tarde e Boa noite, com correção para UTC, o horário de atendimento foi adiantado em +3hs para para conciliar com o TIMESTAMP do servidor virtual que está em USCENTRAL.
- Após realizar o briefing ele chama o atendente ou informa que está fora do horário de expediente, dependendo do dia e horário, sendo Domingo com uma mensagem em especial somente para o Domingo.
- MSG REACT com palavras chaves.
- Menu de opções com comandos msg.body em strings com aspas duplas para não ser acionado com palavras ou números compostos.
- Fluxo de atendimento contínuo.
  
