# RecintosZoo

Este projeto implementa uma lógica para alocação de animais em recintos de um zoológico. A classe `RecintosZoo` é responsável por gerenciar a organização dos recintos, garantir que os animais sejam colocados em biomas adequados e respeitar as regras específicas para a convivência entre as espécies.

## Estrutura do Projeto

O código principal está contido na classe `RecintosZoo`, que gerencia a lista de recintos e a informação sobre os animais permitidos no zoológico.

### Recintos Disponíveis

Os recintos possuem um bioma, um tamanho total e uma lista de animais já presentes. A tabela abaixo descreve os recintos no zoológico:

| Número | Bioma          | Tamanho Total | Animais Existentes  |
|--------|----------------|---------------|---------------------|
| 1      | Savana         | 10            | 3 macacos           |
| 2      | Floresta       | 5             | Nenhum              |
| 3      | Savana e Rio   | 7             | 1 gazela            |
| 4      | Rio            | 8             | Nenhum              |
| 5      | Savana         | 9             | 1 leão              |

### Animais Permitidos

Cada animal possui um tamanho, biomas compatíveis e, em alguns casos, pode ser carnívoro. A tabela abaixo lista as espécies suportadas:

| Espécie    | Tamanho | Bioma                | Carnívoro |
|------------|---------|----------------------|-----------|
| LEÃO       | 3       | Savana               | Sim       |
| LEOPARDO   | 2       | Savana               | Sim       |
| CROCODILO  | 3       | Rio                  | Não       |
| MACACO     | 1       | Savana, Floresta     | Não       |
| GAZELA     | 2       | Savana               | Não       |
| HIPOPÓTAMO | 4       | Savana, Rio          | Não       |

## Regras de Alocação

1. **Bioma Adequado**: Um animal só pode ser alocado em um recinto cujo bioma seja compatível com sua espécie.
2. **Espaço Disponível**: O recinto deve ter espaço suficiente para acomodar todos os indivíduos do novo animal.
3. **Carnívoros**: Animais carnívoros só podem compartilhar recintos com outros da mesma espécie.
4. **Espaço Extra**: Quando um recinto contém mais de uma espécie, é necessário reservar um espaço extra.
5. **Hipopótamos**: Só podem tolerar outras espécies em recintos que combinam Savana e Rio.

## Métodos

### `analisaRecintos(animal, quantidade)`

Este método recebe como parâmetros o tipo de animal e a quantidade de indivíduos que se deseja alocar em um recinto. Ele retorna uma lista de recintos viáveis ou mensagens de erro se não houver opções disponíveis ou se os dados de entrada forem inválidos.

#### Entradas
- `animal`: Nome da espécie (ex: "LEÃO", "MACACO").
- `quantidade`: Quantidade de indivíduos que se deseja alocar.

#### Saída

- Uma estrutura contendo uma lista de recintos viáveis, no formato:
  ```js
  {
    recintosViaveis: ["Recinto 1 (espaço livre: 5 total: 10)", "Recinto 3 (espaço livre: 2 total: 7)"]
  }
  ```
  
- Em caso de erro:
  ```js
  { erro: 'Animal inválido' }
  ```

## Exemplos de Uso

```js
const zoo = new RecintosZoo();

// Exemplo válido
console.log(zoo.analisaRecintos('MACACO', 2));
// Saída: { recintosViaveis: ["Recinto 1 (espaço livre: 5 total: 10)", "Recinto 2 (espaço livre: 3 total: 5)", "Recinto 3 (espaço livre: 2 total: 7)"] }

// Exemplo inválido
console.log(zoo.analisaRecintos('UNICORNIO', 1));
// Saída: { erro: 'Animal inválido' }
```

## Instalação

1. Clone o repositório.
2. Instale as dependências:
   ```bash
   npm install
   ```

## Testes

Os testes podem ser executados utilizando o Jest. Para rodar os testes:

```bash
npm test
```

## Conclusão

Este código fornece uma base para resolver o problema de alocação de animais em um zoológico, respeitando biomas, espaço disponível e as regras de convivência entre as espécies. O foco está em garantir que a inclusão de novos animais seja feita de forma compatível com os recintos existentes, levando em consideração a preservação do conforto e segurança de todos os animais no zoológico.