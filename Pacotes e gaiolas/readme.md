Aqui um prototipo basico criado com um GPT que define o modelo de pacote a ser salvo na rede. No caso, pacote é lido, se for o primeiro coletor identificado através de cookies, cria o objeto com base no Schema. Caso esteja em transito, há o push nesse objeto com base nos dados salvos no coletor, e destroi quando chega no ultimo.

``` mermaid
graph TD
    A[Início] --> B{Pacote lido?}
    B -->|Não| C[Aguardar leitura do pacote]
    B -->|Sim| D{É o primeiro coletor?}
    D -->|Sim| E[Criar objeto de pacote com Schema]
    E --> F[Salvar objeto no banco de dados]
    F --> G[Definir dados do coletor]
    G --> H[Enviar confirmação de criação do objeto]

    D -->|Não| I{Pacote em trânsito?}
    I -->|Sim| J[Atualizar objeto de pacote]
    J --> K[Adicionar dados do coletor ao objeto]
    K --> H
    I -->|Não| L{É o último coletor?}
    L -->|Sim| M[Remover objeto de pacote]
    M --> N[Enviar confirmação de remoção]
    L -->|Não| O[Continuar monitorando o pacote]
    
    H --> P[Fim]
    N --> P
    O --> P


```