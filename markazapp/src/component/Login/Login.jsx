import React from 'react'

 export  function Login() {
    return <>









<div className="container">
    <div className="row">
        <div className="col-md-">
            <div className="home ">
            <div className="bar d-flex justify-content-between border border-4  ">  
            <i   class="fa-solid fa-school p-2 "></i>  
            <p className='pt-1' > تسجيل بيانات المدرب </p> 
            <button>  <i class="fa-solid fa-x p-2"></i></button>
            </div>
            <div className="buttons pt-1   d-flex justify-content-between ">
                <button  className=" btn   btn-warning " >عودة</button>
                <button  className=" btn  btn-danger " > حذف</button>
                <button  className=" btn    btn-success " >حفظ</button>
                <button  className=" btn  btn-primary " >جديد </button>  
                <button className=" btn btn-dark"><i class="fa-solid fa-magnifying-glass"></i></button>
                
                <button className='btn btn-dark' > <i class="fa-solid fa-backward"></i></button>

                <button className='btn btn-dark' ><i class="fa-solid fa-square-caret-left"></i></button>

                <button className='btn btn-dark' ><i class="fa-solid fa-square-caret-right"></i></button>


                <button className='btn btn-dark' > <i class="fa-solid fa-forward"></i></button>
            </div>


           <div className="info">
            <div className='infoname'>
             <select name="" id="">
                <option value="volvo">name1</option>
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
             </select>

                
            </div>



           </div>






            


            </div>


        </div>
    </div>
</div>


    
    
    


    
    
    
    
    </>
        
    }

export default Login
