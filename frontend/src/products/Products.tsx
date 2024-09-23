import { gql, useLazyQuery, TypedDocumentNode } from "@apollo/client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { IProduct } from "../types";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router";

type ProductData = {
  product: {
    products: IProduct[];
  };
};

type ProductVars = {
  input: {
    limit: number
  }
}

const GET_PRODUCTS: TypedDocumentNode<ProductData, ProductVars> = gql`
  query RootQuery($input: GetProductsFilterInput) {
    product {
      products(input: $input) {
        name
        sku
        price
        category
        amountInStock
        manufacturer {
          name
        }
      }
    }
  }
`;

export function Products() {
  const navigate = useNavigate();
  const { page, rows } = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch();

  const rowOptions = [
    { value: 10, label: "10" },
    { value: 25, label: "25" },
    { value: 50, label: "50" },
    { value: 100, label: "100" },
  ];

  const pageOptions = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
    { value: 6, label: "6" },
    { value: 7, label: "7" },
    { value: 8, label: "8" },
    { value: 9, label: "9" },
    { value: 10, label: "10" },
  ];

  const [getProducts, { data, error, loading }] = useLazyQuery(GET_PRODUCTS, {
    variables: { input: { limit: rows } },
  });

  useEffect(() => {
    getProducts({ variables: { input: { limit: rows } } });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const validRowValues = (value: number) => {
    if (value === 10 || value === 25 || value === 50 || value === 100)
      return dispatch({
        type: "products/setRowsPerPage",
        payload: value,
      });
  };

  const validPageValues = (value: number) => {
    if (value >= 1 && value <= 10)
      return dispatch({
        type: "products/setCurrentPage",
        payload: value,
      });
  };

  return (
    <div className="flex h-full gap-2 flex-col">
      <div className="flex flex-1 gap-4 overflow-hidden">
        <div className="flex-1 bg-white flex flex-col gap-8 py-6 rounded-3xl">
          <div>
            <div className="border-b border-b-gray-200 pb-4">
              <h1 className="font-semibold text-3xl px-8">Manage Products</h1>
            </div>

            <div className="flex items-center border border-gray-300 w-[40%] rounded-md h-[42px] mt-4 mx-8 px-2">
              <MagnifyingGlassIcon className="size-4" />
              <input
                type="text"
                placeholder="Search products"
                className="flex-1 h-full pl-2 outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col flex-1 overflow-y-auto">
            <div className="relative px-11">
              <div className="flex h-12  sticky inset-0 bg-white">
                <ul className="flex justify-between gap-1 items-center text-center flex-1 h-full border-b border-b-gray-200">
                  <li className="flex-1 font-bold text-sm">Product name</li>
                  <li className="flex-1 font-semibold text-sm">Category</li>
                  <li className="flex-1 font-semibold text-sm">Price</li>
                  <li className="flex-[2] font-semibold text-sm">SKU</li>
                  <li className="flex-1 font-semibold text-sm">Stock amount</li>
                  <li className="flex-[2] font-semibold text-sm">
                    Manufacturer
                  </li>
                </ul>
              </div>

              <ul className="overflow-y-auto">
                {data &&
                  data.product.products.map((card) => {
                    return (
                      <li
                        key={card.sku}
                        title="Show product details"
                        className="flex-none flex justify-between items-center gap-1 h-12 border-b border-gray-200"
                        onClick={() => {
                          navigate(`/products/${card.sku}`)
                        }}>
                        <ProductCard
                          name={card.name}
                          sku={card.sku}
                          price={card.price}
                          category={card.category}
                          amountInStock={card.amountInStock}
                          manufacturer={card.manufacturer.name}
                        />
                      </li>
                    );
                  })}
              </ul>

              <div className="sticky bottom-0 left-0 bg-gray-100 flex items-center gap-2 py-2 pl-4 text-sm">
                <label>Page</label>
                <input
                  list="page"
                  placeholder={String(page)}
                  type="text"
                  className="w-14 placeholder:text-black pl-1"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (isNaN(Number(value))) return;
                    validPageValues(Number(value));
                  }}
                />
                <datalist id="page">
                  {pageOptions.map((option) => (
                    <option key={option.value} value={option.label} />
                  ))}
                </datalist>
                -
                <div
                  className="flex gap-2 items-center"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <label className="">Rows per page</label>
                  <input
                    list="rows-page"
                    placeholder={String(rows)}
                    type="text"
                    className="w-16 placeholder:text-black pl-1"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (isNaN(Number(value))) return;
                      validRowValues(Number(value));
                    }}
                  />
                  <datalist id="rows-page">
                    {rowOptions.map((option) => {
                      return <option key={option.value} value={option.label} />;
                    })}
                  </datalist>
                </div>
                <button
                  className="bg-blue-100 text p-2 rounded hover:bg-blue-200"
                  onClick={() => {
                    getProducts({ variables: { input: { limit: rows } } });
                  }}
                >
                  update
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-zinc-400 p-3">Settings</div>
      </div>
      <div className="bg-yellow-400"> asdfasd fasdfasd fasdftest</div>
    </div >
  );
}
