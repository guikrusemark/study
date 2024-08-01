export function sanitizeNode(
	target: unknown,
	propertyKey: string,
	descriptor: PropertyDescriptor,
) {
	const metodoOriginal = descriptor.value;
	descriptor.value = function (...args: unknown[]) {
		let retorno = metodoOriginal.apply(this, args);
		if (typeof retorno === "string") {
			retorno = retorno.replace(/<script>[\s\S]*?<\/script>/, "");
		}
		return retorno;
	};
	return descriptor;
}
