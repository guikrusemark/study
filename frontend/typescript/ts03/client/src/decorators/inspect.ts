export function inspect(
	target: unknown,
	propertyKey: string,
	descriptor: PropertyDescriptor,
) {
	const metodoOriginal = descriptor.value;
	descriptor.value = function (...args: unknown[]) {
		console.log(`--- Método: ${propertyKey}`);
		console.log(`--- Parâmetros: ${JSON.stringify(args)}`);
		const retorno = metodoOriginal.apply(this, args);
		console.log(`--- Retorno: ${JSON.stringify(retorno)}`);
		return retorno;
	};
	return descriptor;
}
