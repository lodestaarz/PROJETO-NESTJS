// Arquivo para filtrar erros e padronizar as exceptions

import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";

/*
    {
        "message": "Usuário ou senha inválidos",
        "error": "Unauthorized",
        "statusCode": 401
    }

    }
        "message": ["E-mail inválido"],
        "error": "Bad Request",
        "statusCode": 400

    }

    {
        "message": ["E-mail inválido"],
        "error": "Bad Request",
        "statusCode": 400
    }
    
    {
        "statusCode": 500,
        "error": "Internal server error"
    }
*/
@Catch() // Da pra passar como parâmetro do decorator as exceptions para ele captar só elas. Como o objetivo aqui é criar um padrão, ele ficou com o parâmetro vazio.
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) { // O argumentHost é pra pegar o contexto do erro, pode ser Request, Response ou o que preferir.
        
        const response = host.switchToHttp().getResponse();

        const isHttpException = exception instanceof HttpException;

        const status = isHttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR; 

        const defaultMessage = "Internal Server Error";
        const defaultError = "Internal Server Error";

        let messages: string[] = [defaultMessage];
        let errorName = defaultError;
        
        if(isHttpException) {
            const responseData = exception.getResponse();

            if(typeof responseData === "string") {
                messages = [responseData];
            }
            
            if(typeof responseData === "object" && responseData !== null) {
                const {message, error} = responseData as Record<string, any>

                if(Array.isArray(message)) {
                    messages = message as string[];
                } else if(typeof message === "string") {
                    messages = [message];
                }

                if(typeof error === "string") {
                    errorName = error;
                }
            }
        }
        
        return response.status(400).json({ 
            message: messages,
            error: defaultError,
            statusCode: status,
        });
    }
}