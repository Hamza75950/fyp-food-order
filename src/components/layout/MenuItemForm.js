import EditableImage from "@/components/layout/EditableImage";
import { useEffect, useState } from "react";
import MenuItemPricePops from "@/components/layout/menuItemPriceProps";

export default function MenuItemForm({ onSubmit, menuItem }) {
  const [image, setImage] = useState(menuItem?.image || "");
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [catagory, setCatagory] = useState(menuItem?.catagory || "");
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "");
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [extraIngredientsPrices, setExtraIngredientsPrices] = useState(
    menuItem?.extraIngredientsPrices || []
  );
  const [catagories, setCatagories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/catagories");
        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }
        const catagories = await res.json();
        // console.log({ catagories });
        setCatagories(catagories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // useEffect(() =>{
  //   fetch('/api/catagories').then(res =>{
  //     res.json().then(catagories =>{
  //       console.log({catagories})
  //       setCatagories(catagories)
  //     })
  //   })

  // },[])

  return (
    <form
      onSubmit={(ev) =>
        onSubmit(ev, {
          image,
          name,
          description,
          basePrice,
          sizes,
          extraIngredientsPrices,
          catagory,
        })
      }
      className="mt-8 max-w-2xl mx-auto"
    >
      <div
        className="md:grid items-start gap-4"
        style={{ gridTemplateColumns: ".3fr .7fr" }}
      >
        <div>
          <EditableImage link={image} setLink={setImage} />
        </div>
        <div className="grow">
          <label>Item Name</label>
          <input
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          ></input>

          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          ></input>

          <label>Catagory</label>
          <select
            value={catagory}
            onChange={(ev) => setCatagory(ev.target.value)}
          >
            {catagories?.length > 0 &&
              catagories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>

          <label>Base price</label>
          <input
            type="text"
            value={basePrice}
            onChange={(ev) => setBasePrice(ev.target.value)}
            required
          ></input>

          <MenuItemPricePops
            name={"Sizes"}
            addLabel={"Add Item Size"}
            props={sizes}
            setProps={setSizes}
          />
          <MenuItemPricePops
            name={"Extra Ingredients"}
            addLabel={"Add Ingredients Prices"}
            props={extraIngredientsPrices}
            setProps={setExtraIngredientsPrices}
          />
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
}

// import EditableImage from "@/components/layout/EditableImage";
// import MenuItemPriceProps from "@/components/layout/MenuItemPriceProps";
// import {useEffect, useState} from "react";

// export default function MenuItemForm({onSubmit,menuItem}) {
//   const [image, setImage] = useState(menuItem?.image || '');
//   const [name, setName] = useState(menuItem?.name || '');
//   const [description, setDescription] = useState(menuItem?.description || '');
//   const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
//   const [sizes, setSizes] = useState(menuItem?.sizes || []);
//   const [catagory, setCatagory] = useState(menuItem?.catagory || '');
//   const [catagories, setCatagories] = useState([]);
//   const [
//     extraIngredientPrices,
//     setExtraIngredientPrices,
//   ] = useState(menuItem?.extraIngredientPrices || []);

//   useEffect(() => {
//     fetch('/api/catagories').then(res => {
//       res.json().then(catagories => {
//         setCatagories(catagories);
//       });
//     });
//   }, []);

//   return (
//     <form
//       onSubmit={ev =>
//         onSubmit(ev, {
//           image,name,description,basePrice,sizes,extraIngredientPrices,catagory,
//         })
//       }
//       className="mt-8 max-w-2xl mx-auto">
//       <div
//         className="md:grid items-start gap-4"
//         style={{gridTemplateColumns:'.3fr .7fr'}}>
//         <div>
//           <EditableImage link={image} setLink={setImage} />
//         </div>
//         <div className="grow">
//           <label>Item name</label>
//           <input
//             type="text"
//             value={name}
//             onChange={ev => setName(ev.target.value)}
//           />
//           <label>Description</label>
//           <input
//             type="text"
//             value={description}
//             onChange={ev => setDescription(ev.target.value)}
//           />
//           <label>Category</label>
//           <select value={catagory} onChange={ev => setCatagory(ev.target.value)}>
//             {catagories?.length > 0 && catagories.map(c => (
//               <option key={c._id} value={c._id}>{c.name}</option>
//             ))}
//           </select>
//           <label>Base price</label>
//           <input
//             type="text"
//             value={basePrice}
//             onChange={ev => setBasePrice(ev.target.value)}
//           />
//           <MenuItemPriceProps name={'Sizes'}
//                               addLabel={'Add item size'}
//                               props={sizes}
//                               setProps={setSizes} />
//           <MenuItemPriceProps name={'Extra ingredients'}
//                               addLabel={'Add ingredients prices'}
//                               props={extraIngredientPrices}
//                               setProps={setExtraIngredientPrices}/>
//           <button type="submit">Save</button>
//         </div>
//       </div>
//     </form>
//   );
// }
