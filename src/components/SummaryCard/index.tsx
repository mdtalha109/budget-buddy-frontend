import React from "react";


type Summary = { title: String; subTitle: String, data: any; icon?: any; tooltip?: string; info?: any };

export default function SummaryCard({ title, subTitle, data, info: Info }: Summary) {
	return (
		<div className="rounded-lg border bg-white dark:bg-primary text-card-foreground shadow-sm flex flex-col gap-2">
			<div className="flex flex-col space-y-1.5 p-4 sm:p-6">
				<h3 className="whitespace-nowrap text-lg sm:text-xl lg:text-2xl font-semibold leading-none tracking-tight">
					{title}
				</h3>
				<p className="text-xs sm:text-sm dark:text-primaryMuted-dark">
					{subTitle}
				</p>
			</div>
			<div className="p-4 sm:p-6 flex-1 flex items-center ">
				<div className="text-2xl sm:text-3xl lg:text-4xl font-bold">Rs {data}</div>
			</div>
		</div>
	);
}