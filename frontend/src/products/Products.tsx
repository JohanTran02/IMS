import { gql, useLazyQuery } from "@apollo/client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { RootState } from "../redux/store";
import { IProduct } from "../types";
import ProductCard from "./ProductCard";

const GET_PRODUCTS = gql`
  query RootQuery($limit: Int) {
    product {
      products(limit: $limit) {
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

  const [getProducts, { data, error, loading }] = useLazyQuery<{
    product: { products: IProduct[] };
  }>(GET_PRODUCTS, {
    variables: { limit: rows },
  });

  useEffect(() => {
    getProducts({ variables: { limit: rows } });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

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
                  data.product.products.map((card, index) => {
                    return (
                      <li
                        key={index}
                        className="flex-none flex justify-between items-center gap-1 h-12 border-b border-gray-200"
                      >
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

              <div className=" bg-gray-100 flex items-center gap-2 py-2 pl-4 text-sm">
                Page{" "}
                <Select
                  name="page"
                  options={pageOptions}
                  defaultInputValue={String(page)}
                  //   isSearchable={false}
                  onChange={(e) => {
                    dispatch({
                      type: "products/setCurrentPage",
                      payload: e?.value,
                    });
                  }}
                />{" "}
                -
                <div
                  className="flex gap-2 items-center"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <label className="">Rows per page</label>
                  <Select
                    name="row-amount"
                    options={rowOptions}
                    defaultInputValue={String(rows)}
                    onChange={(e) => {
                      console.log("Row amount changed to " + e?.value);
                      dispatch({
                        type: "products/setRowsPerPage",
                        payload: e?.value,
                      });
                    }}
                  />
                </div>
                <button
                  className="bg-blue-100 text p-2 rounded hover:bg-blue-200"
                  onClick={() => {
                    getProducts({ variables: { limit: rows } });
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
    </div>
  );
}
