import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { Form, Path, SubmitHandler, useForm, UseFormRegister } from "react-hook-form"
import { useNavigate } from "react-router";

interface IProductInput {
    "Product Name": string;
    "Product Description": string;
    "Product Price": number;
    "Product Category": string;
    "Product Stock Amount": number;
}
interface ProductProps {
    label: Path<IProductInput>,
    register: UseFormRegister<IProductInput>,
    type: "number" | "text",
    required?: boolean
}

const ADD_PRODUCT = gql`
mutation RootMutation($input: CreateProductInput) {
    product {
        addProduct(input: $input) {
            sku
        }
    }
}`;

export function ProductAdd() {
    const navigate = useNavigate();

    const {
        register,
        control,
        formState: { errors },
    } = useForm<IProductInput>()

    const [activeTab, setActiveTab] = useState<"product" | "manufacturer">("product");
    const [addProduct, { loading, error }] = useMutation(ADD_PRODUCT);
    const onSubmit: SubmitHandler<IProductInput> = async (data) => {
        addProduct({
            variables: {
                input: {
                    name: data["Product Name"],
                    description: data["Product Description"],
                    price: data["Product Price"],
                    category: data["Product Category"],
                    amountInStock: data["Product Stock Amount"]
                }
            }
        })
        navigate("/products")
    }

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    const Input = ({ label, register, type, required }: ProductProps) => (
        <div className="flex flex-col gap-2 w-full justify-evenly">
            <label className="font-semibold text-lg">{label}</label>
            {errors[label] && errors[label].type === "required" && (<span className="text-red-500">{label} is required.</span>)}
            <input type={type} {...register(label, { required, valueAsNumber: type === "number" ? true : false })} placeholder={label} className="h-12" />
        </div>
    )

    return (
        <>
            <div className="flex-1 flex gap-4 p-4">
                <Form onSubmit={async ({ data }) => onSubmit(data)} control={control} className="flex flex-col flex-1 gap-4">
                    <div className="flex gap-3 text-xl font-bold">
                        <p className={activeTab === "product" ? "underline" : ""} onClick={() => setActiveTab("product")}>Product info</p>
                        <p className={activeTab === "manufacturer" ? "underline" : ""} onClick={() => setActiveTab("manufacturer")}>Manufacturer info</p>
                    </div>
                    {
                        activeTab === "product" ? <>
                            <Input label="Product Name" register={register} type="text" required />
                            <Input label="Product Category" register={register} type="text" />
                            <div className="flex gap-4">
                                <Input label="Product Price" register={register} type="number" required />
                                <Input label="Product Stock Amount" register={register} type="number" required />
                            </div>
                            <label className="font-bold text-lg">Product Description</label>
                            <textarea placeholder={`Product Description`} className="resize-none h-[200px]" {...register("Product Description")} />
                        </> :
                            <>
                                {/* <label>Manufacturer name</label>
                                <input type="text" placeholder={`manufacturer name`} className="h-12" />

                                <label>Manufacturer website</label>
                                <input type="text" placeholder={`manufacturer website`} className="h-12" />
                                <div className="flex flex-row gap-4">
                                    <label>Manufacturer address</label>
                                    <input type="text" placeholder={`manufacturer address`} className="h-12 flex-1 w-0" />
                                    <label>Manufacturer country</label>
                                    <input type="text" placeholder={`manufacturer country`} className="h-12 flex-1 w-0" />
                                </div>
                                <div className="flex gap-4">
                                    <label>Manufacturer description</label>
                                    <textarea placeholder={`manufacturer description`} className="resize-none h-[200px] flex-1 w-0" />
                                    <div className="flex flex-col flex-1 w-0">
                                        <h1 className="text-lg font-bold">Contact</h1>
                                        <label>Contact Name </label>
                                        <input type="text" placeholder={`contact name`} className="h-full" />
                                        <label>Contact Email</label>
                                        <input type="text" placeholder={`contact email`} className="h-full" />
                                        <label>Contact Phone </label>
                                        <input type="text" placeholder={`contact phone`} className="h-full" />
                                    </div>
                                </div> */}
                            </>
                    }
                    <div className="ml-auto mt-auto space-x-4 text-lg">
                        <input type="submit" className="cursor-pointer" value={"Add Product"} />
                        <button onClick={() => navigate(-1)}>Cancel</button>
                    </div>
                </Form>
            </div>
        </>
    )
}

