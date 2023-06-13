import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./Style/Formulario.css";
import Swal from "sweetalert2";

const defaultValues = {
  first_name: "",
  last_name: "",
  url: "",
  email: "",
  phone: "",
  birthday: "",
};

//* permite validar si es un correo correcto
const regexEmail =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

//* permite validar si es una url correcta
const regexUrl = /^(ftp|http|https):\/\/[^ "]+$/i;

const Formulario = () => {
  const [showSecondForm, setShowSecondForm] = useState(false);
  const [showThreeForm, setShowThreeForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Al dar click en: si, enviaras los datos.",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Sí, enviar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        //* Cambia las propiedades del objeto antes de enviarlo
        const transformedData = {
          Nombre: data.first_name,
          Apellido: data.last_name,
          Email: data.email,
          Teléfono: data.phone,
          Url: data.url,
          Fecha_de_Nacimiento: data.birthday,
          Foto_frontal: data.front_photo,
          Foto_dorso: data.back_photo,
        };
        //* Envía el objeto a consola
        console.log("Datos del cliente:", transformedData);
        setShowThreeForm(true);
      }
    });
  };

  //* Al llamar a esta funcion muestra el segundo formulario.
  const firstStep = () => {
    setShowSecondForm(true);
  };

  return (
    <section className="container__form">
      {!showSecondForm && !showThreeForm ? (
        <form onSubmit={handleSubmit(firstStep)}>
          <div className="container__form-div">
            <label className="container__form-label" htmlFor="">
              NOMBRE DEL CLIENTE
            </label>
            <input
              placeholder="Escribe aquí"
              type="text"
              className={`form__input ${
                errors.first_name ? " input__error" : ""
              }`}
              {...register("first_name", {
                required: "This is field is requerid",
                maxLength: {
                  value: 25,
                  message: "text is too long",
                },
              })}
            />
            {errors.first_name && (
              <p className="form__error">{errors.first_name.message} </p>
            )}
          </div>

          <div className="container__form-div">
            <label className="container__form-label" htmlFor="">
              APELLIDO DEL CLIENTE
            </label>
            <input
              placeholder="Escribe aquí"
              type="text"
              className={`form__input ${
                errors.last_name ? " input__error" : ""
              }`}
              {...register("last_name", {
                required: "This is field is requerid",
                maxLength: {
                  value: 25,
                  message: "text is too long",
                },
              })}
            />
            {errors.last_name && (
              <p className="form__error">{errors.last_name.message} </p>
            )}
          </div>

          <div className="container__form-div">
            <label className="container__form-label" htmlFor="">
              URL DE LINKEDIN
            </label>
            <input
              placeholder="Escribe aquí"
              type="url"
              className={`form__input ${errors.url ? " input__error" : ""}`}
              {...register("url", {
                required: "This is field is requerid",
                pattern: {
                  value: regexUrl,
                  message: "This is not a valid URL",
                },
              })}
            />
            {errors.url && <p className="form__error">{errors.url.message} </p>}
          </div>

          <div className="container__form-div">
            <label className="container__form-label" htmlFor="">
              Email
            </label>
            <input
              placeholder="Escribe aquí"
              className={`form__input ${errors.email ? "input__error " : ""}`}
              type="email"
              {...register("email", {
                required: "This is field is requerid",
                maxLength: {
                  value: 150,
                  message: "email is too long",
                },
                pattern: {
                  value: regexEmail,
                  message: "Thi is not a valid email",
                },
              })}
            />
            {errors.email && (
              <p className="form__error">{errors.email.message} </p>
            )}
          </div>

          <div className="container__form-sub">
            <div className="container__form-div">
              <label className="container__form-label" htmlFor="">
                TELÉFONO
              </label>
              <input
                placeholder="Escribe aquí"
                type="text"
                className={`form__input ${errors.phone ? " input__error" : ""}`}
                {...register("phone", {
                  required: "This is field is requerid",
                  maxLength: {
                    value: 15,
                    message: " is too long",
                  },
                })}
              />
              {errors.phone && (
                <p className="form__error">{errors.phone.message} </p>
              )}
            </div>

            <div className="container__form-div">
              <label className="container__form-label" htmlFor="">
                FECHA DE NACIMIENTO
              </label>
              <input
                className={`form__input ${
                  errors.birthday ? "input__error " : ""
                }`}
                type="date"
                {...register("birthday", {
                  required: "This is field is requerid",
                })}
              />
              {errors.birthday && (
                <p className="form__error">{errors.birthday.message} </p>
              )}
            </div>
          </div>

          <div className="container__form-btn-container">
            <button className="container__form-btn">Siguiente</button>
          </div>
        </form>
      ) : showSecondForm && !showThreeForm ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container__form-div">
            <label className="container__form-label" htmlFor="">
              SUBE UNA FOTO DE FRENTE DE TU DNI
            </label>
            <input
              type="file"
              className={`form__input ${
                errors.front_photo ? " input__error" : ""
              }`}
              {...register("front_photo", {
                required: "This field is required",
                validate: (value) =>
                  value.length > 0 || "Please upload a photo",
              })}
            />
            {errors.front_photo && (
              <p className="form__error">{errors.front_photo.message}</p>
            )}
          </div>

          <div className="container__form-div">
            <label className="container__form-label" htmlFor="">
              AHORA SUBE UNA FOTO DEL DORSO DE TU DNI
            </label>
            <input
              type="file"
              className={`form__input ${
                errors.back_photo ? " input__error" : ""
              }`}
              {...register("back_photo", {
                required: "This field is required",
                validate: (value) =>
                  value.length > 0 || "Please upload a photo",
              })}
            />
            {errors.back_photo && (
              <p className="form__error">{errors.back_photo.message}</p>
            )}
          </div>

          <div className="container__form-div">
            <label className="container__form-label-checkbox" htmlFor="">
              <input
                type="checkbox"
                {...register("terms", { required: true })}
              />
              I want to protect my data by sgning an NDA
            </label>
            {errors.terms && (
              <p className="form__error">
                You must select the option to protect the data
              </p>
            )}
          </div>

          <div className="container__form-btn-container">
            <button
              className="container__form-btn-return"
              type="button"
              onClick={() => setShowSecondForm(false)}
            >
              Atrás
            </button>
            <button className="container__form-btn" type="submit">
              Guardar
            </button>
          </div>
        </form>
      ) : (
        <form>
          <div className="container__form-div">
            <div className="circle">
              <img className="profile-pic" src="happy.jpeg" alt="Foto" />
            </div>
            <h2 className="container__form-exit">
              ¡Tu formulario fue subido con éxito!
            </h2>
          </div>
        </form>
      )}
    </section>
  );
};

export default Formulario;
