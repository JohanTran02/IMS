import { gql, TypedDocumentNode, useLazyQuery } from "@apollo/client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RootState } from "../redux/store";
import { IProduct } from "../types";
import ProductCard from "./ProductCard";

type ProductData = {
  product: {
    products: {
      products: IProduct[];
      totalCount: number;
    };
  };
};

type ProductVars = {
  input: {
    limit: number;
    page: number;
  };
};

const GET_PRODUCTS: TypedDocumentNode<ProductData, ProductVars> = gql`
  query Product($input: GetProductsFilterInput) {
    product {
      products(input: $input) {
        products {
          name
          sku
          price
          category
          manufacturer {
            name
          }
          amountInStock
        }
        totalCount
      }
    }
  }
`;

export function Products() {
  const [input, setInput] = useState<string>("");
  const [pageOptions, setPageOptions] = useState<
    { value: number; label: string }[]
  >([]);
  const { page, rows } = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const rowOptions = [
    { value: 50, label: "50" },
    { value: 100, label: "100" },
  ];

  const [getProducts, { data, error, loading }] = useLazyQuery(GET_PRODUCTS, {
    variables: {
      input: {
        limit: rows,
        page: page,
      },
    },
  });

  const products = data?.product.products.products || ([] as IProduct[]);
  const totalCount = data?.product.products.totalCount;

  useEffect(() => {
    getProducts({
      variables: {
        input: {
          limit: rows,
          page: page,
        },
      },
    });
  }, []);

  useEffect(() => {
    if (!totalCount) return;

    const totalPages = [];
    for (let i = 1; i < totalCount; i++) {
      totalPages.push({ value: i, label: i.toString() });
    }

    setPageOptions(totalPages);
  }, [data, rows]);

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

  const contentInRow = (card: IProduct) => {
    return (
      <li
        key={card.sku}
        className="group flex-none flex items-center gap-2 h-12 cursor-pointer"
        onClick={() => navigate(`/products/${card.sku}`)}
      >
        <div className="flex justify-between items-center border-b border-gray-200 h-full w-full">
          <ProductCard
            name={card.name}
            sku={card.sku}
            price={card.price}
            category={card.category}
            amountInStock={card.amountInStock}
            manufacturer={card.manufacturer.name}
          />
        </div>
      </li>
    );
  };

  const searchConditions = (card: IProduct) => {
    if (card.name.toLocaleLowerCase().includes(input.toLowerCase()))
      return contentInRow(card);
    if (card.category.toLocaleLowerCase().includes(input.toLowerCase()))
      return contentInRow(card);
    if (
      card.manufacturer.name.toLocaleLowerCase().includes(input.toLowerCase())
    )
      return contentInRow(card);

    return null;
  };

  return (
    <div className="flex h-full gap-2 flex-col">
      <div className="flex flex-1 gap-4 overflow-hidden">
        <div className="flex-1 bg-white flex flex-col gap-8 py-6 rounded">
          <div>
            <div className="border-b border-b-gray-200 pb-4">
              <h1 className="font-semibold text-3xl px-8">Manage Products</h1>
            </div>

            <div className="flex justify-between items-end px-11">
              <div className="flex items-center border border-gray-300 w-[40%] rounded-md h-[42px] mt-4 px-2">
                <MagnifyingGlassIcon className="size-4" />
                <input
                  type="text"
                  placeholder="Search products"
                  className="flex-1 h-full pl-2 outline-none"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
              <button onClick={() => navigate("/products/add")} className="font-semibold w-[120px] text-sm p-2 border rounded-lg bg-[#e0e0e0] hover:bg-green-400 transition-all">
                Add product
              </button>
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
                {products && products.map((card) => searchConditions(card))}
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
                <datalist id="page" className="h-20">
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
                    getProducts({
                      variables: { input: { limit: rows, page: page } },
                    });
                  }}
                >
                  update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
