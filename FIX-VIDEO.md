# Correção do player de vídeo

Alterações aplicadas:

- vídeo recodificado em H.264 Constrained Baseline, nível 3.1, AAC e fast start;
- botão de reprodução próprio com chamada explícita a `video.play()`;
- fallback para abrir o arquivo diretamente;
- camadas decorativas com `pointer-events: none` para não capturar toques;
- JavaScript isolado em inicializadores seguros, evitando que um erro paralise os demais botões;
- versionamento de CSS, JavaScript, pôster e vídeo para quebrar cache antigo.
