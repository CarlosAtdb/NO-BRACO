# No Braço — site do app

Estes arquivos formam o app inteiro. Para publicar no GitHub Pages,
envie **todos eles juntos**, soltos na raiz do repositório — não dentro
de uma pasta.

- index.html .............. o app
- manifest.webmanifest .... nome e ícones do app instalado
- sw.js ................... faz funcionar offline
- icon-192.png / icon-512.png / icon-512-maskable.png

Depois de publicado, abra o endereço no celular e use
"Adicionar à Tela de Início".

## Ao receber uma versão nova
Substitua o `index.html` e o `sw.js`. A versão do cache dentro do
`sw.js` precisa mudar a cada atualização — eu já entrego assim.
