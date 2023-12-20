async function fetchVideos(query = '') {
    if(!query)
        query = '';
    const response = await fetch(`http://localhost:3000/videos?q=${query}`);
    return await response.json();
}

async function addVideo(titulo, descricao, url) {
    const response = await fetch('http://localhost:3000/videos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            titulo: titulo,
            descricao: descricao,
            url: url
        })
    });
    if(!response.ok)
        throw new Error('ERRO DE REQUISIÇÃO');
    
    return await response.json();
}

export const connectApi = { 
    fetchVideos, 
    addVideo
};
