
import rewiews from "@/pages/api/rewiews";

export default function Rewiews(){

    return(
        <div>
            <h1>Rewiews de Nuestros Usuarios</h1>
            {rewiews.map((item) =>(
                <li key={item.id}>
                     <h4>{item.name}</h4>
                    <img key={item.image} src={item.image} width="100px" height="150px" />
                   
                    <p>{item.comment}</p>
                </li>
            ) )}
        
        
        
        </div>
       
    )

}


