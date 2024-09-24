


import FormPicker from "../components/FormPicker";


export function ProductEdit() {
  return (
    <>
      <div className="bg-blue-300 flex flex-col">
        <div className="p-4 bg-white rounded-lg flex flex-col gap-4">
          <h2 className="font-semibold underline text-xl "> Edit Product</h2>
          <div className="text-gray-500 max-w-[50%]">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae
            laudantium odit, corrupti cumque consequuntur expedita fugiat fuga
            quidem quia harum. Fugiat ea minima numquam autem voluptatem
            inventore? Itaque, numquam praesentium nesciunt ab quaerat impedit
            est, assumenda, voluptates dolore illo voluptate nobis debitis
            possimus amet velit deserunt! Eveniet tenetur eum repudiandae?
          </div>
        </div>
      </div>
      <div className=" flex-1 flex flex-col gap-4 ">

        <div className="flex flex-col flex-1 gap-4">

          <FormPicker />

        </div>

      </div>
    </>
  );
}