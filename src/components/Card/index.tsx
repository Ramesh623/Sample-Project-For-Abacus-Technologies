import { getDrinksProducts } from "@/api";
import React, { useEffect, useState } from "react";
import {BsFillGridFill, BsList} from "react-icons/bs"
export interface Props {
	peoductsArray?: any;
}

const DrinksListCard: React.FC<Props> = (props) => {
const [Drinks, setDrinks] = useState([])
const [SearchText, setSearchText] = useState("")
const [searchBy, setSearchBy] = useState("")
const [gridOrList, setGridOrList] = useState("GRID")


	useEffect(() => {
		getDrinksProducts(searchBy)
		.then((res: any) => {
			setDrinks(res.drinks)
			return res;
		})
		.catch((error) => {
			console.log(error);
			return error;
		});
	}, [searchBy])
	
	const searchFunction = () => { 
		setSearchBy(SearchText)
	}

	const mapDrinksCardsGridView = (drinksArr:any) => { 
				return (
					<div>
						<div className="bg-white">
							<div className="mx-auto max-w-2xl lg:max-w-7xl lg:px-8 mt-10">
								<div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
								{drinksArr.map((product:any) => (
									<div key={product.idDrink} className="group relative">
									<div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
										<img
										src={product.strDrinkThumb}
										alt={product.idDrink}
										className="h-full w-full object-cover object-center lg:h-full lg:w-full"
										/>
									</div>
									<div className="flex flex-col justify-between p-4 leading-normal">
										<div>
										<h3 className="text-sm text-gray-700">
											<a href={product.href}>
											<span aria-hidden="true" className="absolute inset-0" />
												<b>Drink ID :</b> {product.idDrink}
											</a>
										</h3>
										</div>
										<p className="text-sm font-medium text-gray-700"><b>Category :</b> {product.strCategory}</p>
										<p className="text-sm font-medium text-gray-700"><b>Glass Type :</b> {product.strGlass}</p>
									</div>
									</div>
								))}
								</div>
							</div>
							</div>

							</div>
				);
		
	};

	const mapDrinksCardsListView = (drinksArr:any) => { 
		return (
			<div className="pl-40 pr-40 mt-10">
				{drinksArr.map((product:any) => (	
					<a className="w-full mb-2 flex flex-col items-center bg-white border rounded-lg shadow-md md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
						<img
						src={product.strDrinkThumb}
						alt={product.idDrink}
						className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
						/>
						<div className="flex flex-col justify-between p-4 leading-normal">
							<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><b>Drink ID :</b> {product.idDrink}</h5>
							<p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Description :</b> {product.strInstructions}</p>
							<p className="mb-3 font-normal text-gray-700 dark:text-gray-400 mt-3">{product.strInstructionsDE}</p>

						</div>
					</a>
				))}


			</div>
		);

};


	return (
		<React.Fragment>
			<div className="w-full">
				<div className="grid  justify-self-center mt-10 pl-40 pr-40">
							<div className="flex border border-purple-200 rounded">
								<input
									type="text"
									className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
									placeholder="Search..."
									name="searchText"
									onChange={(event:any) => setSearchText(event.target.value)}
								/>
								<button className="px-4 text-white bg-purple-600 border-l rounded " onClick={(e:any) => searchFunction()}>
									Search
								</button>
							</div>
				</div>
				<div className="w-full flex justify-end pr-40 mt-10">
					<button className={(gridOrList === "GRID") ? (`bg-gray-400 w-8 h-8 rounded pl-2`) : (`bg-gray-100 w-8 h-8 rounded pl-2`)} onClick={(e:any) => setGridOrList("GRID")}>
						<BsFillGridFill className="icon"/>
					</button>
					<button className={(gridOrList === "LIST") ? (`bg-gray-400 w-8 h-8 rounded pl-2 ml-3`) : (`bg-gray-100 w-8 h-8 rounded pl-2 ml-3`)} onClick={(e:any) => setGridOrList("LIST")}>
						<BsList className="icon"/>
					</button>
				</div>
				{
					(gridOrList === "GRID") ? (mapDrinksCardsGridView(Drinks)) : (mapDrinksCardsListView(Drinks))
				}
			</div>
		</React.Fragment>
	);
};

export default DrinksListCard;
