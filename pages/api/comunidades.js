import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequests(request, response) {
    if(request.method === 'POST') {
        const TOKEN = '579374341265202c60141bdd01cb76';
        const client = new SiteClient(TOKEN);
        
        // Validar os dados, antes de sair cadastrando
        const registroCriado = await client.items.create({
            itemType: "976602", // ID do Model de "Communities" criado pelo Dato
            ...request.body,
            // title: "Comunidade de Teste",
            // imageUrl: "https://github.com/rnldourado.png",
            // creatorSlug: "rnldourado"
        })
    
        console.log(registroCriado);
    
        response.json({
            dados: 'Algum dado qualquer',
            registroCriado: registroCriado,
        })
        return;
    }

    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem!'
    })
}