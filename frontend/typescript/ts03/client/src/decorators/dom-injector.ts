export function domInjector(seletor: string) {
	return (target: any, propertyKey: string) => {
		console.log(`Modificando protype ${target.constructor.name}
             e adicionando getter para a propriedade ${propertyKey}`);

		let elemento: HTMLElement;

		const getter = () => {
			if (!elemento) {
				elemento = <HTMLElement>document.querySelector(seletor);
				console.log(`buscando elemento do DOM com o seletor
                 ${seletor} para injetar em ${propertyKey}`);
			}

			return elemento;
		};

		Object.defineProperty(target, propertyKey, { get: getter });
	};
}
