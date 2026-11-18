# Serverless Access Counter 

Projeto desenvolvido como parte do Trabalho de Conclusão de Curso da **Escola da Nuvem**, com o objetivo de demonstrar uma aplicação web utilizando arquitetura Serverless na AWS.

A aplicação simula uma página de lançamento de produto, com uma campanha de pré-lançamento e contadores para acompanhar o interesse dos visitantes.

## 1. Cenário do projeto

Uma startup de marketing está preparando o lançamento de um novo produto. Para despertar a curiosidade do público, a empresa criou uma página de campanha com a mensagem "Em Breve".

A startup precisa acompanhar quantas pessoas demonstraram interesse acessando a página, mas existe uma incerteza importante: o número de acessos pode variar de apenas 10 até 1 milhão.

Por isso, a solução precisa:

- Ser econômica, evitando custos desnecessários quando houver poucos acessos.
- Escalar automaticamente conforme o aumento da demanda.
- Não depender de servidores permanentemente ligados.
- Registrar e apresentar estatísticas de acesso.
- Identificar visitas recorrentes e visitantes únicos.

## 2. Objetivo

Desenvolver uma aplicação web hospedada em uma arquitetura Serverless na AWS, capaz de registrar acessos e apresentar estatísticas da campanha.

A solução foi pensada para demonstrar como serviços gerenciados da AWS podem trabalhar em conjunto para oferecer escalabilidade, disponibilidade e eficiência de custos.

## 3. Funcionalidades

A página possui uma identidade visual temática, com animações e elementos gráficos inspirados no espaço.

Os indicadores previstos são:

| Indicador | Descrição |
|---|---|
| Total de visitas | Quantidade total de acessos registrados |
| Visitantes únicos | Quantidade de identificadores de navegador distintos |
| Visitas recorrentes | Acessos adicionais realizados por navegadores já identificados |

### Identificação de visitantes

A aplicação utiliza a ideia de um identificador persistente armazenado em um cookie do navegador.

No primeiro acesso, um identificador aleatório é gerado. Nas visitas seguintes, o mesmo navegador pode reutilizar esse identificador.

Isso permite distinguir:
- Primeiro acesso de um navegador.
- Novos acessos de um navegador já conhecido.
- Quantidade total de visitas registradas.

**Importante:** o identificador representa um navegador, não necessariamente uma pessoa. A troca de dispositivo, navegador ou exclusão dos cookies pode gerar um novo identificador.

## 4. Arquitetura AWS proposta

A arquitetura planejada utiliza os seguintes serviços:

| Serviço | Responsabilidade |
|---|---|
| Amazon S3 | Armazenamento dos arquivos estáticos da aplicação |
| Amazon CloudFront | Distribuição do conteúdo por uma CDN |
| Amazon API Gateway | Disponibilização do endpoint para registro de acessos |
| AWS Lambda | Processamento das requisições e atualização dos indicadores |
| Amazon DynamoDB | Armazenamento dos dados de acesso |

### Fluxo de funcionamento

1. O visitante acessa a página hospedada no Amazon S3.
2. O Amazon CloudFront entrega o conteúdo ao navegador.
3. O JavaScript identifica o navegador por meio de um cookie.
4. Uma requisição é enviada ao Amazon API Gateway.
5. O API Gateway aciona uma função AWS Lambda.
6. A Lambda registra o acesso e atualiza os dados no DynamoDB.
7. A aplicação recebe os indicadores atualizados e apresenta os números na página.

### Diagrama da arquitetura

```text
             VISITANTE
                 |
                 v
          Amazon CloudFront
                 |
                 v
             Amazon S3
          (Página estática)
                 |
                 v
            JavaScript
                 |
                 v
          Amazon API Gateway
                 |
                 v
             AWS Lambda
                 |
                 v
           Amazon DynamoDB
                 |
                 v
       Estatísticas atualizadas
                 |
                 v
          Página da campanha
```

## 5. Tecnologias utilizadas

### Front-end
- HTML5
- CSS3
- JavaScript
- GSAP (animações)
- SplitText (animação de caracteres)

### AWS
- Amazon S3
- Amazon CloudFront
- Amazon API Gateway
- AWS Lambda
- Amazon DynamoDB

### Controle de versão
- Git
- GitHub

## 6. Estrutura do projeto

A estrutura inicial da aplicação é organizada para separar os arquivos responsáveis pela apresentação e pelo comportamento da página.

```text
serverless-access-counter/
│
├── index.html
├── style.css
├── script.js
├── README.md
│
└── assets/
    └── (recursos visuais do projeto)
```

A estrutura poderá evoluir conforme a implementação dos serviços AWS e do back-end Serverless.

## 7. Status do desenvolvimento

- [x] Desenvolvimento inicial da página de campanha.
- [x] Criação da identidade visual COSMIC STRAWBERRY.
- [x] Implementação das animações com GSAP.
- [x] Criação dos componentes visuais dos indicadores.
- [x] Implementação inicial da identificação de navegadores por cookie.
- [x] Ajustes iniciais de responsividade.
- [ ] Implementação da API com Amazon API Gateway.
- [ ] Desenvolvimento da função AWS Lambda.
- [ ] Modelagem e integração com Amazon DynamoDB.
- [ ] Integração do front-end com a API.
- [ ] Testes de concorrência e escalabilidade.
- [ ] Publicação da aplicação na AWS.
- [ ] Documentação dos custos e resultados dos testes.

## 8. Considerações sobre escalabilidade e custos

A arquitetura Serverless foi escolhida porque permite utilizar serviços gerenciados e pagar de acordo com o consumo, respeitando os limites e condições de cobrança de cada serviço.

O Amazon API Gateway recebe as requisições, o AWS Lambda processa os eventos e o DynamoDB permite armazenar e atualizar os indicadores sem a necessidade de administrar servidores de banco de dados.

Para garantir a consistência dos números em cenários de acessos simultâneos, a implementação deverá utilizar operações atômicas de atualização no DynamoDB.

Os custos reais dependerão do volume de requisições, armazenamento, transferência de dados e configuração dos serviços.

## 9. Privacidade

O identificador de visitante é gerado aleatoriamente e armazenado no navegador por meio de cookie.

A solução não precisa coletar nome, e-mail ou outros dados pessoais para contabilizar visitas.

A implementação deverá considerar transparência sobre a utilização dos cookies, finalidade do tratamento e período de retenção dos dados, observando a LGPD.

## 10. Sobre o projeto

Projeto acadêmico desenvolvido em equipe como parte do Trabalho de Conclusão de Curso da Escola da Nuvem.

**Tema:** Contador de Acessos com Arquitetura Serverless na AWS.

**Objetivo principal:** demonstrar uma solução econômica e escalável para monitoramento de acessos em uma campanha digital, capaz de acompanhar desde pequenos volumes até grandes quantidades de requisições.
