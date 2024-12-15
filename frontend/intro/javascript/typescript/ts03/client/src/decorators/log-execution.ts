export function logExecution(emSegundos = false) {
	return (
		target: unknown,
		propertyKey: string,
		descriptor: PropertyDescriptor,
	) => {
		const metodoOriginal = descriptor.value;
		descriptor.value = function (...args: unknown[]) {
			let divisor = 1;
			let unidade = "milisegundos";
			if (emSegundos) {
				divisor = 1000;
				unidade = "segundos";
			}
			const t1 = performance.now();
			const retorno = metodoOriginal.apply(this, args);
			const t2 = performance.now();
			console.log(
				`${propertyKey}, tempo de execução: ${(t2 - t1) / divisor} ${unidade}`,
			);
			retorno;
		};

		return descriptor;
	};
}
export function logGeneric(
	target: unknown,
	propertyKey: string,
	descriptor: PropertyDescriptor,
) {
	descriptor.value = () => {
		console.log(target, propertyKey, descriptor);
	};

	return descriptor;
}
