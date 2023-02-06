import * as React from "react";
import { useFormik } from "formik";
import { useAuth } from "../context/authContext";
import { postArchivo } from "../services/services";
import Alert from "./Alert";
import {EMateriaId} from "../model/materia/materia";
import {ECategoriaArchivo} from "../model/archivo/categoria_archivo";
import {EAnioCatedra} from "../model/catedra/anio_catedra";
import {useSnackbar} from "notistack";

interface IFormValues {
  materia: EMateriaId;
  fecha: Date;
  archivo: File;
  categoria: ECategoriaArchivo;
  anio_catedra: EAnioCatedra;
}

const formInitialValues: IFormValues = {
  materia: EMateriaId.POO,
  fecha: new Date(0),
  archivo: new File([""], ""),
  categoria: ECategoriaArchivo.parcial,
  anio_catedra: EAnioCatedra.primero,
};

export default function UploadForm() {
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar()

  const getByteArrayFromFile = (file: File) => {
    return new Promise<ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as ArrayBuffer);
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };

  const formik = useFormik({
    initialValues: formInitialValues,
    onSubmit: (values) => {
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

          postArchivo(values.archivo, scope, fileData, user)
            .then(() => {
              enqueueSnackbar("Archivo subido con exito", {variant: "success"})
            })
            .catch((err) => {
              enqueueSnackbar(`Error: ${err}`
                  , {variant: "error"})
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

  // @ts-ignore
  // @ts-ignore
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
            {Object.keys(EMateriaId).map((key) => (
            <option value={EMateriaId[key]}>{EMateriaId[key]}</option>
            ))}
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
          {Object.keys(EAnioCatedra).map((key) => (
              <option value={EAnioCatedra[key]}>{EAnioCatedra[key]}</option>
          ))}
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
            // @ts-ignore
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
          {Object.keys(ECategoriaArchivo).map((key) => (
              <option value={ECategoriaArchivo[key]}>{ECategoriaArchivo[key]}</option>
          ))}
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
