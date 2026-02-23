http://localhost:3000/post -> 80 HTTP ou 443 HTTPS

O http é o esquema (HTTP, HTTPS, FPT, etc...), localhost é o host (google.com, viniciusFarias.com.br, etc...), 3000 é a porta TCP usada para a conexão, e /post é o path, o caminho do recurso.

``` 
Ler Criar Atualizar Apagar
GET / POST / PATCH / PUT / DELETE / HEAD / OPTIONS / CONNECT / TRACE

/auth/login      POST    autenticar usuário      Aberta

/user/                  POST     Criar usuário      Aberta
/user/me                PATCH    Criar usuário      JWT
/user/me                DELETE   Criar usuário      JWT
/user/me                GET      Criar usuário      JWT
/user/me/password       PATCH    Criar usuário      JWT

/post/                  GET      Criar usuário      Aberta
/post/:slug            GET      Criar usuário      Aberta
/post/me                PATCH    Criar usuário      JWT
/post/me                GET      Criar usuário      JWT
/post/me/:uuid         GET      Criar usuário      JWT
/post/me/:uuid           PATCH    Criar usuário      JWT
/post/me/:uuid           DELETE   Criar usuário      JWT

``` 