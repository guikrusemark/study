export function domInjector(seletor) {
    return (target, propertyKey) => {
        console.log(`Modificando protype ${target.constructor.name}
             e adicionando getter para a propriedade ${propertyKey}`);
        let elemento;
        const getter = () => {
            if (!elemento) {
                elemento = document.querySelector(seletor);
                console.log(`buscando elemento do DOM com o seletor
                 ${seletor} para injetar em ${propertyKey}`);
            }
            return elemento;
        };
        Object.defineProperty(target, propertyKey, { get: getter });
    };
}
