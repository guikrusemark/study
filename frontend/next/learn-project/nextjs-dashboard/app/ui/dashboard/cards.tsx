import { fetchCardData } from "@/lib/data";
import { lusitana } from "@/ui/fonts";
import {
	BanknotesIcon,
	ClockIcon,
	InboxIcon,
	UserGroupIcon,
} from "@heroicons/react/24/outline";
import { Suspense } from "react";
import { CardSkeleton } from "../skeletons";

const iconMap = {
	collected: BanknotesIcon,
	customers: UserGroupIcon,
	pending: ClockIcon,
	invoices: InboxIcon,
};

export default async function CardWrapper() {
	const {
		numberOfInvoices,
		numberOfCustomers,
		totalPaidInvoices,
		totalPendingInvoices,
	} = await fetchCardData();

	// NOTE: comment in this code when you get to this point in the course
	// CardsSkeleton is a placeholder for the CardWrapper but it's not implemented
	return (
		<>
			<Suspense fallback={<CardSkeleton />}>
				<Card title="Collected" value={totalPaidInvoices} type="collected" />
			</Suspense>

			<Suspense fallback={<CardSkeleton />}>
				<Card title="Pending" value={totalPendingInvoices} type="pending" />
			</Suspense>

			<Suspense fallback={<CardSkeleton />}>
				<Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
			</Suspense>

			<Suspense fallback={<CardSkeleton />}>
				<Card
					title="Total Customers"
					value={numberOfCustomers}
					type="customers"
				/>
			</Suspense>
		</>
	);
}

export async function Card({
	title,
	value,
	type,
}: {
	title: string;
	value: number | string;
	type: "invoices" | "customers" | "pending" | "collected";
}) {
	const Icon = iconMap[type];

	return (
		<div className="rounded-xl bg-gray-50 p-2 shadow-sm">
			{
				await new Promise((resolve) =>
					setTimeout(resolve, 5 * 1000),
				) /* here to test suspense boundary */
			}
			<div className="flex p-4">
				{Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
				<h3 className="ml-2 text-sm font-medium">{title}</h3>
			</div>
			<p
				className={`${lusitana.className}
        truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
			>
				{value}
			</p>
		</div>
	);
}
