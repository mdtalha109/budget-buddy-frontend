import { Card, CardContent, CardHeader, CardSubTitle, CardTitle } from "../ui/Card";


type Summary = { title: String; subTitle: String, data: any; icon?: any; tooltip?: string; info?: any };

export default function SummaryCard({ title, subTitle, data, info: Info }: Summary) {
	return (
		<Card className="">
			<div className=" flex flex-col gap-4">
				<div>
					<CardTitle>
						{title}
					</CardTitle>

					<CardSubTitle>
						{subTitle}
					</CardSubTitle>
				</div>

				<div>
					<CardContent>
						<div className="text-2xl sm:text-3xl lg:text-4xl font-bold">Rs {data}</div>
					</CardContent>
				</div>


			</div>
		</Card>
	);
}