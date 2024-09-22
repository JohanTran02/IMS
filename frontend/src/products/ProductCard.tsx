
type Prop = {
  name: string;
  sku: string;
  price: number; 
  category: string;
  amountInStock: number;
  manufacturer: string; 
}

const ProductCard = ({name, sku, price, category, amountInStock, manufacturer}: Prop) => {
  return (
    <>
      <p className="flex-[1] text-[13px] border-l border-l-gray-200 border-r border-r-gray-200 h-full grid place-items-center">
        <span className="">{name}</span>
      </p>

      <p className="flex-1 text-[13px] border-r border-r-gray-200 h-full grid place-items-center">
        <span className="">{category}</span>
      </p>
      
      <p className="flex-1 text-[13px] border-r border-r-gray-200 h-full grid place-items-center">
        <span className="">{price}</span>
      </p>

      <p className="flex-[2] text-[13px] border-r border-r-gray-200 h-full grid place-items-center">
        <span className="">{sku}</span>
      </p>


      <p className="flex-1 text-[13px] border-r border-r-gray-200 h-full grid place-items-center">
        <span className="pl-2">{amountInStock}</span>
      </p>

      <p className="flex-[2] text-[13px] border-r border-r-gray-200 h-full grid place-items-center">
        <span className="">{manufacturer}</span>
      </p>
    </>
  )
}

export default ProductCard
