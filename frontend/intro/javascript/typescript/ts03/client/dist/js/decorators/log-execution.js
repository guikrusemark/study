export function logExecution(emSegundos = false) {
    return (target, propertyKey, descriptor) => {
        const metodoOriginal = descriptor.value;
        descriptor.value = function (...args) {
            let divisor = 1;
            let unidade = "milisegundos";
            if (emSegundos) {
                divisor = 1000;
                unidade = "segundos";
            }
            const t1 = performance.now();
            const retorno = metodoOriginal.apply(this, args);
            const t2 = performance.now();
            console.log(`${propertyKey}, tempo de execução: ${(t2 - t1) / divisor} ${unidade}`);
            retorno;
        };
        return descriptor;
    };
}
export function logGeneric(target, propertyKey, descriptor) {
    descriptor.value = () => {
        console.log(target, propertyKey, descriptor);
    };
    return descriptor;
}
