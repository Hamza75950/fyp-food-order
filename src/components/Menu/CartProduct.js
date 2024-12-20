import { cartProductPrice } from "../AppContext";
import Image from "next/image";
import Trash from "../icons/Trash";

export default function cartProduct({ product, onRemove, index }) {
  return (
    <div className="flex items-center gap-4  border-b py-4">
      <div className="w-24">
        <Image width={240} height={240} src={product.image} alt={""} />
      </div>
      <div className="grow">
        <h3 className=" font-semibold">{product.name}</h3>

        {product.size && (
          <div className="text-sm ">
            Size: <span>{product.size.name}</span>
          </div>
        )}
        {product.extras?.length > 0 && (
          <div className="text-sm text-gray-500">
            {product.extras.map((extra) => (
              <div>
                {extra.name} Rs {extra.price}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="text-lg font-semibold">Rs{cartProductPrice(product)}</div>
      {!!onRemove && (
        <div className="ml-2">
          <button type="button" onClick={() => onRemove(index)} className="p-2">
            <Trash />{" "}
          </button>
        </div>
      )}
    </div>
  );
}