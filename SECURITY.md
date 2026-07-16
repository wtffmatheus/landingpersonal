# Segurança do site

## O que foi implementado

- Site estático, sem banco de dados, login, painel administrativo ou API pública.
- JavaScript próprio e sem bibliotecas de terceiros.
- Política de Segurança de Conteúdo (CSP) restritiva.
- Proteção contra enquadramento por outros sites (`frame-ancestors` e `X-Frame-Options`).
- `nosniff`, política de referência, política de permissões e HSTS nos arquivos de hospedagem.
- Links externos com `noopener noreferrer`.
- Formulário sem envio para servidor: a mensagem é montada localmente e aberta no WhatsApp.
- Entradas limitadas, validadas e tratadas sem uso de `innerHTML`, `eval` ou execução de texto do usuário.
- Mapa do Google carregado somente após clique do visitante.
- Sem cookies, trackers ou pixels ativados por padrão.

## XSS, CSRF e injeções

A superfície é pequena porque o projeto não processa dados no servidor. O formulário não persiste informações e o conteúdo digitado é usado apenas para formar uma URL do WhatsApp com `encodeURIComponent`.

CSRF não se aplica à versão atual porque não existe sessão, autenticação ou operação de escrita em servidor. Caso um backend seja adicionado, deverão ser implementados token CSRF, validação no servidor, limitação de requisições e logs.

## DDoS

Código HTML, CSS ou JavaScript não consegue impedir DDoS sozinho. A proteção deve ocorrer na camada de DNS, CDN, WAF e hospedagem.

Recomendação de publicação:

1. Usar Cloudflare Pages, Netlify ou Vercel para servir os arquivos estáticos por CDN.
2. Se houver domínio próprio, colocar o DNS atrás de um proxy/CDN com mitigação de DDoS.
3. Ativar WAF, proteção contra bots e limitação de requisições caso seja adicionado backend.
4. Não expor diretamente o IP de um servidor de origem.
5. Manter HTTPS obrigatório.

## Antes de adicionar Analytics ou Meta Pixel

- Implementar banner de consentimento.
- Atualizar a Política de Privacidade.
- Ajustar a CSP para permitir apenas os domínios necessários.
- Evitar disparar tags antes do consentimento.

## Reporte de vulnerabilidade

Consulte `.well-known/security.txt`.
