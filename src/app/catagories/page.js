"use client";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import DeleteButton from '../../components/DeleteButton'

export default function CatagoriesPage() {
  const [catagoryName, setCatagoryName] = useState("");
  const [catagories, setCatagories] = useState([]);
  const { loading: profileLoading, data: profileData } = useProfile();
  const[editedCatagory, setEditedCatagory]= useState(null);
  useEffect(() => {
    fetchCatagories();
  }, []);

  function fetchCatagories(){
    fetch("/api/catagories").then(res => {
      res.json().then((catagories) => {
        setCatagories(catagories);
      });
    });

  }

  async function handelCatagorySubmit(ev) {
    ev.preventDefault();

    const creationPromise = new Promise(async (resolve, reject) => {
      const data = { name: catagoryName };

      if(editedCatagory){
        data._id=editedCatagory._id;
      }
      const response = await fetch("/api/catagories", {
        method: editedCatagory? 'PUT': 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setCatagoryName('');
      fetchCatagories();
      setEditedCatagory(null);
      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(creationPromise, {
      loading: editedCatagory ? 'Updating Catagory...': "Creating your new catagory...",
      success: editedCatagory ? 'Catagory Updated': "catagory created",
      error: "Error",
    });
  }

async function handelDeleteClick(_id){
  const promise = new Promise(async(resolve,reject)=>{
    const response = await fetch('/api/catagories?_id='+_id,{
      method:'DELETE',
  
    });
    if(response.ok){
      resolve();
    }
    else{reject();}

  });

  
  await toast.promise(promise,{
    loading:'Deleting...',
    success:'Deleted',
    error:'Error',
  })
  fetchCatagories();
}

  if (profileLoading) {
    return "Loading user info...";
  }

  if (!profileData.admin) {
    return "Not an admin";
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto ">
      <UserTabs isAdmin={true} />

      <form className="mt-8" onSubmit={handelCatagorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow ">
            <label className=" text-[10 px]" >
              {editedCatagory ? 'Update catagory' : 'New Catagory Name'}
              {editedCatagory&& (
                <>: <b>{editedCatagory.name}</b></>
              )}
              </label>

            <input
              type="text"
              value={catagoryName}
              onChange={(ev) => setCatagoryName(ev.target.value)}
            />
          </div>
          <div className="pb-2 flex gap-2">
            <button className="border border-primary" type="submit">
              {editedCatagory ? 'Update' : 'Create'}
            </button>
            <button type="button" onClick={()=> {setEditedCatagory(null);
              setCatagoryName('')
            }}>
              Cancel
            </button>
          </div>
        </div>
      </form>
      <div>
        <h2 className="mt-8 text-sm text-gray-500">Existing Catagory:</h2>
        {catagories?.length > 0 &&
          catagories.map((c) => (
            <div key={c._id}  className="bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center">
              
              <div 
              className="grow "
               >{c.name}</div>
            <div className="flex gap-1">
              <button type="button" 
              onClick={() => {setEditedCatagory(c);
              setCatagoryName(c.name);
            }}>
                Edit
              </button>
              <DeleteButton label='Delete' 
              onDelete={() => handelDeleteClick(c._id)}/>
              

            </div>

            </div>
          ))}
      </div>
    </section>
  );
}
