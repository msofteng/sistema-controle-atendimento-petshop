# sistema-controle-atendimento-petshop

## Introdução

A solução envolve a criação de dois microsserviços, um desenvolvido em **Spring** utlizando banco de dados **H2** para persistir as informações do pet shop através de autenticação JWT e outro microfrontend construído em **Angular** para o usuário interagir com o sistema de controle de atendimentos através de um dashboard 100% funcional melhorado em questão de UI/UX com a implementação da biblioteca Bootstrap para deixar o design e layout mais sofisticado.

No microsserviço back-end há uma documentação da API com todos os endpoints da aplicação, porém dentro da documentação a opção de adicionar a autenticação JWT para o usuário colocar seu token antes de executar a requisição não funcionou conforme esperado, portanto recomendo utilizar alguma ferramenta semelhante ao Swagger como **Postman** ou **Insomnia** para testar os endpoints com base na documentação.

No microfrontend _tem a opção de adicionar a foto do usuário e dos pets do cliente, melhorando a identificação dos usuários e pets e podendo atualizá-las a qualquer momento adicionando uma nova ou removendo a existente_.

## Banco de Dados (DER - Diagrama Entidade-Relacionamento)

<p align="center">
  <img src="/controle-atendimento-petshop-service/db.png" width="50%"/><br>
  <sup>Modelo final do banco de dados construído para esse projeto</sup>
</p>

## Relacionamentos entre entidades (JPA)

```mermaid
classDiagram
    %% Definindo classes
    class AtendimentoEntity {
        - Long id
        - String descricao
        - Double valor
        - LocalDate data
        - Set~PetEntity~ pets
    }

    class ContatoEntity {
        - Long id
        - String tag
        - String tipo
        - String valor
    }

    class EnderecoEntity {
        - Long id
        - String logradouro
        - String cidade
        - String bairro
        - String tag
        - String complemento
    }

    class PetEntity {
        - Long id
        - String nome
        - LocalDate dataNascimento
        - String foto
        - Set~RacaEntity~ raca
    }

    class RacaEntity {
        - Long id
        - String descricao
    }

    class UsuarioEntity {
        - Long id
        - String nome
        - String password
        - String cpf
        - String foto
        - LocalDate dataCadastro
        - List~ContatoEntity~ contatos
        - List~EnderecoEntity~ enderecos
        - List~PetEntity~ pets
    }

    %% Relacionamentos
    UsuarioEntity "1" -- "*" ContatoEntity : possui
    UsuarioEntity "1" -- "*" EnderecoEntity : possui
    UsuarioEntity "1" -- "*" PetEntity : possui
    PetEntity "*" -- "*" RacaEntity : pertence a
    AtendimentoEntity "*" -- "*" PetEntity : inclui
    ContatoEntity "*" -- "1" UsuarioEntity : pertence a
    EnderecoEntity "*" -- "1" UsuarioEntity : pertence a
    PetEntity "*" -- "1" UsuarioEntity : pertence a
```

## Instruções de uso

Para construir todos os microsserviços desse projeto, _basta clonar esse repositório_ e utilizar o **Docker** _abrindo esse projeto no terminal de sua escolha e executando o comando_:

```bash
docker-compose up -d
```

Após a construção e subida de todo esse projeto para o seu Docker local poderá abrir as aplicações nos links abaixo:

- [Front-end (Angular)](http://localhost:4200/)
- [Back-end (Spring)](http://localhost:8080/) => direciona para a documentação da API

Também há a opção de abrir esse projeto no **IDX**, _um novo ambiente cloud de desenvolvimento do Google no qual utilizei para construir todo esse projeto (back-end e front-end)_.

![image](https://github.com/user-attachments/assets/486f0036-223e-4619-960d-cdc06d6a5b31)

![image](https://github.com/user-attachments/assets/03638f8c-a78c-4d94-b5c8-9d89a3ee74f9)

Colocar a URL deste repositório e criar um novo espaço de trabalho em nuvem em `Import`.<br>
_Se tiver conta no Google será mais fácil de acessar esse projeto, não precisando clonar o repositório acima e subindo-o no Docker localmente._

Neste projeto o ambiente em nuvem do Google já está todo configurado para executar o front-end e o back-end, **acessando-os a partir dos guias abaixo:**

![image](https://github.com/user-attachments/assets/0e2c91ea-c061-4197-bb72-5b017bcaec08)<br>
![image](https://github.com/user-attachments/assets/16937dd3-79a2-4c5f-a9f0-ae90e3a09929)

> Se decidir acessar esse projeto pelo IDX, **na documentação da API tem outros links para acessar os testes unitários** _(visualizar as instruções de teste abaixo antes de acessar a cobertura dos serviços)_

## Testes Unitários

Abra este repositório na sua máquina local ou no ambiente IDX e rode os comandos **para ...**

- **... para** rodar os testes unitários do front-end:

  ```bash
  cd controle-atendimento-petshop-web && npm test  # ou npm run test
  ```

  ![image](https://github.com/user-attachments/assets/39df14ed-b807-44b4-8cae-cd6ddec3b4ea)


- **... para** rodar os testes unitários do back-end:

  ```bash
  cd controle-atendimento-petshop-service && ./mvnw clean package
  ```

  ![image](https://github.com/user-attachments/assets/00a7b660-0b5a-4da8-9446-b893cce8d8f3)

<br>

> _Se tiver avaliando esse projeto dentro do IDX, na documentação da API tem os links para acessar o percentual de cobertura dos testes_ **(não funciona no Docker)**:
>
> ![image](https://github.com/user-attachments/assets/484e0cbc-73e4-4a94-8ca0-a869a4ce003a)
> <br>
> ### Front-end (Angular):
>
> <img src="https://github.com/user-attachments/assets/179c56e2-c1e3-4d18-bf0e-1fd4ab1ad926" width="50%"/>
>
> <br>
>
> ### Back-end (Spring):
>
> <img src="https://github.com/user-attachments/assets/c2a26fb4-4e14-45f0-b3b2-cb473a44c5d4" width="50%"/>

<br>

## Visualização (Resultados)

<p align="center">
  <img src="https://github.com/user-attachments/assets/3f296012-19bb-43da-be23-565166b98ca9" width="50%"/><br>
  <sup>Tela de Login</sup>
</p>
<br>
<p align="center">
  <img src="https://github.com/user-attachments/assets/b4226a22-cfab-43ea-98e8-32d8361500d4" width="50%"/><br>
    <sup>Tela de Cadastro (Funcionário)</sup>
</p>
<br>
<p align="center">
  <img src="https://github.com/user-attachments/assets/7e490d63-8751-4124-8d12-034d78b9f5b0" width="50%"/><br>
  <sup>Tela de Atualização (Cliente)</sup>
</p>
<br>
<p align="center">
  <img src="https://github.com/user-attachments/assets/bdaea7ec-9ac5-4c70-b46f-37cf112bad7b" width="50%"/><br>
  <img src="https://github.com/user-attachments/assets/633e2482-9695-487e-b2cb-f7c8434d3fe3" width="50%"/><br>
  <img src="https://github.com/user-attachments/assets/fe4fb2c1-2614-4ddc-b625-cd69c6bc0c98" width="50%"/><br>
  <sup>Tela de Criação de Atendimento (Funcionário)</sup>
</p>
<br><br>

Espero que tenham gostado! Qualquer dúvida é só me contatar por email.<br>
Um forte abraço!!! 😊🫂🧑🏻‍💻
