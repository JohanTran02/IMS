export function Products() {
    return (
        <div className="flex h-full gap-2 flex-col">
            <div className="flex flex-1 gap-4">
                <div className="flex flex-col flex-1 w-0 gap-4">
                    <div className="bg-green-300 h-40 flex flex-col justify-between p-3">
                        <h1>Manage Products</h1>
                        <input type="search" placeholder={"Search Products"} />
                    </div>
                    <div className="bg-amber-600 flex flex-col flex-1">
                        <div className="bg-violet-400 p-3 flex flex-1">
                            <input type="checkbox" />
                            <ul className="flex justify-between flex-1 text-center">
                                <li>name</li>
                                <li>sku</li>
                                <li>price</li>
                                <li>category</li>
                                <li>stock amount</li>
                                <li>Manufacturer</li>
                            </ul>
                        </div>
                        <div className="h-full">product cards</div>
                    </div>
                </div>
                <div className="bg-zinc-400 p-3">
                    Settings
                </div>
            </div>
            <div className="bg-yellow-400"> asdfasd fasdfasd fasdftest</div>
        </div>
    )
} 