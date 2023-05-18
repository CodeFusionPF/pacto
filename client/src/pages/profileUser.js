import React from "react";
import style from "@/styles/profileUser.module.css";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { putEditUser,logOut } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/router";
import { getDepartments, getCities } from "@/redux/features/departments/departmentsSlice";

function ProfileUser() {
  const { user } = useSelector((state) => state.user);
  const navigate = useRouter()
  const dispatch = useDispatch();

  /*-------------Edit de datos---------------*/
  const [edit, setEdit] = useState(false);
  const [userEdit, setUserEdit] = useState({
    id: "",
    email: "",
    firstname: "",
    lastname: "",
    address: "",
    phone: "",
    department: "",
    city: ""
  });

  useEffect(() => {
    if (user) {
      setUserEdit((prevUserEdit) => ({
        ...prevUserEdit,
        id: user._id || "",
        email: user.email || "",
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        address: user.address || "",
        phone: user.phone || "",
        department: user?.city?.department?.department || "",
        city: user?.city?.city || ""
      }));
    }
  }, [user]);

  // useEffect(() => {
  //   console.log(userEdit)
  // },[userEdit])

  const handleOpenEdit = () => {
    setEdit((prevEdit) => !prevEdit);
  };

  const handleEditUser = (e) => {
    const { name, value } = e.target;
    setUserEdit({
      ...userEdit,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(putEditUser(userEdit))
    .then(data => setEdit(false), null)
  };
  /*-----------------------------------------*/

  /*-----------Departments and citys---------*/
  useEffect(() => {
    dispatch(getDepartments())
  }, [])

  const { departments, cities } = useSelector(state => state.locations)

  const handleDepaSelect = (e) => {
    const { id , value } = e.target;

    // Busco el id del departamento seleccionado para buscar sus ciudades
    const { _id } = departments.find(depa => depa.department === value);
    dispatch(getCities(_id));

    setUserEdit({
      ...userEdit,
      [id]: value
    })
  }

  const handleCitySelect = (e) => {
    const { id , value } = e.target;

    setUserEdit({
      ...userEdit,
      [id]: value
    })
  }
  /*-----------------------------------------*/
  const handleLogOut = (event)=>{
    event.preventDefault()
    dispatch(logOut())
    if(navigate.pathname === "/profileUser"){
      navigate.push('/')
    }

  }

  return (
    <>
      <Head>
        <title>H2H | Perfil</title>
        <meta name="description" content="H2H" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/pacto-logo.png" />
      </Head>

      <div className={style.containerProfile}>
        <Link href="/">
          <Image className={style.imageDetail} priority src="/pacto-logo.png" alt="logo" width="140" height="140"/>
        </Link>
        <h2 className={style.profileTitle}>Mi Cuenta</h2>

        <div className={style.containerProfileData}>
          <div className={style.profileDataTitle}>
            <h3>Datos Personales</h3>
            <Image onClick={handleOpenEdit} className={style.lapiz} src="/image/lapiz.png" alt="" width="22" height="22"/>
          </div>
            {edit ? (
              <form className={style.form__Login_Edit}>
                <label>Email:</label>
                <input placeholder={user?.email || "Email"} name="email" type="email" value={userEdit.email} onChange={handleEditUser} />

                <label>Nombre:</label>
                <input placeholder={user?.firstname || ""} name="firstname" type="text" value={userEdit.firstname} onChange={handleEditUser} />

                <label>Apellido:</label>
                <input placeholder={user?.lastname || ""} name="lastname" type="text" value={userEdit.lastname} onChange={handleEditUser} />

                <label>Departamento:</label>
                <select  name="department" id="department" onChange={handleDepaSelect}defaultValue="default">
                  <option disabled value="default">{user?.city?.department?.department || 'None'}</option>
                  {departments &&
                    departments.map((depa) => (
                      <option key={depa._id} value={depa.department} data-categoria="departamento">
                        {depa.department}
                      </option>
                    ))}
                </select>

                <label>Ciudad:</label>
                <select name="city" id="city" onChange={handleCitySelect} defaultValue="default">
                    <option disabled value="default">{user?.city?.city || 'None'}</option>
                    {
                      cities && cities.map(obj => (
                        <option key={obj._id} value={obj._id} data-categoria="ciudad">{obj.city}</option>
                      ))
                    }
                </select>

                <label>Dirección:</label>
                <input placeholder={user?.address || ""} name="address" type="text" value={userEdit.address} onChange={handleEditUser} />

                <label>Teléfono:</label>
                <input placeholder={user?.phone || "None"} name="phone" type="text" value={userEdit.phone} onChange={handleEditUser} />
                <div className={style.secciones}>
                  <button onClick={handleSubmit}>Guardar cambios</button>
                </div>
              </form>
        
            ) : (
              <form className={style.form__Login}>
                <label>Email:</label>
                <input value={user?.email || ""} name="email" type="email" readOnly />

                <label>Nombre:</label>
                <input value={user?.firstname || ""} name="firstname" type="text" readOnly />

                <label>Apellido:</label>
                <input value={user?.lastname || ""} name="lastname" type="text" readOnly />

                <label>Departamento:</label>
                <input value={user?.city?.department?.department || "None"} name="department" type="text" readOnly />

                <label>Ciudad:</label>
                <input value={user?.city?.city || "None"} name="city" type="text" readOnly />

                <label>Dirección:</label>
                <input value={user?.address || ""} name="address" type="text" readOnly />

                <label>Teléfono:</label>
                <input value={user?.phone || "None"} name="phone" type="text" readOnly />
                <div className={style.secciones}>
                  <Link href={'/orders'}>
                  <button>Ir a mis pedidos</button>
                  </Link>
                  <button>Ir a mis Productos</button>
                  <button className={style.deslogueo} onClick={handleLogOut}>Cerrar Sesion</button>
                </div>
              </form>
            )}
            
        </div>
      </div>
    </>
  );
}

export default ProfileUser;