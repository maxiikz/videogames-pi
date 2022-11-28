import React, {} from 'react'


export default function pagination({cardHome, allCards, pages, currentP}){
    if(Math.ceil(allCards/cardHome)<currentP){
        pages(1)
    }
    const numberPages=[];
    for (let index = 1; index <= Math.ceil(allCards/cardHome); index++) {
        numberPages.push(index);
        
    }
    return(
        <div className="pagNumb">
            <ul>
                {numberPages.length > 1 && numberPages.map((p,q)=>
                p ===currentP ?(
                    <li key={q}>
                        <button className="buttonNumb" onClick={()=>pages(p)}>
                            {p}
                        </button>

                    </li>
                ):(
                    <li key={q}>
                         <button className="buttonNumb" onClick={()=>pages(p)}>
                            {p}
                        </button>

                    </li>
                )
                
                )}
            </ul>

        </div>
    );
}