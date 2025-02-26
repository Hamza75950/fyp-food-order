// import FlyingButton from 'react-flying-item'



export default function AddToCartButton({hasSizesOrExtras,onClick, basePrice}){

    // if(!hasSizesOrExtras){
    //     return(
    //         <div className='flying-button-parent mt-4 '>

    //             <FlyingButton
    //             targetTop ={'5%'} 
    //             targetLeft ={'95%'}
    //             src={image}>
    //             <div onClick={onClick} >
    //                 Add to cart Rs {basePrice}
    //             </div>
                    
    //                 </FlyingButton>


    //         </div>
    //     )
    // }

    return(

        <button
          type="button"
          onClick={onClick}
        className="bg-primary text-white rounded-full px-8 py-2 mt-4 ">
            {hasSizesOrExtras?(
                <span>Start From Rs {basePrice} </span>
            ):(
                
                <span>Add to cart Rs {basePrice} </span>
            )}
        
        </button>
    );
}