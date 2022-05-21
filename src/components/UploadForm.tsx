import * as React from "react";
import { FormikConsumer, useFormik } from "formik";
import { useEffect } from "react";
import { useAuth } from "../context/authContext";
import Alert from "./Alert";

enum EMateriaId {
  POO = "Programacion Orientada a Objetos",
  SO = "Sistemas Operativos",
  BDD1 = "Base de Datos",
  LENGPROG = "Lenguajes de Programacion",
}

enum ECategoriaArchivo {
  parcial = "Parcial",
  recuperatorio = "Recuperatorio",
  prefinal = "Prefinal",
  final = "Final",
}

enum EAnioCatedra {
  primero = "Primero",
  segundo = "Segundo",
  tercero = "Tercero",
  cuarto = "Cuarto",
  quinto = "Quinto",
}

interface IFormValues {
  materia: EMateriaId;
  fecha: Date;
  archivo: string;
  categoria: ECategoriaArchivo;
  anio_catedra: EAnioCatedra;
}

export default function UploadForm() {
  const { user } = useAuth();

  const formInitialValues: IFormValues = {
    materia: EMateriaId.POO,
    fecha: new Date(),
    archivo: "",
    categoria: ECategoriaArchivo.parcial,
    anio_catedra: EAnioCatedra.primero,
  };

  const formik = useFormik({
    initialValues: formInitialValues,
    onSubmit: (values) => {
      console.log(values);
      alert(values);
    },
    validate: (values) => {
      console.log(values);
      const errors: any = {};

      if (!values.materia) errors.materia = "Debe seleccionar una materia";
      if (!values.fecha) errors.fecha = "Debe seleccionar una fecha";
      if (!values.archivo) errors.archivo = "Debe seleccionar un archivo";
      if (!values.categoria)
        errors.categoria = "Debe seleccionar una categoria";
      if (!values.anio_catedra)
        errors.anio_catedra = "Debe seleccionar una el anio de la materia";
      return errors;
    },
  });

  return (
    <div className="w-full flex flex-col justify-center items-center h-full">
      <div className="py-4">Usuario ingresado : {user?.email}</div>
      <form
        onSubmit={formik.handleSubmit}
        className="p-6 bg-[#b2fef7] w-min flex flex-col space-y-4 rounded"
      >
        <p className="text-md">Formulario de subida de archivo</p>
        <label className="w-24 text-sm" htmlFor="materia">
          Catedra
        </label>
        <select
          name="materia"
          id="materia"
          className="w-full"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.materia}
        >
          <option value={EMateriaId.POO}>{EMateriaId.POO}</option>
          <option value={EMateriaId.SO}>{EMateriaId.SO}</option>
          <option value={EMateriaId.BDD1}>{EMateriaId.BDD1}</option>
          <option value={EMateriaId.LENGPROG}>{EMateriaId.LENGPROG}</option>
        </select>
        {/* <Alert>{formik.errors.materia}</Alert> */}

        <label className="w-24 text-sm" htmlFor="anio_materia">
          Anio Catedra
        </label>
        <select
          name="anio_materia"
          id="anio_materia"
          className="w-full"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.anio_catedra}
        >
          <option value={EAnioCatedra.primero}>{EAnioCatedra.primero}</option>
          <option value={EAnioCatedra.segundo}>{EAnioCatedra.segundo}</option>
          <option value={EAnioCatedra.tercero}>{EAnioCatedra.tercero}</option>
          <option value={EAnioCatedra.cuarto}>{EAnioCatedra.cuarto}</option>
          <option value={EAnioCatedra.quinto}>{EAnioCatedra.quinto}</option>
        </select>
        {/* <Alert>{formik.errors.anio_catedra}</Alert> */}

        <label className="w-24 text-sm" htmlFor="fecha">
          Fecha
        </label>
        <input
          type="date"
          name="fecha"
          id="fecha"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.fecha.toString()}
        />
        {/* <Alert>{formik.errors.fecha}</Alert> */}

        <label className="w-24 text-sm" htmlFor="archivo">
          Archivo
        </label>
        <input
          type="file"
          name="archivo"
          id="archivo"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.archivo}
        />
        {/* <Alert>{formik.errors.archivo}</Alert> */}

        <label className="w-24 text-sm" htmlFor="categoria">
          Categoria
        </label>
        <select
          name="categoria"
          id="categoria"
          className="w-full"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.categoria}
        >
          <option value={ECategoriaArchivo.parcial}>
            {ECategoriaArchivo.parcial}
          </option>
          <option value={ECategoriaArchivo.recuperatorio}>
            {ECategoriaArchivo.recuperatorio}
          </option>
          <option value={ECategoriaArchivo.prefinal}>
            {ECategoriaArchivo.prefinal}
          </option>
          <option value={ECategoriaArchivo.final}>
            {ECategoriaArchivo.final}
          </option>
        </select>
        {/* <Alert>{formik.errors.categoria}</Alert> */}

        <button type="submit" className="border rounded bg-white">
          Enviar
        </button>
      </form>
    </div>
  );
}