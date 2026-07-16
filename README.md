# RV Fisiologia — Lead page

Lead page estática para o Programa de 45 Dias da Rosangela Varas, focada em conversão pelo WhatsApp.

## Estrutura

```text
rvpersonal-leadpage/
├── index.html
├── politica-de-privacidade.html
├── 404.html
├── assets/
│   ├── css/styles.css
│   ├── js/main.js
│   ├── img/
│   └── video/
├── _headers
├── netlify.toml
├── vercel.json
├── .htaccess
├── site.webmanifest
├── robots.txt
├── sitemap.xml
├── AUDITORIA.md
└── SECURITY.md
```

## Rodar localmente

O projeto não precisa de Node ou instalação de pacotes.

```bash
python -m http.server 8080
```

Abra `http://localhost:8080`.

## Publicar no GitHub Pages

1. Substitua os arquivos do repositório por este conteúdo.
2. Faça commit e push para a branch `main`.
3. Em **Settings → Pages**, selecione **Deploy from a branch**.
4. Escolha `main` e a pasta `/root`.

Observação: o GitHub Pages não aplica `_headers`, `netlify.toml`, `vercel.json` ou `.htaccess`. A CSP principal também foi incluída no HTML para manter uma proteção básica. Para cabeçalhos HTTP completos e proteção de infraestrutura, prefira Cloudflare Pages, Netlify ou Vercel.

## Antes de publicar

Revise `AUDITORIA.md`, confirme telefone, endereço, credenciais e detalhes do programa. Atualize os URLs em:

- `index.html`
- `robots.txt`
- `sitemap.xml`
- `.well-known/security.txt`

## Alterar WhatsApp

Busque por `5511991234513` nos arquivos e troque pelo número definitivo no formato internacional, somente com números.

## Analytics e Meta Pixel

Não estão ativados. O arquivo `assets/js/main.js` possui eventos preparados para `dataLayer` e `fbq`, mas qualquer tag deve ser adicionada somente com consentimento e atualização da política de privacidade.


## Atualização com mídia real

Esta versão inclui:

- Logo oficial da RV Fisiologia.
- Dois casos reais apresentados como resultados individuais de 10 kg e 55 kg.
- Vídeo vertical explicativo, hospedado localmente e sem autoplay.
- Link oficial do Instagram `@rvfisiologia`.

Antes da campanha pública, mantenha arquivadas as autorizações de uso de imagem e confirme que os números divulgados correspondem aos registros reais. Resultados individuais nunca devem ser tratados como garantia.

## Domínio personalizado

O código usa temporariamente `https://wtffmatheus.github.io/landingpersonal/` em canonical, Open Graph, robots, sitemap e JSON-LD. Quando o domínio definitivo estiver ativo, substitua essa URL em todos esses arquivos. O arquivo `CNAME` gerado pelo GitHub Pages deve ser preservado ao copiar esta atualização.
