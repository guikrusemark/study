// const consultaCEP = fetch('https://viacep.com.br/ws/01001000/json/')
//     .then(response => response.json())
//     .then(response => {
//         console.log(response)
//     })
//     .catch(error => console.log(error))
//     .finally(() => console.log('Processamento concluido com mensagem'));
/*****************************************************************************/

async function searchAddress(zipCode) {
    try {
        const fetchZipCode = await fetch(`https://viacep.com.br/ws/${zipCode}/json/`);
        const response = await fetchZipCode.json();
        console.log(response);
        if (response.hasOwnProperty('erro')) {
            throw Error('CEP não encontrado');
        }
        return response;
    } catch {
        console.log('Erro ao buscar CEP');
    }
    return null;
}

function fillAddressFields(address) {
    if (address) {
        document.getElementById('erro-cep').innerHTML = '';
        
        document.getElementById('endereco').value = address.logradouro;
        document.getElementById('bairro').value = address.bairro;
        document.getElementById('cidade').value = address.localidade;
        document.getElementById('estado').value = address.uf;
        
        document.getElementById('numero').focus();
    } else {
        let pTagError = document.createElement('p').innerText = 'CEP não encontrado';
        document.getElementById('erro-cep').append(pTagError)
    }
}
const zipCodeInput = document.querySelector('#cep');
zipCodeInput.addEventListener("focusout", async () => {fillAddressFields(await searchAddress(zipCodeInput.value))});

// let zipCodes = [32310220, 32370780];
// let addressesRequisitions = zipCodes.map(zipCode => searchAddress(zipCode));
// Promise.all(addressesRequisitions).then(responses => {
//     console.log(responses);
// })
