# Auditoria e reorganização da lead page

## 1. Oferta principal identificada

- Programa presencial de 45 dias.
- Atendimento em Atibaia e região.
- Avaliação, planejamento, acompanhamento e reavaliação.
- Conversão principal pelo WhatsApp.

## 2. Público identificado

- Pessoas que querem emagrecer com acompanhamento.
- Pessoas com rotina corrida e dificuldade de constância.
- Pessoas que já tentaram estratégias genéricas ou extremas.
- Pessoas que procuram atendimento presencial em Atibaia.

## 3. Problemas encontrados na versão anterior

- CTAs apontavam para `curso.html`, arquivo inexistente.
- Imagens locais não estavam incluídas no pacote.
- Imagens de antes e depois eram placeholders.
- Nomes, resultados e depoimento apareciam como reais sem material de comprovação no projeto.
- Promessa de “até 10 kg” recebia destaque maior do que a explicação sobre variação individual.
- Site tinha aparência institucional e pouco direcionamento de conversão.
- Não havia FAQ, formulário de pré-atendimento, página de privacidade ou política de segurança.
- Não havia configuração de cabeçalhos de segurança para hospedagem.
- Mapa e fontes dependiam de terceiros logo no carregamento.

## 4. Estratégia aplicada

- Um único objetivo: solicitar avaliação pelo WhatsApp.
- Mensagens de CTA padronizadas.
- Estrutura compacta e visual inspirada em estúdio de treinamento profissional.
- Promessa responsável, sem garantia de resultado.
- Remoção de depoimentos e resultados não comprovados.
- Formulário que não coleta dados no servidor.
- Mapa carregado somente após consentimento por clique.
- Conteúdo organizado por problema, processo, benefícios, qualificação, profissional, FAQ e contato.

## 5. Informações a confirmar antes de publicar anúncios

- Número de WhatsApp definitivo.
- Endereço definitivo.
- Formação, especializações e registro profissional de Rosangela Varas.
- Itens exatos incluídos no programa.
- Frequência de encontros e forma de acompanhamento.
- Formas de pagamento e preço, caso sejam divulgados.
- Política de cancelamento.
- Autorização escrita para qualquer foto, resultado ou depoimento futuro.
- Domínio definitivo para atualizar canonical, Open Graph, sitemap e security.txt.

## 6. Arquivos de segurança e hospedagem

- `_headers`: Cloudflare Pages e Netlify.
- `netlify.toml`: configuração para Netlify.
- `vercel.json`: configuração para Vercel.
- `.htaccess`: Apache/cPanel.
- `SECURITY.md`: orientação de XSS, CSRF, DDoS e trackers.
- `.well-known/security.txt`: canal de reporte de vulnerabilidade.
