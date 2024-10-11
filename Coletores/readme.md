Aqui há o cruzamento de dados e criação do token de identificação do coletor. Aqui seria usado para segmentar os setores com base nos dados recebidos do servidor

```mermaid
classDiagram
    class Coletor {
        +String responsavel
        +String setorAtual
        +String origem
        +String destino
        +String statusPacote
        +String senha
        +String criarToken()
        +void solicitarDados()
        +void receberDados()
    }

    class Servidor {
        +String dadosSetor
        +void ouvirSolicitacao()
        +void enviarDados()
        +String validarToken(token)
        +void processarDados(dados)
    }

    Coletor --> Servidor : solicita
    Servidor --> Coletor : envia
    Coletor --> Coletor : criarToken()
```