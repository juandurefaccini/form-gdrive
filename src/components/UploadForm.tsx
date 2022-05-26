import * as React from "react";
import { FormikConsumer, useFormik } from "formik";
import { useEffect } from "react";
import { useAuth } from "../context/authContext";
import postArchivo from "../services/services";
import Alert from "./Alert";

enum EMateriaId {
  POO = "Programacion Orientada a Objetos",
  SO = "Sistemas Operativos",
  BDD1 = "Base de Datos",
  LENGPROG = "Lenguajes de Programacion",
}

enum ECategoriaArchivo {
  parcial = "Parciales",
  recuperatorio = "Recuperatorios",
  prefinal = "Prefinales",
  final = "Finales",
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
  archivo: File;
  categoria: ECategoriaArchivo;
  anio_catedra: EAnioCatedra;
}

export default function UploadForm() {
  const { user } = useAuth();

  //Function : Get byteArray from file
  const getByteArrayFromFile = (file: File) => {
    return new Promise<ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as ArrayBuffer);
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };

  const formInitialValues: IFormValues = {
    materia: EMateriaId.POO,
    fecha: new Date(0),
    archivo: new File([""], ""),
    categoria: ECategoriaArchivo.parcial,
    anio_catedra: EAnioCatedra.primero,
  };

  const formik = useFormik({
    initialValues: formInitialValues,
    onSubmit: (values) => {
      const fileName = values.archivo.name;
      const extension = values.archivo.type;
      const catedra = values.materia;
      const categoria = values.categoria;
      const anio_catedra = values.anio_catedra;

      const fecha: string = values.fecha.toString();
      const DD = fecha.split("-")[2];
      const MM = fecha.split("-")[1];
      const YYYY = fecha.split("-")[0];

      const nombreFinal = `${categoria}_${catedra}_${DD}_${MM}_${YYYY}`.replace(
        " ",
        "_"
      );

      getByteArrayFromFile(values.archivo)
        .then((res) => {
          const byteArray = res.toString();
          const fileData = {
            name: nombreFinal,
            extension: extension,
            byteArray: byteArray,
          };

          const scope = {
            catedra: catedra,
            tipo: categoria,
            anioAcademico: anio_catedra,
          };

          alert(JSON.stringify(fileData) + JSON.stringify(scope));

          postArchivo(values.archivo, scope, fileData, user)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          alert(err);
        });
    },
    validate: (values) => {
      const errors: any = {};

      if (!values.materia) errors.materia = "Debe seleccionar una materia";
      if (values.fecha.toString == new Date(0).toString)
        errors.fecha = "Debe seleccionar una fecha";
      if (!values.archivo.size) errors.archivo = "Debe seleccionar un archivo";

      if (!values.categoria)
        errors.categoria = "Debe seleccionar una categoria";
      if (!values.anio_catedra)
        errors.anio_catedra = "Debe seleccionar una el anio de la materia";
      return errors;
    },
  });

  return (
    <div className="w-full flex flex-col justify-center items-center h-full">
      <form
        onSubmit={formik.handleSubmit}
        className="p-6 bg-black text-white w-min flex flex-col space-y-4 rounded"
      >
        <p className="text-md">Formulario de subida de archivo</p>
        <label className="w-24 text-sm" htmlFor="materia">
          Catedra
        </label>
        <select
          name="materia"
          id="materia"
          className="w-full bg-white text-black"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.materia}
        >
          <option value={EMateriaId.POO}>{EMateriaId.POO}</option>
          <option value={EMateriaId.SO}>{EMateriaId.SO}</option>
          <option value={EMateriaId.BDD1}>{EMateriaId.BDD1}</option>
          <option value={EMateriaId.LENGPROG}>{EMateriaId.LENGPROG}</option>
        </select>

        <label className="w-24 text-sm" htmlFor="anio_materia">
          Anio Catedra
        </label>
        <select
          name="anio_materia"
          id="anio_materia"
          className="w-full bg-white text-black"
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

        <label className="w-24 text-sm" htmlFor="fecha">
          Fecha
        </label>
        <input
          type="date"
          name="fecha"
          id="fecha"
          className="w-full bg-white text-black"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.fecha}
        />
        <Alert>{formik.errors.fecha}</Alert>

        <label className="w-24 text-sm" htmlFor="archivo">
          Archivo
        </label>
        <input
          type="file"
          name="archivo"
          id="archivo"
          accept="image/*,.pdf"
          onChange={(event) => {
            const data: File = event.target.files[0];
            console.log(data);
            formik.setFieldValue("archivo", data);

            /*
            if (event.target.files) {
              const file = event.currentTarget.files[0];
              formik.setFieldValue("archivo_tipo", event.target.files[0].type);
              formik.setFieldValue("archivo", event.target.files[0]);
            } */
          }}
          onBlur={formik.handleBlur}
        />
        <Alert>{formik.errors.archivo}</Alert>

        <label className="w-24 text-sm" htmlFor="categoria">
          Categoria
        </label>
        <select
          name="categoria"
          id="categoria"
          className="w-full bg-white text-black"
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

        <button
          type="submit"
          className="border rounded bg-white text-black uppercase"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
