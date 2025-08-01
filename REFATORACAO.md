# Estrutura Refatorada do Jogo

## 📁 Organização dos Arquivos

```
src/
├── components/
│   ├── jogo/                    # Componentes específicos do jogo
│   │   ├── Placar.tsx          # Componente do placar
│   │   ├── BotoesControle.tsx  # Botões de controle
│   │   ├── CanvasJogo.tsx      # Canvas principal
│   │   ├── PopupResultado.tsx  # Popup de resultado
│   │   ├── configuracao.ts     # Constantes do jogo
│   │   └── index.ts            # Exportações
│   ├── JogoGarrafa.tsx         # Componente original (não usado)
│   └── JogoGarrafaRefatorado.tsx # Componente principal refatorado
├── hooks/                      # Hooks customizados
│   ├── useJogoEstado.ts       # Estado do jogo
│   ├── useGarrafas.ts         # Lógica das garrafas
│   ├── useImagensJogo.ts      # Carregamento de imagens
│   ├── useJogoLogica.ts       # Lógica principal
│   └── index.ts               # Exportações
├── types/
│   └── jogo.ts                # Tipos TypeScript
```

## 🎯 Benefícios da Refatoração

### ✅ **Separação de Responsabilidades**

- **Componentes**: Cada um tem uma responsabilidade específica
- **Hooks**: Lógica reutilizável e testável
- **Tipos**: Definições centralizadas
- **Configuração**: Constantes em um local

### ✅ **Manutenibilidade**

- Código mais fácil de entender
- Modificações isoladas por funcionalidade
- Testes unitários mais simples

### ✅ **Reutilização**

- Hooks podem ser reutilizados em outros componentes
- Componentes modulares
- Configurações centralizadas

### ✅ **Performance**

- Hooks otimizados com `useCallback`
- Componentes menores re-renderizam menos
- Lógica isolada

## 🔧 Como Funciona

### **useJogoLogica** (Hook Principal)

Orquestra todos os outros hooks e fornece:

- Estado completo do jogo
- Handlers para eventos
- Refs para canvas e imagens

### **useJogoEstado** (Gerenciamento de Estado)

- Controla pontuação, tempo, balas
- Gerencia status do jogo
- Timer automático

### **useGarrafas** (Lógica das Garrafas)

- Criação e posicionamento
- Detecção de acertos
- Controle de velocidade

### **useImagensJogo** (Recursos)

- Carregamento assíncrono
- Referências para canvas

## 📊 Componentes

### **Placar**

```tsx
<Placar estado={estado} />
```

### **BotoesControle**

```tsx
<BotoesControle
  statusJogo={statusJogo}
  onIniciarJogo={handleIniciar}
  onReiniciarJogo={handleReiniciar}
/>
```

### **CanvasJogo**

```tsx
<CanvasJogo
  garrafasRef={garrafasRef}
  imagensCarregadas={imagensCarregadas}
  // ... outras props
/>
```

### **PopupResultado**

```tsx
<PopupResultado
  estado={estado}
  onJogarNovamente={handleJogarNovamente}
  onVoltarMenu={handleVoltarMenu}
/>
```

## 🚀 Próximos Passos

1. **Testes**: Adicionar testes unitários para hooks
2. **Storybook**: Documentar componentes
3. **Acessibilidade**: Melhorar suporte a screen readers
4. **Performance**: Adicionar React.memo onde necessário
5. **Configurações**: Tornar o jogo mais customizável
