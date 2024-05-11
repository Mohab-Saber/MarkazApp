import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import { Input } from "@material-ui/core";
import './App.css';

import axios from "axios";




export default function App() {
  const [open, setOpen] = React.useState(false);

  const handleClickToOpen = () => {
    setOpen(true);
  };

  const handleToClose = () => {
    setOpen(false);
  };

  const addModareb = async ()=> {
    
    try {
      await axios.post('http://127.0.0.1:3060/addmodareb',{
      "name": document.getElementById("#1").value,
      "speciality": document.getElementById("#2").value,
      "balad": document.getElementById("#3").value,
      "telephone": document.getElementById("#4").value,
      "email": document.getElementById("#5").value,
      "code": document.getElementById("#6").value,
    }).then(() => {
      
    })
    } catch (error) {
  
      throw error;
    }
    
  }

  return (
    <div style={{}}>
      <div className="container">
        <div className="row">
          <div className="col-md-">
            <div className="home ">
              <div className="bar d-flex justify-content-between border border-4  ">
                <i class="fa-solid fa-school p-2  "></i>
                <p className="pt-1"> تسجيل بيانات المدرب </p>
                <button onClick={window.close}>
                
                  <i class="fa-solid fa-x p-2"></i>
                </button>
              </div>

              <div className="buttons pt-1   d-flex justify-content-between ">
                <button className=" btn btn-warning ">عودة</button>
                <button className=" btn btn-danger "> حذف</button>
                <button className=" btn btn-success ">تعديل</button>
                <button className=" btn btn-primary" onClick={handleClickToOpen}>جديد </button>
                <button className=" btn btn-dark">
                  <i class="fa-solid fa-magnifying-glass"></i>
                </button>

                <button className="btn btn-dark">
                
                  <i class="fa-solid fa-backward"></i>
                </button>

                <button className="btn btn-dark">
                  <i class="fa-solid fa-square-caret-left"></i>
                </button>

                <button className="btn btn-dark">
                  <i class="fa-solid fa-square-caret-right"></i>
                </button>

                <button className="btn btn-dark">
                 
                  <i class="fa-solid fa-forward"></i>
                </button>
              </div>

              <div className="info d-flex flex-sm-column justify-content-between">

                <div className="modarebName align-center">
                  <select name="" id=""> 
                    <option value="volvo">name1</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                  </select>
                  
                  <label className="label w-25">اسم المدرب</label>
                  
                </div>

                <div className="modarebName">
                  <select name="" id="">
                    <option value="volvo">name1</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                  </select>
                  <label className="label w-25">التخصص</label>

                </div>

                <div className="modarebName">
                  <select name="" id="">
                    <option value="volvo">name1</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                  </select>
                  <label className="label w-25">العنوان</label>

                </div>

                <div className="modarebName">
                  <select name="" id="">
                    <option value="volvo">name1</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                  </select>
                  <label className="label w-25">التيلفون</label>

                </div>

                <div className="modarebName">
                  <select name="" id="">
                    <option value="volvo">name1</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                  </select>
                  <label className="label w-25">ايميل</label>

                </div>

                <div className="modarebName">
                  <select name="" id="">
                    <option value="volvo">name1</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                  </select>
                  <label className="label w-25">الكود</label>

                </div>

                
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={open} onClose={handleToClose}>
        <DialogTitle dir="rtl">{"إضافة مدرب جديد"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div>
              <div><Input id="#1" dir="rtl" className="p-1"/><label>اسم المدرب</label></div>
              <div><Input id="#2" dir="rtl" className="p-1"/><label>التخصص</label></div>
              <div><Input id="#3" dir="rtl" className="p-1"/><label>العنوان</label></div>
              <div><Input id="#4" dir="rtl" className="p-1"/><label>التيلفون</label></div>
              <div><Input id="#5" dir="rtl" className="p-1"/><label>ايميل</label></div>
              <div><Input id="#6" dir="rtl" className="p-1"/><label>كود</label></div>
            </div>

          </DialogContentText>
        </DialogContent>
        <DialogActions dir="rtl">


          <Button onClick={addModareb} color="primary" autoFocus>حفظ</Button>
          
          <Button onClick={handleToClose} color="secondary" autoFocus>
            اغلاق
          </Button>
        
        </DialogActions>
      </Dialog>
    
    </div>
  );
}
