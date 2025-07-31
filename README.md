# Jogo de Apostas - Tiro ao Alvo

Um projeto Next.js com um jogo interativo de tiro ao alvo nas garrafas.

## 🎯 Sobre o Jogo

O **Tiro ao Alvo** é um jogo onde o jogador deve clicar no momento certo para acertar as garrafas que giram em órbita. Quando uma garrafa é acertada na mira vermelha:

- ✅ A garrafa quebra e desaparece após 0.5 segundos
- 🚀 A velocidade de todas as garrafas aumenta em 20%
- 🏆 O jogador ganha 10 pontos
- 📊 O contador de garrafas quebradas é incrementado

## 🚀 Tecnologias Utilizadas

- **Next.js 15.4.5** - Framework React
- **React 19.1.0** - Biblioteca para interfaces
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Canvas API** - Renderização do jogo

## 🎮 Como Jogar

1. Acesse a página inicial em `http://localhost:3000`
2. Clique no botão "🎯 Jogar Tiro ao Alvo"
3. Observe as garrafas girando em círculo
4. Clique quando uma garrafa passa pela mira vermelha no topo
5. Tente quebrar o máximo de garrafas possível!
6. Use o botão "Reiniciar Jogo" para começar novamente

## 🛠️ Instalação e Execução

```bash
# Clone o repositório
git clone [url-do-repositorio]

# Entre no diretório
cd jogo-de-apostas

# Instale as dependências
npm install

# Execute o projeto em modo de desenvolvimento
npm run dev

# Abra http://localhost:3000 no seu navegador
```

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── jogo/
│   │   └── page.tsx          # Página do jogo
│   ├── layout.tsx            # Layout principal
│   └── page.tsx              # Página inicial
├── components/
│   └── JogoGarrafa.tsx       # Componente principal do jogo
public/
├── images/
│   ├── garrafa.png           # Imagem da garrafa inteira
│   └── quebrada.png          # Imagem da garrafa quebrada
```

## 🎨 Características do Jogo

- **Gráficos**: Imagens customizadas para garrafas inteiras e quebradas
- **Física**: Movimento circular suave das garrafas
- **Progressão**: Aumento gradual da dificuldade
- **Interface**: Design responsivo e intuitivo
- **Placar**: Sistema de pontuação e contador de garrafas
- **Navegação**: Links entre páginas e botão de reiniciar

## 🔧 Scripts Disponíveis

- `npm run dev` - Executa em modo de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run start` - Executa build de produção
- `npm run lint` - Executa verificação de código

## 📝 Migração Realizada

Este projeto foi migrado de um jogo HTML/CSS/JavaScript vanilla para Next.js, incluindo:

1. **Conversão para React**: Transformação do código JavaScript em componente React com hooks
2. **Tipagem TypeScript**: Adição de tipos para maior segurança
3. **Estilização Tailwind**: Migração dos estilos CSS para classes Tailwind
4. **Roteamento Next.js**: Criação de páginas e navegação
5. **Otimização de Imagens**: Uso do sistema de assets do Next.js
6. **Estado Reativo**: Implementação de estado com useState para placar e controles

## 🌟 Próximas Funcionalidades

- [ ] Sistema de high scores
- [ ] Diferentes níveis de dificuldade
- [ ] Efeitos sonoros
- [ ] Animações de explosão
- [ ] Modo multiplayer
- [ ] Conquistas e badges

---

Desenvolvido com ❤️ usando Next.js
