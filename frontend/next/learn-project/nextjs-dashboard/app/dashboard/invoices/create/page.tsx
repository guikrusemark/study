import { fetchCustomers } from "@/lib/data";
import Breadcrumbs from "@/ui/invoices/breadcrumbs";
import Form from "@/ui/invoices/create-form";

export default async function Page() {
	const customers = await fetchCustomers();

	return (
		<main>
			<Breadcrumbs
				breadcrumbs={[
					{ label: "Invoices", href: "/dashboard/invoices" },
					{
						label: "Create Invoice",
						href: "/dashboard/invoices/create",
						active: true,
					},
				]}
			/>
			<Form customers={customers} />
		</main>
	);
}
