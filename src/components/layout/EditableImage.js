import toast from "react-hot-toast";
import Image from 'next/image';

export default function EditableImage({link,setLink}){
    

    async function handelFileChange(ev){
        const files = ev.target.files;
        if(files?.length ===1){
          
          const data = new FormData;
          data.set('file' , files[0]);
         const uploadPromise = fetch('/api/upload',{
            method: 'POST',
            body:data,  
          }).then(response => {
            if(response.ok){
                return response.json().then(link => {
                    setLink(link);
                })
                
            }
            throw new Error('Something went wrong');
          });

          await toast.promise(uploadPromise,{
            loading:'Uploading...',
            success: 'Upload complete',
            error: 'Upload error',
          });
          
    
        }
    
      }
      return(
        <>
        {link && (
                  <Image
                    className="rounded-lg w-full h-full mb-1"
                    src={link}
                    width={250}
                    height={250}
                    alt={"avatar"}
                  />
                  )}
                  {!link &&(
                    <div className="bg-gray-200 p-4 text-center text-gray-500 rounded-lg mb-1">
                      No Image
                    </div>
                  )}
                <label >
                  <input type="file" className="hidden" onChange={handelFileChange}/>
                  <span className="block border rounded-lg border-gray-300 p-2 text-center cursor-pointer">Change Image</span>
                </label>
        </>
      );
    
}